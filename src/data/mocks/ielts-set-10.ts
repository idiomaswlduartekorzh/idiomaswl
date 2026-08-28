import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-10',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 10',
  subtitle: 'Microplastics · The Sharing Economy · Memory and Identity',
  timeMinutes: 164,
  sections: [
    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-10.mp3',
      title: 'Listening — Section 1: Job-Agency Registration',
      instructions: 'You will hear a conversation between a recruitment consultant and a job seeker. Listen and answer Questions 1–10.',
      transcript: `CONSULTANT: Good morning, Citywide Recruitment. How can I help?

JOBSEEKER: Hi, I'd like to register with your agency to look for work.

CONSULTANT: Certainly, I can take your details now. Can I start with your name?

JOBSEEKER: Yes, my first name is Daniel, and my surname is Farrelly.

CONSULTANT: Could you spell the surname?

JOBSEEKER: Of course — F-A-R-R-E-L-L-Y.

CONSULTANT: Thank you. And the best number to reach you on?

JOBSEEKER: It's my mobile — 07816 445230.

CONSULTANT: Let me just check — 07816 445230. Great. Now, what kind of work are you looking for?

JOBSEEKER: I was thinking warehouse work — actually, no, I'd really prefer office administration. That's where my strengths are.

CONSULTANT: Administration, good. And when would you be available to start?

JOBSEEKER: I'm free immediately — I finished my last contract a fortnight ago.

CONSULTANT: Excellent, employers love that. Do you have relevant experience?

JOBSEEKER: Most of my background is in retail — I managed a small shop for three years, so I'm used to dealing with customers and paperwork.

CONSULTANT: That's useful. And your highest qualification?

JOBSEEKER: I have a diploma in business studies.

CONSULTANT: Noted. One more thing — do you speak any other languages? Some of our clients value that.

JOBSEEKER: Yes, I speak French fairly fluently.

CONSULTANT: Wonderful. Now, let me tell you about a few vacancies we have. First, there's a Receptionist role in the city centre, full-time, paying £11.50 an hour. Then we have an Office Assistant position — that one's out at Riverside, it's part-time, and it pays £12 an hour. And finally, a Data Clerk job, also in the city centre, but the hours are evenings only, at £13 an hour.

JOBSEEKER: Before we choose, should I send every certificate I have?

CONSULTANT: Not at this stage. Today I am recording only information relevant to an application. The employer will see your work history and contact details, but not unrelated identity documents. If a right-to-work check becomes necessary, we use a secure upload link rather than ordinary email.

JOBSEEKER: Good. I use a screen reader sometimes. Can that be noted without making it the focus of my application?

CONSULTANT: Certainly. We record adjustments separately and share them only with the people arranging an interview. We can request an accessible application form and extra time for any online exercise. Would morning interviews be easiest?

JOBSEEKER: Usually, yes, although I can manage an afternoon with notice. I also travel by bus, so a workplace near a reliable route matters more than free parking.

CONSULTANT: Understood. The first vacancy involves a busy front desk and occasional weekend cover. The second is mostly filing, diary updates and answering routine enquiries. The final one requires accurate keyboard work and no customer contact.

JOBSEEKER: The Office Assistant one sounds ideal, actually.

CONSULTANT: Great — I'll put you forward for it. Read the full description before confirming, because the advertised twenty hours may be spread across four weekdays. I'll email it this afternoon from our official address. The message will never ask for a payment or bank password. If you agree, we'll arrange an interview and I will call rather than leave sensitive details in voicemail.

JOBSEEKER: That all sounds clear. Thank you so much for your help.

CONSULTANT: You're welcome. You will also receive a link where you can correct your profile or withdraw consent for us to retain it. Please contact the number on our website if anything in the message looks unusual.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Job-Agency Registration',
          example: 'First name:  Daniel',
          template: `Surname: {{1}}
Contact number: 07816 445230
Type of work wanted: {{2}}
Available to start: {{3}}
Previous experience in: {{4}}
Highest qualification: {{5}}
Other languages: {{6}}`,
          blanks: [
            { num: 1, answers: ['Farrelly'], maxWords: 1 },
            { num: 2, answers: ['administration'], maxWords: 1 },
            { num: 3, answers: ['immediately'], maxWords: 1 },
            { num: 4, answers: ['retail'], maxWords: 1 },
            { num: 5, answers: ['diploma'], maxWords: 1 },
            { num: 6, answers: ['French'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Job', 'Location', 'Hours', 'Pay per hour'],
          rows: [
            [
              'Receptionist',
              'city centre',
              'full-time',
              { num: 7, answers: ['11.50', '£11.50'], maxWords: 1 },
            ],
            [
              'Office Assistant',
              { num: 8, answers: ['Riverside'], maxWords: 1 },
              'part-time',
              '£12',
            ],
            [
              'Data Clerk',
              'city centre',
              { num: 9, answers: ['evenings'], maxWords: 1 },
              { num: 10, answers: ['13', '£13'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-10.mp3',
      title: 'Listening — Section 2: Library Services',
      instructions: 'You will hear a talk about the services offered by a local library. Listen and answer Questions 11–20.',
      transcript: `Hello everyone, and thank you for coming to this short talk about your local library and the services we offer. I'm the head librarian here, and I'd like to run through what's available, including some exciting additions.

Let me start with what's new this year. We've just launched an e-book lending service, so you can now borrow digital titles and read them on your phone or tablet at home. We've also opened a set of bookable study rooms on the upper floor, which have been in great demand from students. Now, some of you will ask about the café and the free wifi — those aren't new, they've been with us for several years. And our children's area is currently being renovated, so please bear with us there.

The rooms are for quiet group study rather than private tutoring businesses. Reserve one through the catalogue, check in within fifteen minutes, and cancel if your plans change so somebody else can use it. Each room has an adjustable table; one is fitted with an induction loop. Staff at the help point can demonstrate the digital catalogue, but they cannot see the contents of your personal device.

Now, on to membership and borrowing. Joining the library is completely free for local residents. Once you're a member, you can borrow up to twelve items at any one time — books, audiobooks, or DVDs. The standard loan period is three weeks, and you can renew online if no one else has reserved the item. If you do return something late, there's a small fine for each day it's overdue, so do keep an eye on your due dates.

There are exceptions worth knowing. Children's books do not attract overdue charges, and anyone who cannot visit because of illness can ask about our home-delivery scheme. A reminder is a courtesy, not a change to the due date, so check your account even if an email is filtered as spam. Reserved material and inter-library loans can have different conditions; the date printed on the receipt is the one that applies.

We also provide some services you might not know about. Members get free access to a wide range of online newspapers, which is perfect if you like to keep up with the news from around the world. For families, we run a story session for young children every Saturday morning — it's very popular, so arrive early. And if you need to use a computer, our computer suite is on the first floor, with printing and scanning available.

Computers may be reserved in half-hour blocks. Save work to your own storage because local files are removed when a session ends. Printing has a per-page charge, while scanning to an email address is free. Staff can help with the equipment, but they will not complete banking, benefit or legal forms on a visitor's behalf. A weekly digital-skills clinic is available for people who need more time.

Finally, if you'd like to join today, it couldn't be simpler. Just come to the main desk and bring proof of your address — a utility bill or a bank statement is fine — and we'll issue your card on the spot.

The card is for your own use. If it is lost, report it promptly so we can prevent another person borrowing on the account. We collect only the details needed to run the service and publish our retention policy at the desk and online.

Thank you for listening, and please do explore everything the library has to offer.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO services does the speaker say are new this year?',
          options: [
            { letter: 'A', text: 'an e-book lending service' },
            { letter: 'B', text: 'the café' },
            { letter: 'C', text: 'bookable study rooms' },
            { letter: 'D', text: 'the children\'s area' },
            { letter: 'E', text: 'the free wifi' },
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
          title: 'Library Services',
          template: `Membership and borrowing
• Membership is free for local {{13}}.
• Members can borrow up to {{14}} items at once.
• The standard loan period is {{15}}.
• Late returns are charged a small {{16}} per day.

Other services
• Free access to a range of online {{17}}.
• A {{18}} for young children every Saturday morning.
• The computer suite is on the {{19}} floor.

Joining today
• Bring proof of your {{20}} to the main desk.`,
          blanks: [
            { num: 13, answers: ['residents'], maxWords: 2 },
            { num: 14, answers: ['12', 'twelve'], maxWords: 2 },
            { num: 15, answers: ['three weeks', '3 weeks'], maxWords: 2 },
            { num: 16, answers: ['fine'], maxWords: 2 },
            { num: 17, answers: ['newspapers'], maxWords: 2 },
            { num: 18, answers: ['story session'], maxWords: 2 },
            { num: 19, answers: ['first', 'first floor'], maxWords: 2 },
            { num: 20, answers: ['address'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-10.mp3',
      title: 'Listening — Section 3: Architecture Project',
      instructions: 'You will hear two architecture students discussing a project with their tutor. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Right, Maya, Josh — let's review your architecture project before your presentation. Tell me about the building you designed.

MAYA: We designed a community library. We wanted a public space that would bring people of all ages together, not just a place to borrow books.

TUTOR: A lovely idea. Where did the inspiration come from? I remember you mentioned a historic building at one point.

JOSH: We did look at an old town hall for ideas, but in the end the main inspiration was the natural landscape around the site — the way the hills curve. The roofline actually echoes those hills.

TUTOR: That's a strong concept. And what did you build the main structure from?

MAYA: We debated using concrete, because it's cheap and durable, but we finally chose timber. It's far more sustainable, and it gives the interior a really warm feel.

TUTOR: Good choice. Was there a particular difficulty you had to overcome?

JOSH: Definitely. The hardest thing wasn't the budget or accessibility — it was the limited size of the site. It's quite a narrow plot, so fitting everything in without it feeling cramped took a lot of reworking.

TUTOR: You've handled that well. Now, I looked at your scale model. It's beautifully made, but I have to say the scale isn't obvious — someone looking at it can't easily tell how big the building actually is. You might add a small human figure for reference.

MAYA: That's a good point. We'll fix that.

JOSH: We also tested two entrances. The northern one created a dramatic approach, but it forced wheelchair users onto a longer route, so we rejected it. In the revised plan everyone enters through the same sheltered forecourt.

TUTOR: That is a stronger decision. Inclusive design should be part of the organising idea, not an attachment at the end. How did you check daylight and overheating?

MAYA: We made a simple digital simulation for midsummer and winter. The first version had too much west-facing glass. We reduced it and added external shading, while keeping high-level windows that can release warm air.

TUTOR: Explain that change as a response to evidence. Avoid claiming the building is carbon neutral: you have estimated operational demand, but you have not completed a whole-life carbon assessment of the structure, transport and maintenance.

JOSH: So we should say the design aims to reduce energy use and be explicit about what we measured.

TUTOR: Exactly. Also distinguish the needs you learned from local interviews from your own assumptions. Three participants are useful for early feedback, but they do not represent every future user.

TUTOR: Now, for the presentation itself. Start with a clear introduction that sets out your aims — don't dive straight into the details. Then make sure you explain your choice of materials, because that's one of the strongest parts of your project. I'd also add a diagram showing the internal layout, so the audience can follow the flow of the spaces. And do rehearse beforehand to get your timing right; you've only got ten minutes. Practise once in front of me, and I'll give you some feedback afterwards.

MAYA: Should we put all the simulation results on one slide?

TUTOR: Select the result that changed a decision, then place the method and assumptions in an appendix. Use readable labels and describe the essential visual information aloud. Finish with limitations and the next test you would run; that demonstrates judgement rather than weakness.

JOSH: We'll divide the speaking evenly and leave a short margin for questions rather than filling every second.

TUTOR: Bring the amended model tomorrow, and send slides so I can check that they work without animation.

JOSH: That's really helpful — thank you.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What type of building did the students design?',
          options: [
            'a community library',
            'a sports centre',
            'a railway station',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'What was the main inspiration for their design?',
          options: [
            'a historic town hall',
            'the natural landscape',
            'a building they had seen abroad',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'Which material did they choose for the main structure?',
          options: [
            'steel',
            'concrete',
            'timber',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What was the biggest challenge they faced?',
          options: [
            'staying within budget',
            'meeting accessibility rules',
            'the limited size of the site',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What did the tutor say about their scale model?',
          options: [
            'It contained too much detail.',
            'The scale was not clear.',
            'It needed brighter colours.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• The presentation should begin with a clear {{26}}.
• They should explain their choice of {{27}}.
• The tutor suggests adding a {{28}} of the internal layout.
• They should rehearse to get their {{29}} right.
• The tutor will give them {{30}} after the practice run.`,
          blanks: [
            { num: 26, answers: ['introduction'], maxWords: 1 },
            { num: 27, answers: ['materials'], maxWords: 1 },
            { num: 28, answers: ['diagram'], maxWords: 1 },
            { num: 29, answers: ['timing'], maxWords: 1 },
            { num: 30, answers: ['feedback'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-10.mp3',
      title: 'Listening — Section 4: The Migration of Whales',
      instructions: 'You will hear part of a lecture about the migration of whales. Listen and answer Questions 31–40.',
      transcript: `Good afternoon. Today's lecture is about one of the great spectacles of the natural world — the migration of whales, some of which travel thousands of kilometres every year.

Let's begin with why they migrate at all. Most large whales divide their year between two very different regions. In the cooler months they head towards the tropics, and the main reason is reproduction: they travel to warm breeding grounds, where their young have a better chance of surviving. In summer, by contrast, they return to the poles to feed, where the cold, nutrient-rich water is full of the tiny shrimp-like creatures called krill that form the bulk of their diet. During this feeding season a whale eats almost constantly, storing the energy as a thick layer of blubber that will sustain it through the long journey ahead.

That pattern is clearest in some baleen populations, not a rule for every whale. Species, sex, age and population matter, and researchers should not infer purpose from latitude alone. Satellite tags, photographs of distinctive markings and acoustic recorders reveal different pieces of a route; each method has gaps. A tag can stop transmitting, a photograph depends on somebody encountering the animal, and a recorder identifies sounds rather than every silent individual.

Now, the distances involved are extraordinary. Grey whales, for example, make some of the longest journeys of any mammal on Earth, swimming from the Arctic all the way to the coast of Mexico. There, the females give birth in warm, shallow lagoons near the shore, which offer their calves protection from predators.

Even for a well-studied population, the beginning and end of a route can shift between years. Individuals may pause, travel close to the coast or take a more offshore path. Researchers therefore report a distribution of tracks rather than treating one line on a map as a fixed corridor. Calves travel with their mothers and learn a route while also responding to immediate sea conditions.

How do whales find their way across such vast stretches of open ocean? Scientists believe they may be able to detect the Earth's magnetic field, using it rather like a compass. They also rely heavily on sound, and some species produce long, complex songs that carry for many kilometres underwater and help them stay in contact.

Navigation remains a question. A correlation between a stranding and geomagnetic disturbance does not prove a magnetic sense, while a song can serve courtship or spacing as well as orientation. Scientists compare explanations through tracking, observation and experiments. Evidence suggests animals combine several cues, including coastlines, water conditions, sound and perhaps geomagnetism.

Sadly, whales today face a number of serious threats. One of the most immediate is collision with ships along busy coastal routes, which kills or injures many animals every year. In addition, the growing noise from shipping and industry interferes with their communication, making it harder for them to find one another and to navigate. And in the longer term, rising sea temperatures are altering ocean currents and shifting the location of their food, forcing whales to change patterns of migration that have remained stable for thousands of years.

Risk is uneven. Vessel speed, route location, fishing gear and the frequency range of human-made noise affect different populations in different ways. Climate change can alter the timing and distribution of prey, but a changed sighting pattern may also reflect survey effort. Protection therefore combines slower vessels in high-risk zones, modified routes, quieter technology, disentanglement capacity and long-term monitoring.

Protecting these remarkable animals will require international cooperation because many routes cross national boundaries and the high seas. Understanding their journeys is an essential first step, but evidence must lead to enforceable measures and be updated as conditions change.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE MIGRATION OF WHALES',
          template: `Why whales migrate
• They travel to warm {{31}} grounds so their young can survive.
• At the poles they feed on tiny creatures called {{32}}.
• They store energy as a thick layer of {{33}}.

Routes and navigation
• Grey whales make some of the longest {{34}} of any mammal.
• Females give birth in warm, shallow {{35}} near the shore.
• Whales may detect the Earth's magnetic {{36}} to navigate.
• They also communicate using long, complex {{37}}.

Threats
• Many are killed by collisions with {{38}}.
• Underwater noise interferes with their {{39}}.
• Rising sea temperatures are shifting the location of their {{40}}.`,
          blanks: [
            { num: 31, answers: ['breeding'], maxWords: 1 },
            { num: 32, answers: ['krill'], maxWords: 1 },
            { num: 33, answers: ['blubber'], maxWords: 1 },
            { num: 34, answers: ['journeys'], maxWords: 1 },
            { num: 35, answers: ['lagoons'], maxWords: 1 },
            { num: 36, answers: ['field'], maxWords: 1 },
            { num: 37, answers: ['songs', 'song'], maxWords: 1 },
            { num: 38, answers: ['ships'], maxWords: 1 },
            { num: 39, answers: ['communication'], maxWords: 1 },
            { num: 40, answers: ['food'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5, skill: 'reading',
      title: 'Reading — Passage 1: Microplastics in the Ocean',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Microplastics in the Ocean

Plastic debris changes through sunlight, heat, waves and contact with other material. Many common polymers do not readily biodegrade in marine conditions; instead, an item may become brittle and fragment while its chemical components persist. Microplastics are commonly defined as plastic particles smaller than five millimetres, although studies use different lower size limits and methods. That variation matters: a net, filter or microscope that misses the smallest particles cannot establish that they are absent. Researchers have reported particles in surface water, sea ice, beaches and deep-sea sediment, but results from different surveys are not automatically comparable.

Sources are usually divided into primary and secondary particles. Primary particles enter use already small. They include industrial pellets known as nurdles, which are raw material for larger products, and microbeads formerly added to some rinse-off cosmetics. Secondary particles form when bottles, packaging, paint, tyres, fishing gear or synthetic textiles wear and break apart through ultraviolet radiation, wave action and mechanical abrasion. Wastewater treatment can retain much of some particle classes, yet captured material may move into sewage sludge, while stormwater and untreated discharge provide other routes. Counting particles alone also hides differences in mass, shape and polymer.

Marine organisms can encounter particles while filtering water, feeding in sediment or pursuing prey. Controlled experiments have reported reduced feeding behaviour and other biological changes in some fish, but an effect depends on particle size, material, concentration and exposure period. Laboratory doses may not represent a field population, so hazard cannot be translated directly into ecosystem risk. Plastic surfaces can carry organisms, additives and persistent organic pollutants from surrounding water. Whether that chemical transport increases exposure relative to food, sediment and water must be tested rather than assumed; the particle can be one pathway among several.

Reliable field measurement begins before a sample reaches a laboratory. Clothing, paint, airborne fibres and plastic equipment can contaminate it, so teams use blanks and document materials at every stage. A reported concentration also depends on the volume sampled, mesh or filter size, digestion method and instrument used to identify a polymer. Visual inspection alone can mistake natural fibres for plastic. Spectroscopic confirmation improves identification but may examine only a subset. Researchers consequently publish detection limits and quality controls. Long time series using a consistent method are more useful for judging change than isolated counts produced by incompatible protocols. Open reference materials and inter-laboratory comparisons are gradually improving comparability.

Monitoring should also connect a count to a decision. If managers want to test a filter, samples belong upstream and downstream under comparable flow conditions. If they want to trace a source, polymer type and particle shape may matter more than one regional average. A declared question prevents measurement from becoming an expensive collection of numbers without an interpretable baseline.

Human contact occurs through food, water and air. Research teams have reported microplastics in samples including human blood and placental tissue, yet sampling and analysis are technically difficult and contamination controls are essential. Detecting a particle does not show that it caused disease. The World Health Organization's 2022 assessment found important uncertainties in exposure measurement and toxicology and called for better-quality studies. Experiments can investigate inflammation or other possible mechanisms, while population research must separate plastic exposure from many correlated factors. Some additives used in plastics are established endocrine disruptors, but the hazard of an additive and the risk from a particular particle exposure are different questions.

Regulation therefore targets several points in the life cycle. Restrictions on intentionally added microbeads can remove a preventable source, but their scope differs by jurisdiction and product category. They do not cover the much larger and more varied problem of secondary microplastics produced by wear and fragmentation. Measures may include pellet-loss controls, textile and tyre design, wastewater capture, reuse systems and reduced leakage of larger waste. Each intervention needs a baseline and a stated metric: fewer particles, lower mass and reduced ecological harm are related but not identical outcomes.

In March 2022, the United Nations Environment Assembly agreed to negotiate an international legally binding instrument addressing plastic pollution, including in the marine environment. Agreement to negotiate was not an adopted treaty. Talks at INC-5.2 adjourned in August 2025 without consensus on a text. The February 2026 resumed session, INC-5.3, dealt only with organizational and administrative matters and held no substantive negotiations. This chronology illustrates why a policy announcement, a completed legal instrument, entry into force and effective implementation must be reported as separate stages.`,
      questions: [
        {
          type: 'formgroup', id: 'r1-tfng', part: 5, qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Microplastics are defined as plastic particles smaller than five millimetres in diameter.\n2. {{2}}: Nurdles are primary microplastics used as raw material to make larger plastic products.\n3. {{3}}: Synthetic clothing is the main source of microplastic pollution worldwide.\n4. {{4}}: Laboratory studies have shown fish exposed to microplastics experience reduced feeding behaviour.\n5. {{5}}: Microplastics have been detected in human blood and placental tissue.\n6. {{6}}: Microbead restrictions eliminate the much larger problem of secondary microplastics.\n7. {{7}}: United Nations member states agreed to negotiate a plastic pollution treaty in 2022.`,
          blanks: [
            { num: 1, answers: ['TRUE'] }, { num: 2, answers: ['TRUE'] }, { num: 3, answers: ['NOT GIVEN'] },
            { num: 4, answers: ['TRUE'] }, { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['FALSE'] }, { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup', id: 'r1-sent', part: 5, qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `8. Many common polymers do not {{8}} in marine conditions.\n9. Secondary particles can form through ultraviolet radiation, wave action, and {{9}}.\n10. Plastic surfaces can carry {{10}} from surrounding water.\n11. Some additives used in plastics are established {{11}}.\n12. Microbead restrictions do not cover the varied problem of {{12}} microplastics.\n13. The February 2026 resumed session dealt only with organizational and {{13}} matters.`,
          blanks: [
            { num: 8, answers: ['readily biodegrade'] }, { num: 9, answers: ['mechanical abrasion'] },
            { num: 10, answers: ['persistent organic pollutants'] },
            { num: 11, answers: ['endocrine disruptors'] }, { num: 12, answers: ['secondary'] },
            { num: 13, answers: ['administrative'] },
          ],
        },
      ],
    },

    {
      part: 6, skill: 'reading',
      title: 'Reading — Passage 2: The Sharing Economy',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `The Sharing Economy

A. “Sharing economy” is an unstable label. It can refer to neighbours lending tools without payment, a cooperative library of seldom-used objects, or a digital company matching buyers and sellers for a fee. Ride-hailing is often called ride-sharing even when no passenger was making the journey already. Home-sharing may describe a spare bedroom or an entire investment property. These activities differ in ownership, payment, labour and control, so one appealing name cannot establish that they produce the same social outcome. Proponents emphasise convenient access and better use of idle assets; critics say that ordinary rental and on-demand work have been rebranded as sharing.

B. Rapid platform growth created a measurement problem as well as a new market. Company booking totals, user registrations and gross transaction values are not interchangeable, and private firms do not always publish comparable data. Governments have therefore focused on information flows. The OECD's 2020 model reporting rules initially covered platform sellers offering accommodation and transport services; later modules extended the framework. The purpose was to help tax authorities identify income earned through platforms while making reporting more standard. The rules illustrate expansion without relying on a speculative global market forecast: an activity had become important enough to require coordinated administrative treatment. Reporting data still require care. One seller may list on several sites, a registered account may never transact, and gross value is not platform revenue or worker income. Cross-border transactions also raise questions about which jurisdiction should receive information. A transparent estimate should therefore specify its unit, period, coverage and treatment of duplicate users rather than presenting one impressive total as a complete measure of the sector.

C. Environmental effects depend on the counterfactual—what a user would have done otherwise. A drill borrowed instead of purchased may avoid production, but a cheap room may induce an additional flight. Studies in several cities have found that ride-hailing can add vehicle kilometres, partly because empty cars travel between fares and some passengers shift from walking, cycling or public transport. That does not prove the same effect in every city. Occupancy, vehicle type, public-transit quality and whether a trip replaces private driving all change the calculation. Claims of lower emissions require a defined boundary and measured behaviour, not merely a shared label.

D. Regulated sectors also dispute whether platforms compete on equal terms. Hotel representatives point to hotel taxes, fire safety rules and disability access duties; taxi representatives cite licensing, insurance, fare transparency and driver checks. Platform operators answer that a private host or occasional driver is not identical to a large firm. Cities including Amsterdam, Barcelona and New York have introduced restrictions on some short-term rentals, but their rules and legal bases differ. Housing pressure, neighbourhood disturbance, tourism and tax collection can all influence a policy. An observed rise in rents alone cannot show how much one platform caused.

E. Labour adds another boundary problem. A person may value the flexibility to log on at chosen times while still depending economically on one platform. Algorithms can set prices, rank performance, allocate offers and trigger account deactivation. When the criteria are opaque, a worker may struggle to contest an error or understand why earnings changed. Employment status determines access to protections such as minimum pay, paid leave, insurance or collective representation, but legal tests vary between jurisdictions. Treating every provider as either an entrepreneur or an employee can miss differences in control and dependency.

F. Non-commercial schemes remain distinct. Tool libraries, repair groups, community fridges and skill exchanges can build social capital, reduce waste and widen access when residents trust the rules and can reach the service. They also require storage, maintenance, safeguarding, volunteer time and fair decisions about scarce items. Digital systems may help coordinate bookings, yet they can exclude people with limited connectivity. Scale is therefore not the only measure of success. A small scheme may create durable local value, while a large transaction platform may offer convenience without transferring control to its users. Evaluating either form requires explicit economic, environmental and social criteria. Evidence might combine material saved, participation across neighbourhoods, repeat use, operating cost and interviews about trust. No single indicator demonstrates every claimed benefit, and an evaluation should include people who stopped participating as well as enthusiastic members. Those trade-offs belong in any credible final report.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'Specific cities that have restricted short-term rental platforms', answer: 'D' },
            { num: 15, stem: 'A description of the potential benefits of community-based, non-commercial sharing', answer: 'F' },
            { num: 16, stem: 'Evidence that ride-sharing may increase rather than decrease vehicle use in cities', answer: 'C' },
            { num: 17, stem: 'International reporting rules created in response to platform growth', answer: 'B' },
            { num: 18, stem: 'Ways in which automated platform decisions can affect a worker and limit recourse', answer: 'E' },
            { num: 19, stem: 'A broad definition of the sharing economy and a summary of debates about its nature', answer: 'A' },
            { num: 20, stem: 'Arguments made by the traditional taxi industry against ride-sharing services', answer: 'D' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' }, { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' }, { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' }, { letter: 'F', text: 'Paragraph F' },
          ],
        },
        {
          type: 'formgroup', id: 'r2-sent', part: 6, qRange: [21, 26],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `21. The OECD's 2020 rules initially covered sellers offering accommodation and {{21}}.\n22. Some ride-hailing passengers shift from {{22}}, cycling, or public transport.\n23. Hotel representatives refer to hotel taxes and {{23}} rules.\n24. Some cities have introduced {{24}} on short-term rentals.\n25. A provider may value the {{25}} to log on at chosen times.\n26. Community schemes can build {{26}}, reduce waste, and widen access.`,
          blanks: [
            { num: 21, answers: ['transport services'] }, { num: 22, answers: ['walking'] },
            { num: 23, answers: ['fire safety'] }, { num: 24, answers: ['restrictions'] },
            { num: 25, answers: ['flexibility'] }, { num: 26, answers: ['social capital'] },
          ],
        },
      ],
    },

    {
      part: 7, skill: 'reading',
      title: 'Reading — Passage 3: Memory and Identity',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Memory and Identity

Memory is closely connected to personal identity, but the connection is not simple. John Locke argued in the seventeenth century that personal identity follows the reach of consciousness into past actions and thoughts. Later writers often call this a memory theory, although Locke's wording and its interpretation remain debated. Critics point out a circular problem: a genuine memory may already presuppose that the remembered experience belonged to the same person. Gaps are another difficulty. Forgetting an ordinary afternoon does not seem to create a new individual. Memory can provide continuity and evidence about a life without being the only possible condition of identity.

Neuroscience divides memory into processes and systems rather than locating a complete autobiography in one place. Structures in the medial temporal lobe, including the hippocampal formation, play a critical role in forming episodic memories tied to particular events, times and places. Patient H.M., later identified as Henry Molaison, underwent bilateral medial temporal surgery in 1953 because medication had not controlled severe epilepsy. The operation removed or damaged hippocampal and neighbouring tissue. It reduced his seizures but did not eliminate them, and it produced profound difficulty in forming new declarative memories. Later imaging and postmortem work refined early descriptions of the lesion, warning against treating it as damage to the hippocampus alone.

H.M.'s performance also showed what remained. On a mirror-tracing task he improved over repeated sessions despite lacking conscious recollection of the practice. Procedural learning—the acquisition of skills and habits—can therefore be preserved when episodic learning is gravely impaired. The contrast between knowing how and knowing that became evidence that memory is not a single, unified faculty. It does not mean that one structure has no role in any skill, or that all people with amnesia have identical profiles. Conclusions depend on the location and extent of injury, the task and the time scale being tested.

Remembering is constructive. A recollection is not retrieved as an untouched recording; relevant elements are reconstructed with later knowledge, expectations and cues. Suggestive questions can alter reports, and confidence does not guarantee accuracy. In the well-known “lost in the mall” work, some participants came to report a plausible childhood event that relatives had said did not occur. The small original demonstration was not a claim that any impossible memory could be implanted in everyone. Its importance lies alongside a wider body of misinformation research. That evidence has influenced safeguards for eyewitness interviews and identification procedures, although legal practice differs across jurisdictions.

Identity is also social. Collective memory refers to accounts through which groups interpret a shared past. It is maintained through rituals, monuments, commemorations and storytelling, as well as archives and teaching. These practices select and frame evidence; they are not automatically an accurate record. A monument can reveal what one generation chose to honour without settling what happened or how every group experienced it. Disputes over curricula, public names and restitution show that remembering is connected to present power. At the same time, a shared account can support solidarity, mourning or responsibility. Analysis must ask who produced it, whose testimony is absent and what sources can challenge it.

Digital tools complicate both individual and collective memory. A photograph may cue details, but taking or viewing it can also direct attention toward selected features. Search engines and cloud archives make information retrievable without guaranteeing understanding, permanence or neutral ranking. Experiments on cognitive offloading suggest that people adapt what they remember when they expect information to remain accessible; this may be useful in one task and costly in another. Privacy, deletion and platform failure add further questions: a record may persist against one person's wishes or disappear when a company changes. Design choices determine what resurfaces: an automated anniversary may aid recall for one person and revive distress for another. Metadata can supply date and place while stripping away context, and synthetic editing can weaken confidence in apparently documentary evidence. Personal archives also outlive relationships, raising questions about consent after sharing. The evidence does not justify a verdict that digital tools are ultimately beneficial or harmful. It instead separates availability, accurate recall, comprehension and a coherent sense of self.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'What does Locke\'s theory of personal identity, as described in the passage, claim?',
          options: [
            'Personal identity is constituted by physical continuity of the body over time.',
            'Personal identity consists in the continuity of consciousness through memory.',
            'Personal identity is a philosophical illusion with no neurological basis.',
            'Personal identity depends on social recognition rather than individual memory.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'What does the case of patient H.M. primarily demonstrate about memory?',
          options: [
            'That the hippocampus is responsible for all types of human memory.',
            'That memory is a single unified system located in one brain region.',
            'That memory consists of distinct systems supported by different neural structures.',
            'That procedural memory is more important than episodic memory for personal identity.',
          ],
          answer: 2,
        },
        {
          type: 'mcq', id: 'r3-q29', part: 7,
          text: 'What did Elizabeth Loftus\'s research demonstrate?',
          options: [
            'That memories are stored permanently and cannot be altered once formed.',
            'That people can develop detailed false memories through suggestive questioning.',
            'That eyewitness testimony is generally more reliable than previously thought.',
            'That children are better at forming false memories than adults.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q30', part: 7,
          text: 'What does the passage conclude about digital memory tools?',
          options: [
            'Their effects can be judged solely by how much information they store.',
            'Their effects differ across recall, comprehension, access and identity.',
            'They reliably improve understanding by freeing cognitive resources.',
            'They should replace biological memory for ordinary factual tasks.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup', id: 'r3-ynng', part: 7, qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: H.M.'s surgery successfully controlled his epilepsy.\n32. {{32}}: H.M. was unable to learn new motor skills after his surgery.\n33. {{33}}: Procedural memory is primarily supported by the hippocampus.\n34. {{34}}: Research on false memories has led to reforms in how eyewitness testimony is used in legal proceedings.\n35. {{35}}: Social memory is always an accurate record of historical events.\n36. {{36}}: The writer argues that digital tools are ultimately beneficial for human memory.`,
          blanks: [
            { num: 31, answers: ['NO'] }, { num: 32, answers: ['NO'] }, { num: 33, answers: ['NO'] },
            { num: 34, answers: ['YES'] }, { num: 35, answers: ['NO'] }, { num: 36, answers: ['NOT GIVEN'] },
          ],
        },
        {
          type: 'formgroup', id: 'r3-sent', part: 7, qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. The hippocampus plays a critical role in forming {{37}} memories tied to specific times and places.\n38. H.M.'s ability to learn motor skills despite amnesia shows a distinction between knowing {{38}} and knowing that.\n39. Memories are not stored like files but are {{39}} each time they are recalled.\n40. Social memory is maintained through rituals, monuments, and {{40}}.`,
          blanks: [
            { num: 37, answers: ['episodic'] }, { num: 38, answers: ['how'] },
            { num: 39, answers: ['reconstructed'] }, { num: 40, answers: ['storytelling'] },
          ],
        },
      ],
    },

    {
      part: 8, skill: 'writing', title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [{
        type: 'write', id: 'w1', part: 8, taskNumber: 1,
        imageUrl: '/assets/ielts/charts/set10-task1.svg',
        imageAlt: 'Line graph comparing unemployment rates in Spain, Germany and Brazil every two years from 2008 to 2022, measured as a percentage of the labour force',
        stimulus: 'The line graph below shows the unemployment rate (as a percentage of the labour force) in three countries between 2008 and 2022.',
        text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'Some local authorities give residents financial rewards for repairing and sharing household items. Others argue that public money should instead be spent on municipal recycling facilities.',
        text: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
      }],
    },
    {
      part: 10, skill: 'speaking', title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak', id: 'sp1', part: 10, partNumber: 1,
          text: 'Part 1 — Personal questions about the environment',
          followUp: [
            'How concerned are you about environmental issues such as climate change?',
            'What do you do in your daily life to reduce your impact on the environment?',
            'Do you think individuals or governments bear more responsibility for protecting the environment?',
            'Has environmental awareness changed in your country in recent years?',
            'Do people where you live often repair possessions instead of replacing them?',
            'Is it easy to recycle different materials in your area?',
            'Have you ever borrowed or shared an item with a neighbour?',
            'Which natural place near your home would you most like to protect?',
          ],
        },
        {
          type: 'speak', id: 'sp2', part: 10, partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a place in nature that you have visited and found particularly impressive or memorable.\n\nYou should say:\n• where the place is and how you got there\n• what the natural environment was like\n• what you did or saw there\n• and explain why this place had such an impact on you`,
        },
        {
          type: 'speak', id: 'sp3', part: 10, partNumber: 3,
          text: 'Part 3 — Discussion: Environment and sustainability',
          followUp: [
            'Do you think economic development and environmental protection can coexist? How?',
            'What role should international organisations play in addressing global environmental problems?',
            'Are there any environmental policies in your country that you think are particularly effective or ineffective?',
            'How might climate change affect daily life in your country in the next 30 years?',
            'When can sharing products reduce waste, and when might it simply increase consumption?',
            'How should governments measure whether a recycling programme is working?',
          ],
        },
      ],
    },
  ],
};

export default mock;
