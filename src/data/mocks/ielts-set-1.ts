import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 1',
  subtitle: 'Seed Banks · Low-carbon Concrete · Citizen Science',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      title: 'Listening — Section 1: Weekend Pottery Courses',
      instructions: 'You will hear a caller asking about weekend pottery courses. Listen and answer Questions 1–10.',
      transcript: `COORDINATOR: Good morning, Northbank Pottery Centre. Daniel speaking. How can I help?

CALLER: Hello. I’m hoping to book one of your weekend courses. My colleague Priya came last month and recommended it.

COORDINATOR: Lovely. I’ll take a few details first. What’s your name?

CALLER: Helena Walsh.

COORDINATOR: Could you spell the surname, please?

CALLER: W-A-L-S-H.

COORDINATOR: Thank you. And what do you do, Helena? We ask because some courses qualify for professional training.

CALLER: I’m an architect. Well, I’ve just finished studying, but I started work as an architect on Monday.

COORDINATOR: Congratulations. Have you worked with clay before?

CALLER: Only at school, and that was years ago. I wouldn’t call myself intermediate, so please put me down as a beginner.

COORDINATOR: That makes sense. We provide all the tools, but participants need clothes that can get dirty.

CALLER: Should I bring gloves?

COORDINATOR: They make it harder to feel the clay. An old shirt is fine, although an apron is much more practical.

CALLER: I’ve got one, so I’ll bring an apron.

COORDINATOR: Good. How will you travel here? There’s a small car park, but it fills early.

CALLER: I was going to drive. Actually, the number 18 bus stops outside my flat and near the centre, doesn’t it?

COORDINATOR: Yes, every twenty minutes on Saturdays.

CALLER: Then I’ll take the bus. I won’t have to find parking.

COORDINATOR: Now, would you prefer the morning session, from nine until twelve, or the evening one, from five until eight?

CALLER: Morning would normally be better, but I’m helping at a charity sale until lunchtime that Saturday. I’ll need the evening session.

COORDINATOR: Fine. We have two suitable courses. The first is Introduction to Hand Building. It lasts one day and costs ninety pounds. Clay and firing are included, though you bring your own lunch.

CALLER: What would we make?

COORDINATOR: Usually a small bowl and a tile. It’s designed for complete beginners, and the group is limited to eight people.

CALLER: That sounds manageable. What’s the other option?

COORDINATOR: Wheel Skills is spread over two Saturdays. It was advertised at one hundred and fifty pounds, but the current price is £135. You’ll practise centring clay and throwing a cylinder. All materials are supplied and lunch is included on both days.

CALLER: Is it suitable for someone with so little experience?

COORDINATOR: Yes. The tutor demonstrates each stage slowly. Hand Building is calmer, but Wheel Skills gives you more supervised practice.

CALLER: I’d rather attend twice and have time to improve. Does the Wheel Skills fee include glazing as well as clay?

COORDINATOR: Clay, glaze and firing are all covered. You’ll collect the finished pieces about three weeks later.

CALLER: Great. Can I reserve a place on Wheel Skills?

COORDINATOR: Certainly. I’ll email a payment link. The booking is held for forty-eight hours, and we’ll send directions once payment is received.

CALLER: Perfect. Thank you.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Northbank Pottery Centre — booking form',
          example: 'First name: Helena',
          template: `Surname: {{1}}

Occupation: {{2}}

Experience level: {{3}}

Item to bring: an {{4}}

Transport to the centre: {{5}}

Preferred session: {{6}}`,
          blanks: [
            { num: 1, answers: ['Walsh'], maxWords: 1 },
            { num: 2, answers: ['architect'], maxWords: 1 },
            { num: 3, answers: ['beginner'], maxWords: 1 },
            { num: 4, answers: ['apron'], maxWords: 1 },
            { num: 5, answers: ['bus'], maxWords: 1 },
            { num: 6, answers: ['evening'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Course', 'Length', 'Current price', 'Included'],
          rows: [
            [
              'Introduction to Hand Building',
              { num: 7, answers: ['one day', '1 day'], maxWords: 2 },
              '£90',
              { num: 8, answers: ['clay', 'clay and firing'], maxWords: 3 },
            ],
            [
              'Wheel Skills',
              'two Saturdays',
              { num: 9, answers: ['135', '£135'], maxWords: 1 },
              { num: 10, answers: ['lunch'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      title: 'Listening — Section 2: Harbour Repair Hub',
      instructions: 'You will hear an organiser introducing a community repair workshop. Listen and answer Questions 11–20.',
      transcript: `Good afternoon, everyone, and welcome to the Harbour Repair Hub. Before we tour the building, I’d like to explain what has changed and how you can use the workshop safely.

The hub began six years ago in a single room where volunteers repaired household items once a month. We now open five days a week. The sewing room near reception is unchanged, although we replaced three of its older machines last year. The bicycle bay still occupies the covered yard, and the wood workshop has simply been repainted. Our major work has been elsewhere. The tool library has moved into a larger room, so members can now borrow equipment without blocking the entrance. We have also rebuilt the electronics bench. It has better lighting, extraction fans and lockable storage for delicate components. Those are the two facilities completed this spring.

If this is your first visit, please don’t begin work immediately. At reception, we record an emergency contact: someone we can telephone if you become unwell or have an accident. We don’t need your doctor’s details. Next, a volunteer gives a safety briefing covering protective equipment, fire exits and the machines that require supervision. Even experienced makers must attend. You then book an induction session, which lasts about ninety minutes. During it, you practise using a hand tool and learn how to label an unfinished project.

There are three ways to join. A day pass suits visitors with one small repair. Monthly membership allows unlimited visits, while an annual plan includes equipment loans. We used to charge a joining fee, but members disliked paying for paperwork. Instead, everyone now leaves a refundable key deposit of twenty pounds. You get it back when you return your locker key at the end of your membership.

Annual members receive free access to partner workshops in four neighbouring towns. That does not include their specialist courses, which are priced separately, but you may use their ordinary benches without another day fee. Monthly members can visit those workshops too, though they pay half the normal entrance price.

Opening times vary. Tuesday and Thursday mornings are reserved for school and charity groups. General members can come from midday. People on the annual plan may also book benches during evening hours on Wednesdays, when the building stays open until nine. We considered Sunday opening, but there were too few volunteers to supervise it.

Members sometimes ask if another person may help with a repair. Day-pass users must work alone unless the helper buys a pass. A monthly member can bring one guest on each visit, but that person may not operate powered machinery. Annual members can register two helpers, although only one may attend at a time. In all cases, the member remains responsible for the project.

Finally, bring your ID card whenever you enter. The card opens the outside door and records who is in the building during an emergency. A photograph of it on your phone is not enough because the electronic strip must be scanned. If you lose it, tell reception rather than borrowing someone else’s.

After the tour, we’ll return here for questions. Please leave bags in the lockers and keep the yellow walkway clear as we go around.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO facilities at the repair hub were improved this spring?',
          options: [
            { letter: 'A', text: 'the sewing room' },
            { letter: 'B', text: 'the bicycle bay' },
            { letter: 'C', text: 'the wood workshop' },
            { letter: 'D', text: 'the electronics bench' },
            { letter: 'E', text: 'the tool library' },
          ],
          selectCount: 2,
          answers: ['D', 'E'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS for each answer.',
          title: 'Using the Harbour Repair Hub',
          template: `Before starting

• Give reception the name of an {{13}}.
• Attend a {{14}} covering protective equipment and exits.
• Book a ninety-minute {{15}}.

Membership

• Every member pays a refundable {{16}}.
• Annual members receive {{17}} to partner workshops.
• They may book benches during Wednesday {{18}} hours.
• A monthly member may bring one {{19}} per visit.
• Members must carry their {{20}} to enter the building.`,
          blanks: [
            { num: 13, answers: ['emergency contact'], maxWords: 2 },
            { num: 14, answers: ['safety briefing'], maxWords: 2 },
            { num: 15, answers: ['induction session'], maxWords: 2 },
            { num: 16, answers: ['key deposit'], maxWords: 2 },
            { num: 17, answers: ['free access', 'access'], maxWords: 2 },
            { num: 18, answers: ['evening'], maxWords: 1 },
            { num: 19, answers: ['guest'], maxWords: 1 },
            { num: 20, answers: ['ID card'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      title: 'Listening — Section 3: Campus Garden Research',
      instructions: 'You will hear two students discussing a research project with their tutor. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Maya, Leo, come in. I’ve read your proposal for the campus garden study. Tell me what you’ve settled on.

MAYA: At first we wanted to compare vegetables grown on a roof with those at ground level. But the soil depth and shade were too different, so any result would be hard to interpret.

LEO: We narrowed the project. We’ll use identical planters on the library roof and compare two irrigation methods: hand watering and a drip system.

TUTOR: Good. So the main objective is the comparison between irrigation methods, not between locations.

MAYA: Exactly. We considered three roofs. The science building had the greatest variety of plants, but students can’t enter without a technician. The sports centre is accessible, although nearby construction would create dust.

LEO: The library roof has fewer existing beds, but we can reach it safely each morning. Reliable access matters more than having a mature garden, so that’s where we’ll work.

TUTOR: What will you measure?

LEO: Plant height once a week and the mass of the harvest at the end. We’re also installing sensors. I assumed they recorded temperature, but these particular ones measure soil moisture every fifteen minutes.

MAYA: We’ll obtain temperature from the weather station instead.

TUTOR: Have you run a pilot?

MAYA: A short one. We expected birds to disturb the seedlings, so we brought netting. Birds weren’t the problem. The roof was much windier than the courtyard, and two lightweight pots moved overnight.

LEO: We’ll secure every planter to the frame. The wind exposure was the main surprise.

TUTOR: Sensible. How are you organising the data?

LEO: Each sensor sends readings to a tablet. Maya suggested copying everything weekly, but after the pilot we agreed that was risky. The files will be backed up automatically every day.

MAYA: And we’ll photograph the plants from the same marked position. That should help us explain unusual growth.

TUTOR: It will, provided the photographs are labelled. Now, your assessment includes an oral presentation before the written report. Have you divided the work?

MAYA: Leo is confident about answering questions, but neither of us has built the slides. We need help with the presentation, especially deciding how much method to include.

TUTOR: Bring me an outline next week. For the irrigation layout, don’t carry the real equipment into the seminar room. A clear diagram will show the tubing better than photographs.

LEO: I can draw that. Our practical difficulty is the sensors. We have enough units, but their batteries lose power quickly outdoors.

MAYA: Buying rechargeable ones for all twelve sensors costs more than our materials allowance.

TUTOR: Apply to the student research fund. It offers a small grant for essential equipment. The deadline is Friday, so don’t wait for your next meeting.

LEO: We’ll do it today.

TUTOR: I also noticed that your timetable ends as soon as you harvest the plants. Leave time for analysis.

MAYA: We’ve allowed two days to put the numbers into graphs.

TUTOR: Graphs are only the start. Because moisture readings are repeated over time, you need statistical advice before choosing a test. Dr Chen runs a drop-in clinic on Tuesdays.

LEO: So we should ask her to check the statistical method, rather than just the final figures?

TUTOR: Precisely. If you decide on the method now, you’ll know whether the data you collect can answer your question.

MAYA: One last thing: should we interview people who use the garden?

TUTOR: That would introduce a second research question and require ethics approval. Mention user experience as possible future work, but keep this study focused on irrigation.

LEO: Understood. We’ll revise the proposal, prepare the grant application and book the statistics clinic.

TUTOR: Good. Send me the revised version by Monday.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'The main aim of the students’ project is to compare',
          options: [
            'plants grown at different heights',
            'two methods of irrigation',
            'vegetables grown in different soils',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Why did the students choose the library roof?',
          options: [
            'It already had a mature garden.',
            'It was protected from building work.',
            'They could reach it safely each day.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'What will the sensors measure?',
          options: [
            'soil moisture',
            'air temperature',
            'plant height',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What unexpected issue occurred during the pilot?',
          options: [
            'Birds damaged the seedlings.',
            'Wind moved some containers.',
            'Construction dust covered the plants.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'How often will the sensor files be backed up?',
          options: [
            'every fifteen minutes',
            'once a day',
            'once a week',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• The students need help planning their {{26}}.
• A {{27}} should be used to explain the irrigation layout.
• The sensors require new {{28}}.
• The students can apply for a {{29}} to cover this cost.
• They should seek {{30}} advice before choosing how to analyse the results.`,
          blanks: [
            { num: 26, answers: ['presentation'], maxWords: 1 },
            { num: 27, answers: ['diagram'], maxWords: 1 },
            { num: 28, answers: ['batteries'], maxWords: 1 },
            { num: 29, answers: ['grant'], maxWords: 1 },
            { num: 30, answers: ['statistical'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-1.mp3',
      title: 'Listening — Section 4: How Urban Trees Cool a City',
      instructions: 'You will hear a university lecture about measuring the cooling effect of urban trees. Listen and answer Questions 31–40.',
      transcript: `Today we’ll examine how urban trees affect heat and, more importantly, how researchers measure that effect. It is tempting to say that any green street is a cool street, but the relationship is more complicated. The result depends on the size of the trees, the arrangement of buildings, water availability and even the time of day.

Let’s begin with structure. The collection of leaves and branches above the ground is called the canopy. A broad canopy intercepts sunlight before it reaches a pavement or wall. This produces shade, which lowers the surface temperature beneath the tree. The air itself may not cool by the same amount, so a photograph from a thermal camera and a thermometer at head height can tell different stories.

Trees also move water from the soil through their roots and release it as vapour from tiny openings in their leaves. The process is known as transpiration. Energy is used when liquid water becomes vapour, and that transfer can cool the surrounding air. However, the process slows when a tree closes those openings during severe water stress. A species that performs well in a wet park may therefore provide less cooling beside a dry road.

This shade-and-transpiration combination explains why trees can influence both surfaces and nearby air.

The material around a tree matters too. Dark asphalt can absorb a great deal of solar energy during the day and release it after sunset. Grass or light-coloured paving generally stores less. This is why researchers do not compare a tree-lined park with a treeless industrial street and attribute the entire difference to vegetation. The sites differ in too many ways.

A stronger study may select pairs of streets with similar orientation, building height and traffic, then vary the amount of tree cover. Small sensors are fixed at a standard height inside radiation shields. They record temperature and humidity every few minutes. Placing a sensor directly against a trunk would be convenient, but it would not represent the air experienced by pedestrians. Instruments also need checking before and after fieldwork so that a faulty unit does not create an imaginary hot spot.

Ground instruments provide detail at specific points. Satellites offer a wider view by estimating the temperature of the land surface across an entire city. They are useful for locating broad patterns, but a satellite does not directly measure the air temperature a person breathes. Roofs can dominate a pixel, and cloud may obscure an image. Researchers increasingly combine satellite maps, mobile surveys and fixed sensors instead of treating one source as complete.

The timing of measurement changes the conclusion. Dense shade often creates the clearest benefit in the afternoon, when solar radiation is strong. After sunset, some tree-covered spaces remain warmer because foliage reduces the loss of heat to the open sky and blocks wind. A claim that trees reduced temperature by a particular number of degrees is therefore incomplete without the hour, weather conditions and the type of temperature measured.

Cooling is also a social issue. Canopy is rarely distributed evenly. Wealthier districts may have mature trees and large gardens, while neighbourhoods with more apartments and paved yards have fewer. This inequality can overlap with higher exposure to heat and less access to air conditioning. Mapping temperature alongside population data helps cities decide where planting could protect vulnerable residents, rather than simply making already green streets greener.

Planting, though, is only the beginning. Young trees require watering, and prolonged drought may kill them before their canopy becomes large enough to matter. Species must suit the local climate and available soil. Relying on a single species creates another risk: one pest or disease could remove much of the canopy at once. Ecologists therefore recommend diversity, while still avoiding species whose roots damage infrastructure or whose pollen creates health problems.

Finally, budgets must include maintenance. A city can announce that it planted ten thousand trees, but survival after five or ten years is the more useful outcome. Pruning, soil care, replacement and community involvement all cost money. Researchers evaluating a programme should measure not only the number planted, but canopy growth, survival and who receives the benefit.

Urban trees are not a substitute for insulated buildings, reflective materials or plans for extreme heat. They are one part of a wider system. Their cooling value is real, but good evidence comes from careful definitions, comparable sites, multiple instruments and observations made across seasons rather than on one convenient summer afternoon.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'HOW URBAN TREES COOL A CITY',
          template: `Cooling processes

• A broad {{31}} prevents some sunlight from reaching surfaces.
• Water released by leaves cools the air through {{32}}.
• The cooling effect of {{33}} is often greater at the surface than in the air.
• Dark {{34}} stores solar energy and releases it later.

Measuring the effect

• Fixed {{35}} record temperature and humidity at standard heights.
• {{36}} provide land-surface measurements over a wide area.
• The hour and weather must be reported with every result.

Planning urban forests

• Unequal tree cover can reinforce social {{37}}.
• Young trees may die during prolonged {{38}}.
• Planting a {{39}} of species reduces the danger from a single pest.
• Long-term budgets must pay for {{40}}, not only planting.`,
          blanks: [
            { num: 31, answers: ['canopy'], maxWords: 1 },
            { num: 32, answers: ['transpiration'], maxWords: 1 },
            { num: 33, answers: ['shade'], maxWords: 1 },
            { num: 34, answers: ['asphalt'], maxWords: 1 },
            { num: 35, answers: ['sensors'], maxWords: 1 },
            { num: 36, answers: ['satellites'], maxWords: 1 },
            { num: 37, answers: ['inequality'], maxWords: 1 },
            { num: 38, answers: ['drought'], maxWords: 1 },
            { num: 39, answers: ['diversity'], maxWords: 1 },
            { num: 40, answers: ['maintenance'], maxWords: 1 },
          ],
        },
      ],
    },

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading Passage 1: Seeds Against Time',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Seeds Against Time

A seed bank is sometimes described as a library, but the comparison is incomplete. Books can remain useful while sitting untouched on a shelf; seeds are living material whose ability to germinate gradually declines. Banks therefore practise ex situ conservation—protecting biological material away from its natural habitat—while accepting that a frozen collection cannot replace the ecosystem in which a plant evolved. Its purpose is insurance, research and, when conditions permit, restoration.

The work begins in the field. Collectors do not simply fill a bag with whatever is available. They must confirm the species, obtain permission, judge whether the seeds are mature and avoid taking so many that the wild population is weakened. They also record metadata: the location, altitude, date, surrounding vegetation and conditions in which the parent plants grew. Without that context, a packet may preserve genes but lose much of its scientific meaning. A herbarium specimen is commonly collected as a permanent reference for identification.

Back at a bank, most conventional collections follow a carefully controlled sequence. At Kew's Millennium Seed Bank, material suitable for normal storage is placed in a dry environment of about 15 percent relative humidity and 15°C. Debris, empty seeds and insect-damaged material are removed. Staff may use cut tests or x-rays to check whether embryos are properly formed without opening every seed. After drying, collections are placed in sealed containers and transferred to freezers maintained near -20°C. Low moisture slows damaging chemical reactions; low temperature slows them further.

Storage is not the end of the process. Curators periodically remove a small sample and conduct a germination test. If too few seeds grow, a bank may need to recollect the species or regenerate the accession by raising plants and harvesting fresh seed. Regeneration sounds straightforward, yet it carries risks. If only a small, unrepresentative group of plants reproduces, the genetic composition of the new sample can drift away from that of the original population. Curators must balance the need to renew ageing material against the loss involved each time a sealed collection is opened.

Conventional freezing also has a biological limit. So-called recalcitrant seeds, including those of several important tropical trees, cannot survive the drying required before storage. Other species produce extremely short-lived or microscopic seed. Researchers may preserve embryos or other tissue in liquid nitrogen, a technique called cryopreservation, but it is more expensive and demands specialised equipment. A complete conservation strategy may therefore combine seed banking, living collections, tissue culture and protection in the wild.

Duplication provides another layer of security. Recognised standards encourage banks to keep a second collection at a geographically separate facility. The Svalbard Global Seed Vault in Norway performs this backup role for crop diversity: depositors send duplicate samples from their own genebanks, retain ownership and can withdraw their material. Svalbard is not a replacement for the more than 1,700 crop genebanks around the world. It is a reserve for failures ranging from a broken freezer or unstable funding to war and natural disaster. Wild-plant collections, meanwhile, are often duplicated through partnerships between institutions such as Kew and banks in the country of origin.

The value of a bank becomes clearest when material moves out of storage. Seeds can help researchers study drought tolerance, allow horticulturists to propagate threatened plants and supply restoration projects after fire or habitat damage. Yet release is not automatic: curators must preserve enough viable material for the future, respect agreements with the country that supplied it and ensure that a restoration site still offers suitable conditions.

For this reason, modern seed banking is less an attempt to stop time than a system for managing change. A collection needs electricity, trained staff, accurate records, repeated tests and long-term relationships with people who manage plants in the landscape. The vault may be the most visible symbol, but conservation depends just as much on the decisions made before a seed enters it and after a seed leaves.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-summary',
          part: 5,
          qRange: [1, 3],
          groupLabel: 'Complete the summary.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `Seed banks are a form of {{1}} conservation, because material is protected away from its original habitat.

Collectors record {{2}} such as location, altitude and surrounding vegetation so that a sample retains its scientific context.

Banks can use {{3}} to inspect the internal quality of seeds without opening all of them.`,
          blanks: [
            { num: 1, answers: ['ex situ'], maxWords: 2 },
            { num: 2, answers: ['metadata'], maxWords: 1 },
            { num: 3, answers: ['x-rays'], maxWords: 1 },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-flowchart',
          part: 5,
          qRange: [4, 8],
          groupLabel: 'Complete the flow-chart.\nChoose ONE WORD AND/OR A NUMBER from the passage for each answer.\n\nConventional seed storage',
          template: `Place suitable material in roughly {{4}} percent relative humidity

Remove debris and {{5}} seeds

Put the dried collection in {{6}} containers

Transfer it to freezers near {{7}}°C

Periodically carry out a {{8}} test`,
          blanks: [
            { num: 4, answers: ['15', 'fifteen'], maxWords: 1 },
            { num: 5, answers: ['empty'], maxWords: 1 },
            { num: 6, answers: ['sealed'], maxWords: 1 },
            { num: 7, answers: ['-20', 'minus 20'], maxWords: 2 },
            { num: 8, answers: ['germination'], maxWords: 1 },
          ],
        },
        {
          type: 'multiselect',
          id: 'r1-multi',
          part: 5,
          qRange: [9, 10],
          text: 'Which TWO difficulties of long-term seed conservation are mentioned in the passage?',
          options: [
            { letter: 'A', text: 'Some seeds cannot tolerate the drying process.' },
            { letter: 'B', text: 'Every stored species requires liquid nitrogen.' },
            { letter: 'C', text: 'Freezing always changes the colour of a seed.' },
            { letter: 'D', text: 'Regeneration can alter a collection’s genetic composition.' },
            { letter: 'E', text: 'Collectors are unable to identify mature seed.' },
          ],
          selectCount: 2,
          answers: ['A', 'D'],
        },
        {
          type: 'mcq',
          id: 'r1q11',
          part: 5,
          text: 'The Svalbard Global Seed Vault keeps duplicate crop samples whose ownership remains with the depositors.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r1q12',
          part: 5,
          text: 'The writer presents seed banks as a complete substitute for conserving plants in natural habitats.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q13',
          part: 5,
          text: 'Scientists can predict the exact storage life of every seed species.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading Passage 2: Concrete Without the Usual Carbon',
      instructions: 'Read the passage and answer Questions 14–27.',
      passage: `Concrete Without the Usual Carbon

Concrete is often confused with cement, although the two are not interchangeable. Concrete is the finished mixture used for buildings, bridges and roads; cement is the binding powder that reacts with water and holds sand and stone together. Most ordinary cement contains clinker, a hard intermediate material produced in a kiln. The manufacture of that clinker is responsible for the largest share of cement’s climate impact.

There are two main sources of emissions. A kiln must reach very high temperatures, so heating it with coal or other fuels releases carbon dioxide. More fundamentally, limestone is heated so that calcium carbonate becomes lime, one of clinker’s essential ingredients. This chemical reaction, called calcination, releases carbon dioxide from the stone itself. Even a kiln powered entirely by low-emission energy would therefore retain these process emissions unless the chemistry changed or the gas was captured.

The least dramatic solution may be to use material more intelligently. Engineers can avoid unnecessary concrete through efficient structural design, reuse sound building frames and specify only the strength that a component actually needs. Such measures do not create a new kind of cement; they reduce demand for the most carbon-intensive ingredient. Their effect can be large, but they require decisions early in design, when architects, engineers and clients still have freedom to change a project.

A second strategy is to lower the clinker-to-cement ratio. Producers can blend clinker with supplementary cementitious materials such as blast-furnace slag, fly ash or carefully processed calcined clay. Some of these materials react with compounds released as cement hardens and contribute to long-term strength. They can also change setting time, colour or early strength, so substitution is not a simple act of exchanging one powder for another. Local availability matters as well. Fly ash is associated with coal-fired power generation and may become scarcer where coal plants close; suitable clay is more widely distributed but must still be mined and heated.

Changing the fuel in a kiln addresses a different part of the problem. Biomass, electricity and other low-emission heat sources can reduce energy-related emissions, but they do not stop calcination. Carbon capture, utilisation and storage—usually shortened to CCUS—could collect carbon dioxide from both the fuel and the chemical reaction. The captured stream must then be compressed, transported and either stored securely underground or used in a product that keeps it out of the atmosphere. This makes CCUS relevant to deep reductions, yet early plants are costly and depend on transport and storage infrastructure that many cement-producing regions lack.

Claims about “low-carbon concrete” are difficult to compare without common accounting. A cubic metre of high-strength concrete may contain more cement than a weaker mix but carry more load, so volume alone can be misleading. Boundaries matter too: one label may count quarrying and factory emissions, while another includes transport to the construction site. The International Energy Agency and other organisations therefore support compatible definitions, measurement rules and intensity thresholds. Transparent records are needed to prevent the same reduction from being counted twice.

Building standards present another challenge. Concrete is used where failure can be catastrophic, and regulators are understandably cautious about unfamiliar mixtures. A material that performs well in one climate or application may behave differently in another. Long approval cycles can slow adoption, but abandoning testing would transfer risk to occupants and infrastructure. Demonstration projects, updated standards and performance-based specifications can allow innovation while retaining safety.

Concrete also absorbs a limited amount of carbon dioxide during its life through carbonation, as exposed cement compounds react with air. This process is real, but it does not cancel the much larger release from producing clinker, and demolishing a structure simply to expose more surface would waste useful material. Keeping buildings in service, designing components for reuse and recycling demolished concrete as aggregate are usually more valuable circular strategies.

No single recipe will decarbonise concrete everywhere. Regions differ in raw materials, electricity, construction practice and access to carbon storage. Progress instead depends on a portfolio: use less material, reduce clinker where performance allows, clean up kiln heat, deploy capture for the emissions that remain and measure every claim consistently. The familiar grey material may look unchanged, but the system behind it will have to be redesigned.`,
      questions: [
        {
          type: 'mcq',
          id: 'r2q14',
          part: 6,
          text: 'Cement and concrete are two names for exactly the same material.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q15',
          part: 6,
          text: 'Calcination would release carbon dioxide even if a kiln used low-emission energy.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r2q16',
          part: 6,
          text: 'Replacing clinker with fly ash always increases the early strength of cement.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q17',
          part: 6,
          text: 'The supply of fly ash may fall when coal-fired power stations close.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r2q18',
          part: 6,
          text: 'Changing a kiln to low-emission fuel removes the carbon released by calcination.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q19',
          part: 6,
          text: 'CCUS can collect emissions associated with both fuel use and the chemical reaction.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r2q20',
          part: 6,
          text: 'The author recommends one standard low-carbon concrete formula for every region.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r2-notes',
          part: 6,
          qRange: [21, 23],
          groupLabel: 'Complete the notes below.\nChoose NO MORE THAN THREE WORDS from the passage for each answer.\n\nRoutes to lower emissions:',
          template: `Use structural design to reduce demand for the most carbon-intensive {{21}}.
Replace some clinker with {{22}} materials.
Collect remaining emissions using {{23}}.`,
          blanks: [
            { num: 21, answers: ['ingredient'], maxWords: 1 },
            { num: 22, answers: ['supplementary cementitious'], maxWords: 2 },
            { num: 23, answers: ['CCUS', 'carbon capture'], maxWords: 2 },
          ],
        },
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [24, 27],
          groupLabel: 'Complete each sentence with the correct ending A–G below.\nWrite the correct letter, A–G, next to questions 24–27.',
          items: [
            { num: 24, stem: 'Material efficiency can', answer: 'B' },
            { num: 25, stem: 'Existing building standards may', answer: 'E' },
            { num: 26, stem: 'Common accounting rules help buyers', answer: 'G' },
            { num: 27, stem: 'Carbonation during a building’s life', answer: 'D' },
          ],
          endings: [
            { letter: 'A', text: 'eliminate the need to test structural materials.' },
            { letter: 'B', text: 'reduce the total volume of concrete required.' },
            { letter: 'C', text: 'make captured carbon free to transport.' },
            { letter: 'D', text: 'returns only a limited amount of carbon dioxide.' },
            { letter: 'E', text: 'delay the adoption of unfamiliar mixtures.' },
            { letter: 'F', text: 'guarantee identical performance in every climate.' },
            { letter: 'G', text: 'compare emissions claims on a consistent basis.' },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading Passage 3: When Volunteers Become Instruments',
      instructions: 'Read the passage and answer Questions 28–40.',
      passage: `When Volunteers Become Instruments

A research team can place only so many sensors, inspect only so many photographs and visit only so many beaches. Citizen-science projects attempt to extend that reach by inviting members of the public to make observations or classify existing records. Volunteers have counted birds, measured rainfall, photographed clouds and searched telescope images for unusual objects. The attraction is scale: thousands of participants can collect information across a larger area or a longer period than a small professional team could cover alone. Yet a large file is not automatically a reliable scientific dataset.

Quality begins before the first observation. Researchers must decide what question the project is intended to answer and write a protocol that ordinary participants can follow. A request to “report interesting insects” leaves each person to define both “interesting” and “insect”. A better protocol specifies where to look, how long to search and which features must appear in a photograph. Short training exercises can reveal whether the instructions work. If many beginners make the same mistake, the design may need revision rather than a lecture blaming the volunteers.

Every record also needs context. A photograph without a date or location may be attractive but scientifically weak. Useful metadata can include time, coordinates, weather, the observer’s method and the type of instrument used. Projects should preserve negative observations too. Knowing that a participant searched a defined site for twenty minutes and found no frogs is different from receiving no report at all. The first is evidence of absence under stated conditions; the second could simply mean that nobody looked.

Measurements create a further problem because phones, thermometers and low-cost air sensors do not all behave identically. One response is calibration. A participant may compare an instrument with a reference device, photograph an object of known size or complete a test observation before submitting field data. Researchers can then detect a consistent bias and, where appropriate, correct for it. Calibration does not make an inexpensive sensor perfect, but it turns an unknown difference into something that can be estimated.

Other projects depend on judgement rather than measurement. A faint galaxy, for example, might be described as spiral by one person and irregular by another. Instead of accepting the first label, a platform can show the same image independently to several volunteers. If most classifications agree, their consensus may be more dependable than any single response. Disagreement is useful too: it can identify ambiguous cases for expert review. Automated systems can process enormous image collections, but human observers remain valuable when rare or unfamiliar patterns fall outside the examples used to train an algorithm. The strongest projects often combine the two.

Professional checks therefore continue after submission. Software can flag impossible coordinates, duplicate photographs or temperatures outside a plausible range. Experts may inspect a sample of ordinary records and all unusual ones. Some projects compare volunteer observations with established monitoring stations; others repeat a survey using trained staff. These procedures estimate error instead of pretending that it does not exist. Importantly, a suspicious record is not always a mistake. An apparent outlier may be the first sign of a genuine event, so automatic deletion can remove the discovery a project was designed to find.

Even perfectly recorded observations can give a distorted picture. Volunteers tend to visit places that are accessible, safe or visually appealing. A city park beside a railway station may consequently produce hundreds of records while an industrial fringe produces almost none. This selection bias cannot be repaired merely by recruiting more people in the popular park. Project leaders may divide a region into sampling cells, assign under-represented sites or weight results during analysis. They must also explain the remaining gaps when publishing conclusions.

The appropriate standard depends on the use of the data. A classroom project mapping the first flowers of spring can tolerate more uncertainty than a system issuing flood warnings. Researchers sometimes describe this as being fit for purpose. Citizen science is not a universal substitute for professional monitoring, but neither is it merely public entertainment. With a clear question, consistent methods and a documented quality-assurance plan, volunteer observations can complement official networks and reveal patterns that would otherwise remain invisible.

Publication should therefore state the intended use, uncertainty and limits of every collection plainly.

Participants themselves are part of that quality system. Prompt feedback helps people correct errors, while maps and research updates show that their effort has value. Projects that collect precise locations must also protect privacy and may need to hide records of threatened species. Retaining volunteers is easier when researchers explain both what the data can establish and what it cannot. Trust grows not from claiming perfection, but from making the path from observation to conclusion visible.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r3-summary',
          part: 7,
          qRange: [28, 34],
          groupLabel: 'Complete the summary.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `Citizen-science projects allow research to operate at a greater {{28}} than a small professional team could manage. Reliability starts with a clear research question and a {{29}} that participants can follow. Each observation should include contextual {{30}}, such as its time and location. When different devices are used, {{31}} can reveal a consistent measurement bias. For tasks involving judgement, several independent classifications can produce a {{32}}. Researchers must still account for {{33}}, because volunteers may favour convenient places. They should also retain {{34}} so that a missing report is not confused with evidence that nothing was found.`,
          blanks: [
            { num: 28, answers: ['scale'], maxWords: 1 },
            { num: 29, answers: ['protocol'], maxWords: 1 },
            { num: 30, answers: ['metadata'], maxWords: 1 },
            { num: 31, answers: ['calibration'], maxWords: 1 },
            { num: 32, answers: ['consensus'], maxWords: 1 },
            { num: 33, answers: ['selection bias'], maxWords: 2 },
            { num: 34, answers: ['negative observations'], maxWords: 2 },
          ],
        },
        {
          type: 'mcq',
          id: 'r3q35',
          part: 7,
          text: 'Citizen-science data are useful only when every volunteer observes the same location.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q36',
          part: 7,
          text: 'Automated classification has made human observers unnecessary in image-based projects.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q37',
          part: 7,
          text: 'Financial payment is the main reason volunteers remain involved in citizen-science projects.',
          options: ['YES', 'NO', 'NOT GIVEN'],
          answer: 2,
        },
        {
          type: 'tablegroup',
          id: 'r3-table',
          part: 7,
          qRange: [38, 40],
          groupLabel: 'Complete the table.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          headers: ['Risk to the data', 'Quality-control response'],
          rows: [
            ['Instruments produce systematically different readings', { num: 38, answers: ['calibration'], maxWords: 1 }],
            ['Participants concentrate on convenient or attractive sites', { num: 39, answers: ['selection bias'], maxWords: 2 }],
            ['Researchers cannot distinguish “nothing found” from “nobody looked”', { num: 40, answers: ['negative observations'], maxWords: 2 }],
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
          stimulusLabel: 'The bar chart below shows the average daily electricity used by households in Westhaven for five purposes in winter and summer 2025.',
          stimulus: '',
          imageUrl: '/assets/ielts/charts/set1-task1.svg',
          imageAlt: 'Grouped bar chart comparing average daily household electricity use by purpose in winter and summer 2025',
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
          stimulus: 'Some people believe that cities should convert vacant office buildings into homes before allowing new housing to be built on undeveloped land. To what extent do you agree or disagree?',
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
            'Do you live in a house or an apartment?',
            'Which room do you spend the most time in?',
            'Is there anything you would like to change about your home?',
            'Do you usually make plans for your weekends?',
            'What did you enjoy doing at weekends when you were a child?',
            'Do you prefer quiet or busy weekends? Why?',
            'Is there an object in your home that you use every day?',
            'Do people in your area often lend things to their neighbours?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn (3–4 minutes). Read the cue card and prepare for 1 minute, then speak for 1–2 minutes.',
          cueCard: `Describe a useful object that you or someone you know repaired instead of replacing.

You should say:
• what the object was
• what was wrong with it
• who repaired it and how
• how long the repair took

and explain why repairing it was worthwhile.`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Two-way discussion (4–5 minutes). Discuss the following questions.',
          followUp: [
            'Why do some people replace products rather than repair them?',
            'Which practical repair skills should children learn, if any?',
            'How has the design of modern products affected people’s ability to repair them?',
            'Should manufacturers be required to provide spare parts for longer periods?',
            'What could governments do to encourage repair and reuse?',
            'Do you think repair businesses will become more common in the future?',
          ],
        },
      ],
    },

  ],
};

export default mock;
