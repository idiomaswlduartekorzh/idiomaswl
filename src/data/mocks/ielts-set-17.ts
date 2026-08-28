import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-17',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 17',
  subtitle: 'Ocean Acidification · History of Cinema · Behavioural Economics',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-17.mp3',
      title: 'Listening — Section 1: Booking a Home Repair',
      instructions: 'You will hear a telephone conversation between a customer and a home-repair booking agent. Listen and answer Questions 1–10.',
      transcript: `AGENT: Good afternoon, Hartley Home Repairs. How can I help you today?

CUSTOMER: Hello. I'd like to arrange for someone to inspect two problems at my house.

AGENT: First, can I take your name, please?

CUSTOMER: Yes, it's David Whitfield.

AGENT: Could you spell your surname for me?

CUSTOMER: Certainly. It's W-H-I-T-F-I-E-L-D.

AGENT: Thank you, Mr Whitfield. And what's your address?

CUSTOMER: It's 15 Maple Avenue.

AGENT: Maple Avenue, got it. Is that the street near the library rather than Maple Close?

CUSTOMER: That's right. The postcode is LS9 4RT.

AGENT: And what's the best number to reach you on?

CUSTOMER: My mobile is 078 4419 2036. Please don't use the landline listed on my previous booking; that number is no longer connected.

AGENT: I'll update the record. When is the best time to call if the technician needs more information?

CUSTOMER: In the evenings, please. I'm at work all day and usually can't answer before six.

AGENT: Noted — evenings. We can send the appointment confirmation by text, but any change requiring a decision will be discussed by phone. Now, could you describe the problems?

CUSTOMER: The main one is a leak. Water comes in from the roof whenever it rains heavily. It appears near an upstairs window, but the window frame itself looks dry.

AGENT: We should inspect the roof rather than assume the water entered directly above the stain. If the rain becomes severe, move furniture away and place a container underneath, but please don't climb up to investigate. Anything else?

CUSTOMER: Yes, there's a broken fence in the back garden. One panel is loose and moves in the wind. The gate is fine, so the technician doesn't need to replace that.

AGENT: Thank you. We normally allocate roofing and outdoor carpentry separately, but one technician can make the initial assessment. Which day would suit you?

CUSTOMER: Thursday would be ideal. Friday is possible if Thursday is full.

AGENT: We have Thursday available. Would you prefer the morning slot, from eight to twelve, or the afternoon, from one to five?

CUSTOMER: I was going to say morning, but I have to take the children to school and attend a meeting. Make it the afternoon.

AGENT: The afternoon it is. The technician will send a message when travelling. How will they enter if you are not home at the start of the slot?

CUSTOMER: I'll leave a spare key with a neighbour. She lives at number seventeen and is normally in. Please ask the technician not to put the key through my letterbox afterwards; it should be returned to her.

AGENT: I've added that instruction. Before confirming, let me explain our maintenance plans. You can also pay for this visit alone, but a plan may be useful if the building needs regular attention. The basic plan includes two visits per year. Its call-out fee is £45 each time, and replacement parts are included up to the policy limit.

CUSTOMER: Does it cover the time spent doing the repair?

AGENT: Labour is charged separately on the basic plan. The premium plan allows four visits per year. Its call-out fee falls to £30, and labour is included for standard work. Specialist equipment, such as scaffolding, is still quoted separately on either plan.

CUSTOMER: I first assumed the basic option would be enough, but the lower fee and included work make the premium plan more suitable. I'll choose that one.

AGENT: Fine. Today's appointment will count as the first visit only if you activate the plan after receiving the inspection report. I will email the terms, and no payment is taken during this call.

CUSTOMER: That's clear. Thank you.

AGENT: You're welcome. The booking is now reserved for Thursday afternoon.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Home Repair Booking',
          example: 'Name:  David Whitfield',
          template: `Address: 15 {{1}} Avenue
Postcode: LS9 4RT
Phone: (mobile) 078 4419 2036
Best time to call: {{2}}

Problem details
• Main problem: a leak coming from the {{3}}
• Also needs to repair a broken {{4}} in the back garden
• Prefers an appointment in the {{5}}, not the morning
• Will leave a spare key with a {{6}}`,
          blanks: [
            { num: 1, answers: ['Maple', 'maple'], maxWords: 1 },
            { num: 2, answers: ['evenings'], maxWords: 1 },
            { num: 3, answers: ['roof'], maxWords: 1 },
            { num: 4, answers: ['fence'], maxWords: 1 },
            { num: 5, answers: ['afternoon'], maxWords: 1 },
            { num: 6, answers: ['neighbour'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Plan', 'Visits per year', 'Call-out fee', 'Includes'],
          rows: [
            [
              'Basic plan',
              { num: 7, answers: ['two', '2'], maxWords: 1 },
              '£45',
              { num: 8, answers: ['parts'], maxWords: 1 },
            ],
            [
              'Premium plan',
              '4',
              { num: 9, answers: ['30', '£30'], maxWords: 1 },
              { num: 10, answers: ['labour'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-17.mp3',
      title: 'Listening — Section 2: Art Gallery Guided Tour',
      instructions: 'You will hear a guide talking to visitors at the start of an art gallery tour. Listen and answer Questions 11–20.',
      transcript: `Good morning everyone, and welcome to the Riverside Art Gallery. My name is Karen, and I'll be your guide. Before we begin, please check that you have a blue visitor badge; the red badges are for the afternoon schools programme.

Several parts of the building have changed since last season. The most popular new feature is our rooftop café, which opened last month and has views over the river. It serves light meals until four, although hot drinks remain available until the gallery closes. We have also created a workshop room for children on the second floor. Families can join short drawing and printmaking activities there at weekends. Both of those spaces are new. The gift shop and members' lounge have existed for years, despite their recent redecoration. An audio guide app is still being developed, so if you saw it advertised in an early brochure, please note that it is not available today.

Let me explain the timing. The guided route lasts about 90 minutes. A shorter sixty-minute route was offered during building work, but we have returned to the full tour. We will finish here at the main entrance, not upstairs at the café, which means anyone with another booking can leave promptly. Visitors may step out of the group and rejoin at the next stop.

Photography is allowed for personal use, but only without flash, because repeated bright light can damage sensitive works. Tripods and selfie sticks are not permitted in the galleries because they obstruct narrow passages. Some objects on loan carry a no-photography symbol; please respect that sign even if your camera has no flash.

Large bags should not be carried around the collection. Free lockers are beside the cloakroom on this level. They use a returnable one-pound coin, and reception can lend a token if you do not have one. Coats may be left at the staffed desk, but food and open drinks must remain outside exhibition rooms.

Our first stop is the East Wing, home to the collection of landscape paintings. The room includes coastal views, mountain scenes and several studies made outdoors. Its best-known work is The Harvest. A former owner lent it to the gallery for a decade, but the gallery finally bought it at auction in 2019. The frame was conserved after the purchase, while the painted surface required only a careful clean.

From there, we move through the glass doors into the sculpture garden. Please stay on the path. The grass has just been reseeded, and the soil is softer than it appears. You may walk around each sculpture where the paving widens, but do not touch the surfaces. If rain becomes heavy, we will view that section through the windows and spend longer in the next room.

After the garden, we visit the portrait gallery on the first floor. Many works were donated by a local collector whose family owned this building in the nineteenth century. A few portraits came directly from the people represented, so do not assume the entire display has one source. I will show you how changes in clothing and background reveal the sitter's status.

The final stop is the print room. It is kept fairly dark to protect works on paper, and only a selection is displayed at one time. The current exhibition focuses on river transport. Please allow your eyes a moment to adjust before moving between cases.

Afterwards, you are welcome to use the café or shop. Gallery members receive a ten percent discount in the shop after showing their card; the reduction does not apply in the café. Questions are welcome at natural pauses, but please keep together on the stairs. Now, follow me to the East Wing.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO new features have recently been added to the gallery?',
          options: [
            { letter: 'A', text: 'a rooftop café' },
            { letter: 'B', text: 'a gift shop' },
            { letter: 'C', text: 'an audio guide app' },
            { letter: 'D', text: 'a workshop room for children' },
            { letter: 'E', text: 'a members lounge' },
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
          title: 'Art Gallery Guided Tour',
          template: `Tour information

• The tour lasts about {{13}} minutes and ends at the main entrance.
• Photography is allowed, but only without a {{14}}.
• Free {{15}} are available next to the cloakroom for bags.

On the tour

• The East Wing holds the collection of {{16}} paintings.
• The painting 'The Harvest' was bought at {{17}} in 2019.
• In the sculpture garden, visitors must stay on the {{18}}.
• The portraits were {{19}} by a local collector.
• Gallery members receive a ten percent {{20}} in the shop.`,
          blanks: [
            { num: 13, answers: ['90'], maxWords: 2 },
            { num: 14, answers: ['flash'], maxWords: 2 },
            { num: 15, answers: ['lockers'], maxWords: 2 },
            { num: 16, answers: ['landscape'], maxWords: 2 },
            { num: 17, answers: ['auction'], maxWords: 2 },
            { num: 18, answers: ['path'], maxWords: 2 },
            { num: 19, answers: ['donated'], maxWords: 2 },
            { num: 20, answers: ['discount'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-17.mp3',
      title: 'Listening — Section 3: Sports-Science Study Discussion',
      instructions: 'You will hear a tutor talking to two students about a sports-science study. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Amy and Josh, thanks for coming in. I've read your draft sports-science proposal. Start by stating the question in one sentence, because the introduction still contains two different ideas.

AMY: Originally we wanted to examine how diet affects sprinting speed. That would have required detailed food records and several performance measures, so it became too broad. We now want to investigate how the amount of sleep athletes report is associated with their reaction times the following day.

TUTOR: Better. Be careful with the word "affects", though. If participants follow their normal routines rather than being randomly assigned a sleep duration, your design can identify an association, not establish that sleep caused the difference.

JOSH: We'll revise that. We plan to recruit university students who already compete in sport. We considered complete beginners, but sporting experience varies so much that comparisons would be difficult. Professional athletes were outside our budget and would be harder to schedule.

TUTOR: Good. How will you measure reaction time?

AMY: With a light-based computer test. A light appears at unpredictable intervals and the participant presses a button as quickly as possible. The software records the delay in milliseconds. Each person completes practice trials, followed by twenty measured trials, and we'll use the median rather than a single response.

TUTOR: What is the main practical difficulty now?

JOSH: Getting participants to attend at the same time each day. Reaction speed can vary with time of day. If one person is tested at eight in the morning and another after an evening training session, timing adds noise. We first offered completely flexible appointments, but that would make comparison weak.

TUTOR: Sensible. You mentioned an early pattern in your presentation. Where did those data come from if recruitment has not begun?

AMY: From an anonymised teaching dataset supplied for the statistics workshop, not from our future participants. The fittest subgroup showed a smaller average change after a short night than the other subgroup. We initially wrote that fitness protects people from sleep loss, but the dataset contains only twenty cases and the difference could be chance or confounding.

TUTOR: Exactly. Report it as a pattern that motivated a question, not as a health claim. Acute sleep restriction can have important effects, and your study must not ask anyone to deprive themselves of sleep. You are observing normal variation and recording what they report.

JOSH: Understood. For the main study, we hoped twenty participants would be enough because each person attends twice.

TUTOR: Repeated measures help, but you still need a justified sample. Increase the sample size and add a power calculation to the protocol. If recruitment cannot reach the target, label the project exploratory rather than drawing firm conclusions.

AMY: What other variables should we record?

TUTOR: Keep a log of caffeine intake, including the amount and time, because it may influence alertness. Do not simply classify people as coffee drinkers or non-drinkers. Add a short questionnaire about usual sleep patterns as well. A single night's reported duration may not represent someone's normal routine.

JOSH: We had planned to use a phone sleep app.

TUTOR: You can record whether participants use one, but consumer estimates are not interchangeable with laboratory measures. State the limitations. Most importantly, obtain ethical approval before collecting any original participant data. The committee meets next Tuesday, so submit the information sheet, consent form, data plan and withdrawal procedure by Friday.

AMY: That gives us a clear revision list. We'll change the causal wording and prepare the ethics documents first.

TUTOR: Good. A modest study with transparent limitations is more valuable than an impressive conclusion the design cannot support.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What are the students now trying to find out?',
          options: [
            'how diet affects sprinting speed',
            'how sleep affects reaction times',
            'how exercise affects sleep quality',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Who takes part in the study as participants?',
          options: [
            'complete beginners at sport',
            'university students who compete in sport',
            'professional athletes',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'What has been the main problem so far?',
          options: [
            'getting participants to attend at the same time each day',
            'faulty software recording the wrong times',
            'finding enough volunteers',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What surprising pattern appeared in the teaching dataset?',
          options: [
            'every participant reacted more slowly after less sleep',
            'the fittest subgroup showed a smaller average change',
            'beginners react faster than expected',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What does the tutor say must be done before testing begins?',
          options: [
            'increasing the sample size',
            'buying new equipment',
            'getting ethical approval',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `The tutor's suggestions

• The students should increase the {{26}} size.
• They should keep a log of each participant's {{27}} intake.
• They should add a short {{28}} about sleep patterns.
• They must obtain {{29}} approval before testing.
• The relevant committee meets next {{30}}.`,
          blanks: [
            { num: 26, answers: ['sample'], maxWords: 1 },
            { num: 27, answers: ['caffeine'], maxWords: 1 },
            { num: 28, answers: ['questionnaire'], maxWords: 1 },
            { num: 29, answers: ['ethical'], maxWords: 1 },
            { num: 30, answers: ['Tuesday'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-17.mp3',
      title: 'Listening — Section 4: The Printing Press',
      instructions: 'You will hear a lecture about the history of the printing press. Listen and answer Questions 31–40.',
      transcript: `Today we will examine the printing press, but we must begin by correcting a familiar shortcut. Johannes Gutenberg did not invent printing for the whole world. Long before his work in Europe, craftspeople in East Asia reproduced images and texts from carved surfaces. In China, surviving printed material shows the use of wooden blocks by the seventh century. A complete page could be carved in reverse, inked and pressed onto paper. Preparing a block required skill, yet it could produce many copies once finished.

Chinese innovators also developed movable type. In the eleventh century, Bi Sheng used individual pieces made from clay. Movable pieces could be rearranged for a new page instead of carving every page from the beginning. However, a writing system with thousands of characters created storage and selection challenges very different from those of a small alphabet. This did not mean movable type disappeared in Asia. Korean printers later used metal movable type, and printing traditions developed through several technologies. The history is therefore a sequence of regional innovations, not a single moment of invention.

Gutenberg's achievement was to combine processes into a commercially effective system in fifteenth-century Europe. He worked in Mainz, a German city with metalworking and trading connections, during the period around 1440. Instead of carving a whole page, printers assembled separate letters of metal. Type cast from an alloy had to be hard enough to survive repeated impressions while still being practical to manufacture. A hand mould helped workers make many pieces with consistent dimensions, so lines could be assembled, printed, redistributed and used again.

The press itself supplied controlled pressure. Historians often compare its action with screw presses used for wine or other agricultural products, although workshop details changed over time. Paper was positioned against an inked form of type, pressure transferred the image, and the sheet was removed to dry.

Ink was another essential component. A thin water-based mixture suitable for writing or woodblocks did not behave well on metal. European printers used a more viscous oil-based ink that adhered to the type and produced a dense impression on paper. Attribution of every formula to one person is difficult because recipes were workshop knowledge, but the compatibility of ink, type, paper and press was crucial. Gutenberg's best-known production is the Bible associated with his workshop, completed in the mid-1450s. Its layout imitated features readers valued in manuscripts, and decoration was sometimes added by hand.

Before the spread of European printing, books were copied by hand by professional scribes in religious and secular settings. Monasteries were important centres, but monks were not the only people who made manuscripts. Copying was slow and skilled, which limited the number of identical texts and contributed to high costs. Printing did not make books instantly cheap or create universal literacy. It did, however, increase the scale and speed with which many texts could be reproduced, while competition and expanding markets changed their price and availability.

These changes affected religion and politics. During the sixteenth-century Reformation, printers produced pamphlets, sermons, translations and replies for competing sides. The press did not by itself cause the movement; religious disputes, institutions and political protection also mattered. It helped Reformation arguments circulate faster and across wider areas, while authorities used licences, censorship and confiscation in attempts to control the same medium.

Printing also changed scholarly communication. Tables, maps and diagrams could be reproduced across an edition, allowing readers in different places to consult closely related visual evidence. "Identical" should not be taken literally: type could be reset, plates could wear and corrections might be introduced during a print run. Nevertheless, repeatable pages made comparison and criticism easier. By 1500, presses operated in many European towns and had produced millions of volumes.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE PRINTING PRESS',
          template: `Printing before Gutenberg

• In China, wooden blocks were used to print texts as early as the {{31}} century.
• The Chinese also made movable type from {{32}}.
• Their method was impractical because the writing system has thousands of {{33}}.

Gutenberg's innovations

• Gutenberg worked in the German city of {{34}} around 1440.
• He produced movable type made from {{35}}.
• His type was cast from an {{36}} suitable for repeated impressions.
• He developed a new oil-based {{37}} that stuck to the metal type.

The impact of printing

• Before printing, books were copied by hand by professional {{38}}.
• Printed texts helped arguments from the {{39}} circulate more widely.
• In science, accurate {{40}} could be reproduced identically in every copy.`,
          blanks: [
            { num: 31, answers: ['seventh'], maxWords: 1 },
            { num: 32, answers: ['clay'], maxWords: 1 },
            { num: 33, answers: ['characters'], maxWords: 1 },
            { num: 34, answers: ['Mainz'], maxWords: 1 },
            { num: 35, answers: ['metal'], maxWords: 1 },
            { num: 36, answers: ['alloy'], maxWords: 1 },
            { num: 37, answers: ['ink'], maxWords: 1 },
            { num: 38, answers: ['scribes'], maxWords: 1 },
            { num: 39, answers: ['Reformation'], maxWords: 1 },
            { num: 40, answers: ['diagrams'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: Ocean Acidification',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Ocean Acidification

Ocean acidification is a long-term reduction in seawater pH caused mainly by uptake of carbon dioxide from the atmosphere. The ocean absorbs about thirty percent of the carbon dioxide released into the atmosphere, although estimates depend on the period and emissions category being measured. This uptake slows the accumulation of carbon dioxide in the air, but it also changes carbonate chemistry. Dissolved gas reacts with water and forms carbonic acid. That weak acid releases hydrogen ions, so pH falls and carbonate ions become less abundant. The term "acidification" describes movement toward greater acidity; average surface seawater remains alkaline, with a pH above seven.

The average change appears small only if the scale is misunderstood. Global surface pH is commonly described as falling from roughly 8.2 before industrialisation to about 8.1 today. Because pH is logarithmic, that shift corresponds to an increase of about twenty-six percent in hydrogen-ion concentration, according to a 2025 NOAA summary. A global mean also hides strong natural variation. Temperature, freshwater, biological activity and the upwelling of deeper water can alter coastal pH over hours or seasons. Scientists therefore use long records and multiple chemical measurements rather than interpreting one low reading as proof of a global trend.

Carbonate ions are building material for calcium-carbonate minerals used by many corals, molluscs and plankton. Adding carbon dioxide reduces carbonate availability and can lower the saturation state of forms such as aragonite. Under undersaturated conditions, forming and maintaining a shell may require more energy, and exposed material can dissolve. Pteropods—small swimming snails that participate in marine food webs—are frequently studied because their aragonite shells are sensitive to carbonate chemistry. They are not a stand-in for every organism. Responses vary among species, populations, life stages and locations; some organisms can regulate internal chemistry or obtain enough food to offset part of the cost.

Coral reefs face several simultaneous pressures. Warming can trigger bleaching, while acidification can slow calcification rates or alter the balance between reef growth and erosion. Pollution, disease and physical damage add further stress. A laboratory experiment can isolate one factor, but a reef experiences them together. Combined effects may be additive, smaller than expected or synergistic—greater than the separate effects would suggest. Predicting ecosystem change therefore requires experiments, field observations and models rather than extending one species' short-term response to the whole ocean.

The history of oyster hatcheries in the Pacific Northwest illustrates why attribution must be precise. In the mid-2000s, some facilities experienced severe larval production failures when corrosive, carbon-rich water entered their systems. The water was associated with coastal upwelling, a natural process that brings deeper water toward the surface, against a background in which human-caused carbon dioxide has increased the carbon content of the ocean. Monitoring and changes to intake timing and treatment helped hatcheries respond. The event is evidence of vulnerability to carbonate conditions, but it should not be reduced to the claim that global average pH alone caused every failure.

Social effects depend on ecology and adaptation. Shellfish aquaculture can be exposed directly during sensitive larval stages. Wild fisheries may be affected through changes in prey, habitat, growth or distribution, yet outcomes differ by region and species. Communities with few alternative foods or livelihoods can be especially vulnerable. Economic estimates must state what they include: landed catch, aquaculture, tourism and the protective value of reefs are related but not interchangeable measures.

Researchers have investigated whether vegetation can moderate conditions locally. Seagrasses and kelp take up carbon dioxide during photosynthesis and may raise surrounding pH for part of a daily cycle. This has led to interest in potential refugia—places where sensitive organisms encounter more favourable chemistry. A refuge is not guaranteed. Water movement, respiration at night, season, plant density and local emissions affect the result. Protecting coastal vegetation has independent ecological value, but it cannot be assumed to cancel the global chemical signal.

Other local responses include reducing nutrient pollution and improving monitoring so hatcheries can avoid the most corrosive intake periods. Ocean alkalinity enhancement, in which alkaline material is added to increase carbon uptake or counter acidity, remains an area of active research; effectiveness, energy use, mining, ecological side effects and verification all require evaluation before large-scale deployment. Such measures may reduce risk in selected places. They do not replace cuts in carbon dioxide emissions, because atmospheric carbon dioxide drives the global change.

The evidence is strongest for the chemical mechanism and the observed decline in open-ocean surface pH. Biological and social consequences contain more variation and uncertainty. That distinction is not a reason for inaction. It is a reason to separate what is measured, what is projected and what remains under study, while combining emissions reduction with locally appropriate adaptation.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The ocean absorbs about thirty percent of the carbon dioxide released into the atmosphere.\n2. {{2}}: Average surface seawater has become acidic, with a pH below seven.\n3. {{3}}: All shell-building organisms respond identically to changes in carbonate chemistry.\n4. {{4}}: Corrosive upwelled water was associated with serious larval-production failures at some Pacific Northwest hatcheries.\n5. {{5}}: The combined effect of ocean stressors is always greater than their separate effects.\n6. {{6}}: Every seagrass meadow provides a permanent refuge from acidification.\n7. {{7}}: Local interventions can replace reductions in carbon dioxide emissions.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['FALSE'] },
            { num: 6, answers: ['FALSE'] },
            { num: 7, answers: ['FALSE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. Dissolved carbon dioxide forms {{8}} when it reacts with seawater.\n9. Small swimming snails called {{9}} are often studied because their shells respond to carbonate chemistry.\n10. Acidification makes {{10}} less abundant in seawater.\n11. Acidification can slow coral {{11}} rates.\n12. Places with more favourable chemistry for sensitive organisms may act as potential {{12}}.\n13. Addressing the global chemical change requires cuts in {{13}} emissions.`,
          blanks: [
            { num: 8, answers: ['carbonic acid'] },
            { num: 9, answers: ['pteropods'] },
            { num: 10, answers: ['carbonate ions'] },
            { num: 11, answers: ['calcification'] },
            { num: 12, answers: ['refugia'] },
            { num: 13, answers: ['carbon dioxide'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: A History of Cinema',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `A History of Cinema

A. Cinema has no uncontested birthday. In the 1890s, inventors in several countries developed cameras, film mechanisms and viewing systems, sometimes showing motion inside a cabinet and sometimes projecting it for an audience. The Lumière brothers' ticketed programme in Paris on 28 December 1895 became a famous landmark, but it was not the first occasion on which a paying public saw projected moving pictures. In New York on 20 May 1895, an audience paid to see a boxing film projected by the Eidoloscope. Earlier demonstrations and peephole machines complicate the story further. It is more accurate to describe cinema as emerging from overlapping experiments than to award the invention to one person or event.

B. Film form also developed collectively. Early actualities, trick films and fictional scenes led makers to arrange shots in increasingly complex sequences. A close-up could direct attention to a face or object; editing could omit time or connect separate spaces; and cross-cutting could alternate between events presented as simultaneous, often building tension as they approached a meeting point. D. W. Griffith used such devices on an ambitious scale, but did not invent the entire grammar of cinema. His The Birth of a Nation (1915) combined technical influence with racist representation and propaganda. A historical account that celebrates technique while treating the film's politics as a minor footnote misses how form and ideology worked together.

C. Synchronised sound was another process rather than an overnight switch. Warner Bros released Don Juan with recorded music and effects in 1926. The Jazz Singer followed in 1927 with synchronised songs and passages of speech, while much of the film still used silent-era intertitles. Competing sound-on-disc and sound-on-film systems required cinemas and studios to invest in equipment, and silent production continued in some countries into the 1930s. Sound changed performance and employment: microphone technique, language and voice mattered, stage performers gained opportunities and some silent stars struggled. Yet the popular story that accents abruptly ended most silent careers is too simple; contracts, age, changing tastes and individual choices also shaped outcomes.

D. During the classical Hollywood period, several major companies operated a vertically integrated studio system. They financed and produced films, distributed them and owned or controlled important theatre chains. Long-term contracts organised the work of actors, directors and technicians, while departments developed recognisable house styles. This structure did not mean one executive personally controlled every creative decision, nor did all companies operate identically. It did give the largest firms substantial influence over which films reached audiences. In the United States, the 1948 Supreme Court decision in the Paramount case required major changes to distribution practices and theatre ownership, contributing to the decline of the old integrated system.

E. Post-war European movements challenged polished studio convention in different ways. Italian neorealist films often used locations, available light and stories about everyday hardship; some employed non-professional performers, although not exclusively. The later French New Wave experimented with editing, handheld cameras and self-conscious references to film history. French critics also developed the auteur idea, treating a director's recurring choices as a creative signature visible even within commercial production. Neorealism and auteur theory should not be collapsed into one method. Together with work from Japan and elsewhere, however, these currents broadened critical discussion and influenced younger American directors.

F. Jaws (1975) and Star Wars (1977) demonstrated the commercial potential of heavily promoted films released to large audiences and supported by merchandise or sequels. Their success helped make the blockbuster a central Hollywood strategy, but smaller films did not vanish and high budgets were never a guarantee of profit. Home video later created another market after theatrical release. Digital cameras, editing and visual effects changed production, while streaming altered how viewers find and watch films. Each shift changed the balance among studios, cinemas, creators and technology companies rather than replacing every older form at once.

G. The word "global" should not be used as another synonym for Hollywood. India contains several language-based industries, including Hindi-language production popularly labelled Bollywood; Nigeria, China, South Korea, Brazil and many other countries sustain distinct production cultures. Output totals are difficult to compare because sources count films, languages and release categories differently. International recognition can nevertheless mark a change in circulation. In 2020, Bong Joon-ho's Parasite became the first non-English-language film to win the Academy Award for Best Picture. Streaming services can make subtitled films available in territories where theatrical distribution was limited, while catalogues, licensing and recommendation systems still shape which works viewers actually encounter. Cinema's history remains one of unequal but multidirectional exchange.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of how the arrival of sound transformed the careers of film actors', answer: 'C' },
            { num: 15, stem: 'An account of how European filmmakers challenged Hollywood conventions after World War Two', answer: 'E' },
            { num: 16, stem: 'A reference to the first public paid screening of moving images', answer: 'A' },
            { num: 17, stem: 'Information about the growing diversity of national film industries beyond Hollywood', answer: 'G' },
            { num: 18, stem: 'A description of how studios controlled every stage of film production and distribution', answer: 'D' },
            { num: 19, stem: 'An explanation of editing techniques that became fundamental to cinema grammar', answer: 'B' },
            { num: 20, stem: 'An account of how two commercially successful films reshaped Hollywood priorities', answer: 'F' },
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
          title: 'The History of Cinema',
          template: `A paying New York audience saw projected moving pictures from the {{21}} before the famous Lumière programme in Paris. Early filmmakers developed techniques including {{22}}, which alternates between simultaneous events. The arrival of {{23}} sound involved competing systems and gradual conversion. Major Hollywood companies operated a vertically integrated {{24}}. French critics developed the {{25}} idea, which treated a director's recurring choices as a creative signature. In 2020, Parasite became the first non-English-language film to win the {{26}} for Best Picture.`,
          blanks: [
            { num: 21, answers: ['Eidoloscope'] },
            { num: 22, answers: ['cross-cutting'] },
            { num: 23, answers: ['synchronised'] },
            { num: 24, answers: ['studio system'] },
            { num: 25, answers: ['auteur'] },
            { num: 26, answers: ['Academy Award'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Behavioural Economics',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Behavioural Economics

Economic models simplify. One influential benchmark represents people as having coherent preferences and choosing the available option that best advances those preferences under stated constraints. This rational actor is sometimes nicknamed homo economicus. The label does not mean that every economic model assumes perfect information or crude selfishness, and rationality is not a claim that a person calculates every choice consciously. A simplified agent can help analysts derive clear predictions about markets. The difficulty arises when the benchmark is treated as a complete description rather than one model whose assumptions and predictions must be tested.

Behavioural economics examines how evidence from psychology and related fields can improve economic explanation. Its history reaches beyond one group, but the collaboration of psychologists Daniel Kahneman and Amos Tversky was especially influential in the study of judgement and decisions under uncertainty. In 2002, the economics prize recognised Kahneman for integrating psychological research into economic science; Tversky had died in 1996 and the prize is not awarded posthumously. Richard Thaler's work later connected limited rationality, fairness and self-control to individual choices and market outcomes, earning the 2017 prize. These awards did not establish that standard economics was false. They recognised the value of revising specific assumptions when behaviour departs systematically from a prediction.

Prospect theory was developed as an alternative account for certain decisions under risk. In a standard expected utility theory representation, evaluation concerns possible final outcomes and their probabilities. Prospect theory instead describes people as responding to gains and losses relative to a reference point, with sensitivity changing as outcomes move farther from that point. Loss aversion means that, in the relevant comparison, a loss receives greater weight than an equal-sized gain. A coefficient close to two appears in some influential estimates, but it is not a universal psychological constant. The reference point, task, stakes, experience and method can change measured behaviour, so the slogan that every loss "hurts twice as much" overstates the evidence.

Time creates another challenge. Present bias is the tendency to give disproportionate weight to an immediate payoff when comparing it with a later one. A person may prefer a reward today to a larger reward next month, while also saying that, viewed from a year in advance, waiting the extra month would be worthwhile. Hyperbolic discounting is one mathematical pattern that can generate declining impatience across horizons, but the two terms are not interchangeable definitions of every delayed choice. Liquidity, uncertainty, trust and genuine changes in circumstances may also explain why someone selects the earlier option. Present bias can illuminate self-control problems; it is not the main cause of all financial difficulty.

Policy interest often focuses on choice architecture: the environment in which options are presented. Nudging changes that architecture in a predictable way without forbidding options or substantially changing economic incentives, and the intervention should remain easy to avoid. Automatic enrolment in a workplace pension with a clear opt-out is a common example. Simplifying a form, changing the order of information or providing timely feedback may also qualify. A default is not neutral merely because one option had to be preselected, but this fact does not remove the need to justify which default serves citizens and how easily they can reject it.

Evidence has to be evaluated intervention by intervention. A result in one organisation may depend on administrative systems, baseline participation and the population affected. Average effects can hide groups that do not benefit or experience a burden. Replication, pre-specified outcomes, comparison groups and monitoring of long-term and side effects are therefore important. Some behavioural interventions are inexpensive and effective; others have small, temporary or null effects. It is false that every nudge produces meaningful change at low cost. Behavioural insights can also improve diagnosis even when the eventual policy is a regulation, service redesign or financial investment rather than a nudge.

Ethics is part of effectiveness, not an optional appendix. Public officials intentionally trying to change behaviour must consider autonomy, transparency, consent, privacy, distribution and accountability. A transparent reminder that is easy to ignore differs from a hidden design that exploits attention or makes cancellation difficult. Public approval alone does not make an intervention ethical, and a beneficial average cannot excuse avoidable harm to a subgroup. Data collection and experimentation introduce further duties concerning purpose, security and withdrawal.

Critics approach the field from different directions. Some argue that laboratory tasks exaggerate departures from rationality because people use useful rules in familiar settings. Others object to paternalism or manipulation. A further criticism is political: attention to individual decisions can make nudges a substitute for structural reforms addressing income, housing, market power or access to services. These positions are not all conservative, nor do they imply that behavioural research has no value. The strongest response is modest and empirical: define the problem, compare behavioural and non-behavioural tools, test likely effects, disclose the mechanism and remain willing to stop an intervention that fails.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What is "homo economicus" as described in the passage?',
          options: [
            'A prehistoric ancestor of modern humans who was exceptionally rational.',
            'An economic model assuming people always act rationally in their own interests.',
            'A term used by behavioural economists to describe irrational consumer behaviour.',
            'A concept developed by Daniel Kahneman to describe emotional decision-making.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What does "loss aversion" mean, according to the passage?',
          options: [
            'The tendency to avoid all financial risk, even when expected returns are positive.',
            'The tendency to give a loss greater weight than an equal-sized gain in the relevant comparison.',
            'The preference for certain outcomes over uncertain ones, regardless of expected value.',
            'The tendency to overestimate the probability of rare but catastrophic financial losses.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What is meant by "hyperbolic discounting" as described in the passage?',
          options: [
            'The tendency to underestimate the cost of very large future expenditures.',
            'A discounting rate that is consistent and predictable across all time horizons.',
            'The pattern in which people discount the near-term future much more steeply than the distant future.',
            'The inability to calculate compound interest accurately when making savings decisions.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'Which of the following is identified as a criticism of behavioural economics in the passage?',
          options: [
            'It has failed to produce any measurable changes in real-world behaviour.',
            'It has never been adopted by any national government policy team.',
            'Some argue it overstates human irrationality and that nudges can be paternalistic.',
            'It relies exclusively on data from laboratory settings and ignores field evidence.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The rational actor can be a useful analytical benchmark without being a complete description of behaviour.\n32. {{32}}: Kahneman's 2002 prize recognised the integration of psychological research into economic science.\n33. {{33}}: Prospect theory describes choices only in terms of final accumulated wealth.\n34. {{34}}: Present bias is the main cause of every type of financial difficulty.\n35. {{35}}: Every nudge produces meaningful behavioural change at low cost.\n36. {{36}}: All criticism of behavioural economics comes from conservative opposition to government action.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NO'] },
            { num: 34, answers: ['NO'] },
            { num: 35, answers: ['NO'] },
            { num: 36, answers: ['NO'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r3-sent',
          part: 7,
          qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. The standard economic model of decision-making under risk, which behavioural economists challenged, is called {{37}} theory.\n38. The strong preference for immediate rewards over future ones, even when future rewards are larger, is known as {{38}}.\n39. The design of choices to guide people toward beneficial decisions without restricting their freedom is referred to as {{39}}.\n40. Critics argue that nudges may be a substitute for {{40}} reforms that address the deeper causes of poor outcomes.`,
          blanks: [
            { num: 37, answers: ['expected utility'] },
            { num: 38, answers: ['present bias'] },
            { num: 39, answers: ['nudging'] },
            { num: 40, answers: ['structural'] },
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
          imageUrl: '/assets/ielts/charts/set17-task1.svg',
          imageAlt: 'Grouped bar chart of life expectancy in 1990 and 2022: East Asia and Pacific 68.3 and 76.7 years; Europe and Central Asia 72.2 and 77.8; Latin America and Caribbean 67.5 and 74.6; North America 75.4 and 77.8; Sub-Saharan Africa 50.0 and 61.9',
          stimulus: 'The bar chart below compares life expectancy at birth, measured in years, in five World Bank regions in 1990 and 2022.',
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
          stimulus: 'Some people believe governments should use behavioural insights, such as reminders and default options, to help citizens make beneficial choices. Others believe this influence threatens individual autonomy.',
          text: 'Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Saving and spending money',
          followUp: [
            'Did you save money when you were a child?',
            'What kinds of things do you usually save money for?',
            'Do you prefer to pay with cash or by card?',
            'Do you make a list before you go shopping?',
            'Is it easy for you to avoid buying things you do not need?',
            'Have you ever received useful advice about money?',
            'Do you compare prices before making a large purchase?',
            'Would you like to change any of your spending habits?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a film or television series that had a strong impact on you.\n\nYou should say:\n• what the film or series was about\n• when and where you watched it\n• why it had such a strong impact on you\n• and explain what you learned or felt as a result`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: The oceans, environment, and human behaviour',
          followUp: [
            'Why are some environmental problems harder for the public to understand than others?',
            'How can governments encourage environmental action without hiding how choices are being influenced?',
            'When are regulations more effective than voluntary changes in behaviour?',
            'Should films and television programmes try to change public attitudes about environmental issues?',
            'How can scientists communicate uncertainty without making a problem seem unimportant?',
            'Who should pay for protecting communities whose livelihoods depend on marine ecosystems?',
          ],
        },
      ],
    },
  ],
};

export default mock;
