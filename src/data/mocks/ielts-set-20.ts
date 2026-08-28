import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-20',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 20',
  subtitle: 'Antibiotic Resistance · Urban Gardening · The Future of Transport',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-20.mp3',
      title: 'Listening — Section 1: Reserving a Study Room',
      instructions: 'You will hear a conversation between a library assistant and a student booking a study room. Listen and answer Questions 1–10.',
      transcript: `LIBRARIAN: Good morning, Central Library help desk. How can I help?

STUDENT: Hi, I'd like to reserve a group study room for my project team.

LIBRARIAN: Certainly. Can I take your name?

STUDENT: Yes, it's Daniel Okoro.

LIBRARIAN: Could you spell your surname for me?

STUDENT: Of course — O-K-O-R-O.

LIBRARIAN: Thank you, Daniel. And a phone number, please?

STUDENT: It's 07811 402596.

LIBRARIAN: Great. What are you studying, so I can note it on the booking?

STUDENT: I'm doing a degree in economics.

LIBRARIAN: How interesting. Is this your first time booking a room with us?

STUDENT: It is, actually. A classmate told me the rooms here are really useful for group work, so I thought I'd give it a try.

LIBRARIAN: They certainly are, especially at this time of year. Now, which floor would you like? We have rooms on the second and third floors.

STUDENT: I thought the second floor at first, but I'll take the third floor — it's much quieter up there.

LIBRARIAN: The third floor it is. And how many people is the room for?

STUDENT: There'll be six of us altogether.

LIBRARIAN: Fine. Do you need any particular equipment? Most rooms have a whiteboard, and some also have a projector.

STUDENT: A projector would be ideal, as we're rehearsing a presentation.

LIBRARIAN: Noted. And which day do you need it?

STUDENT: Thursday, if that's free.

LIBRARIAN: Thursday's fine. Just remember to bring your student card, as you'll need it to collect the key.

STUDENT: Will do. Could you tell me about the rooms and the charges?

LIBRARIAN: Certainly. Room A is on the third floor, holds six people, and costs three pounds an hour. It comes with a whiteboard.

STUDENT: And something bigger?

LIBRARIAN: Room B is on the fourth floor. It seats ten, costs five pounds an hour, and includes a projector, which is perfect for your presentation.

STUDENT: Then I'll take Room B for Thursday.

LIBRARIAN: Excellent. What time would you like to start?

STUDENT: We finish our lecture at half past one, so could we have it from two until four?

LIBRARIAN: Two hours is fine. Rooms can be reserved for a maximum of three hours, and your group must leave ten minutes before the library closes. Thursday is a normal teaching day, so that will not affect you.

STUDENT: Good. Can we bring drinks in with us?

LIBRARIAN: Drinks in bottles with lids are permitted, but no hot food. Please wipe the whiteboard and return any cables to the labelled drawer. The person who made the booking is responsible for the room.

STUDENT: Understood. Is there a deposit for the projector?

LIBRARIAN: No deposit, but the projector remote is issued with the key. If anything is missing or damaged, report it at the help desk rather than trying to repair it yourself.

STUDENT: And if one of us arrives before I do, can they collect the key?

LIBRARIAN: Only if you add their name to the reservation in advance. Otherwise we must see the card of the person who booked. I'll send a confirmation email now; use the link in it if you need to add a name or cancel.

STUDENT: How much notice do you need for a cancellation?

LIBRARIAN: Please cancel at least two hours before the start. Repeatedly failing to attend can temporarily suspend booking privileges.

STUDENT: That's clear. So it is Room B, from two to four this Thursday.

LIBRARIAN: Correct. The room is reached by the east lift; the west lift stops at the third floor. Your reference number is CL-4827. Is there anything else?

STUDENT: No, that's everything. Thanks for explaining it.

LIBRARIAN: You're welcome. Your confirmation should arrive within a few minutes.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Study Room Booking',
          example: 'Name:  Daniel Okoro',
          template: `Phone: 07811 402596

• Studying for a degree in {{1}}
• Prefers a room on the {{2}} floor (not the second)
• The room is for {{3}} people
• Wants a room with a {{4}}
• Booking is for {{5}}
• Must bring student {{6}} to collect the key`,
          blanks: [
            { num: 1, answers: ['economics'], maxWords: 1 },
            { num: 2, answers: ['third'], maxWords: 1 },
            { num: 3, answers: ['6', 'six'], maxWords: 1 },
            { num: 4, answers: ['projector'], maxWords: 1 },
            { num: 5, answers: ['Thursday'], maxWords: 1 },
            { num: 6, answers: ['card'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Room', 'Floor', 'Capacity', 'Cost per hour', 'Includes'],
          rows: [
            [
              'Room A',
              'third',
              { num: 7, answers: ['6', 'six'], maxWords: 1 },
              '£3',
              { num: 8, answers: ['whiteboard'], maxWords: 1 },
            ],
            [
              'Room B',
              { num: 9, answers: ['fourth'], maxWords: 1 },
              '10',
              '£5',
              { num: 10, answers: ['projector'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-20.mp3',
      title: 'Listening — Section 2: Transport Museum Guide',
      instructions: 'You will hear a guide giving a talk to visitors at a transport museum. Listen and answer Questions 11–20.',
      transcript: `Welcome to the National Transport Museum. I'm your guide for this morning, and I'll give you a quick overview before you go off to explore on your own.

Let me start with our recent improvements. Over the winter we completely renovated two of our galleries. The tram gallery has been redesigned with interactive displays, and the aircraft gallery now has a full-size cockpit that you can actually sit in. The steam-train hall, the bicycle collection and the motorcycle gallery are unchanged this year, though they're all still well worth a visit.

Now some practical information. The museum stays open until five o'clock, but last entry to the exhibits is at four thirty, so please plan your time. Photography is allowed everywhere except in the model railway room, where the flash disturbs the delicate mechanisms. If you'd like something to eat, the café is on the ground floor, right next to the gift shop.

For families, we run a treasure hunt every afternoon; just pick up a worksheet from the information desk. Children particularly enjoy the driving simulator, though I should mention there's a small extra charge of two pounds for that.

A few quick reminders. Large bags must be left in the cloakroom near the main entrance. Our guided tours leave every hour from the central hall, and each one lasts about forty minutes. And if you happen to get lost, look for a member of staff in a red jacket — they'll be glad to point you in the right direction.

Before I finish, let me explain today's temporary route. The lift beside reception is being serviced, so visitors who need step-free access should follow the blue signs to the lift behind the café. The route is slightly longer, but every gallery remains accessible. Folding stools are available without charge; please ask rather than moving the display benches.

At eleven fifteen, one of our conservators will demonstrate how leather seats are cleaned without damaging their original surface. That talk takes place beside the horse-drawn bus and does not require a ticket. The engine-starting demonstration is different: it is outdoors at two o'clock, numbers are limited, and free places must be reserved at reception. If wet weather makes it unsafe, an announcement will be made fifteen minutes beforehand.

You may notice small green labels beside several vehicles. These mark objects selected for our energy trail, which compares the fuels used by different generations of transport. Scan the square code only if you want extra technical detail; all essential information is printed on the main labels, so a phone is not necessary.

Please supervise children near the open tram and use the handrail when climbing aboard. Wheelchairs and pushchairs have priority in the narrow aircraft-gallery passage. If an alarm sounds, do not return to the cloakroom: staff will direct everyone to the assembly point in the north courtyard.

Finally, before you leave, do go up to the viewing platform on the top floor, which gives a wonderful view over the old railway yard. The platform closes twenty minutes before the rest of the museum because staff must secure the external doors. And on your way out, we'd be really grateful if you could fill in a short questionnaire about your visit, because your comments genuinely help us improve. You can complete the paper version or scan the code at reception. Right — enjoy the museum.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO galleries have recently been renovated?',
          options: [
            { letter: 'A', text: 'the steam-train hall' },
            { letter: 'B', text: 'the tram gallery' },
            { letter: 'C', text: 'the bicycle collection' },
            { letter: 'D', text: 'the aircraft gallery' },
            { letter: 'E', text: 'the motorcycle gallery' },
          ],
          selectCount: 2,
          answers: ['B', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Visitor information',
          template: `• Last entry to the exhibits is at {{13}}.
• Photography is not allowed in the {{14}} room.
• The café is next to the {{15}}.
• Pick up a treasure-hunt {{16}} from the information desk.
• There is a £2 charge for the driving {{17}}.
• Large bags must be left in the {{18}}.
• Guided tours last about {{19}}.
• Visitors are asked to complete a {{20}}.`,
          blanks: [
            { num: 13, answers: ['four thirty'], maxWords: 2 },
            { num: 14, answers: ['model railway'], maxWords: 2 },
            { num: 15, answers: ['gift shop', 'shop'], maxWords: 2 },
            { num: 16, answers: ['worksheet'], maxWords: 1 },
            { num: 17, answers: ['simulator'], maxWords: 1 },
            { num: 18, answers: ['cloakroom'], maxWords: 1 },
            { num: 19, answers: ['forty minutes', '40 minutes'], maxWords: 2 },
            { num: 20, answers: ['questionnaire'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-20.mp3',
      title: 'Listening — Section 3: Public Health Campaign Plan',
      instructions: 'You will hear a tutor and two students planning a public health campaign. Listen and answer Questions 21–30.',
      transcript: `TUTOR: So, Priya and Sam, let's plan your public-health campaign. You'd chosen to look at students' diets. Where did you finally land?

PRIYA: We decided to concentrate on sugary drinks specifically, rather than diet in general — it felt far more manageable.

TUTOR: I think that's wise. Last year a group tried to cover every aspect of healthy eating, and their message ended up completely diluted.

TUTOR: Good — a narrow focus usually works better. And who's your target audience?

SAM: We were going to aim at the whole campus, but in the end we've decided to target first-year students, since their habits are still forming.

TUTOR: Sensible. Now, what's your main message going to be?

PRIYA: At first we thought we'd emphasise the health risks, but the research suggests that frightening people rarely changes behaviour. So we'll stress the money students could save instead.

TUTOR: Yes, the cost angle is often more persuasive. How will you actually reach students?

SAM: We considered posters, but honestly almost nobody looks at them now. We think social media will have far more impact.

TUTOR: That matches what the studies show — students spend hours scrolling on their phones but walk straight past a poster on the wall.

TUTOR: I agree. Now, one real challenge with campaigns like this is measuring success. How will you know if it has worked?

PRIYA: We'll run a survey before and after the campaign, so we can measure whether attitudes change.

TUTOR: That's exactly the right approach. Let me suggest some practical steps. First, don't start filming until you've written a clear script. Second, you'll need approval from the ethics committee before you collect any data at all. Third, book the recording equipment early, because it's in very high demand. And keep a copy of everything in a shared folder, so nothing gets lost. Once the campaign is over, compare the survey results.

SAM: That's really helpful — thanks. We'll divide up the tasks and send you a full plan by the end of the week.

TUTOR: Before you go, let's test the logic of the campaign. Saving money may attract attention, but what action are you asking students to take?

PRIYA: We want them to replace one sugary drink a day with tap water. We can show the weekly saving rather than making vague claims.

SAM: We also thought about asking the café to remove all sweet drinks during the campaign.

TUTOR: Keep the products available, but ask the café manager whether you may place a water jug beside the display.

PRIYA: Should our survey ask how many drinks people buy?

TUTOR: Ask about behaviour, but do not request names, medical history or anything you do not need. Use the same short questions before and after. If the wording changes, any difference may come from the survey rather than the campaign.

SAM: We could also count sales at the café.

TUTOR: Only if the manager can provide anonymous totals.

PRIYA: For the videos, I can interview students who already switched to water.

TUTOR: Obtain written consent and let participants review the clip in which they appear. Add captions, because many people watch without sound, and provide a text version for accessibility.

SAM: What schedule would you recommend?

TUTOR: Draft the materials next week, pilot them with a small group the week after, and revise before launch. A pilot may reveal that the saving is hard to understand or that the tone sounds judgemental.

PRIYA: We will also record which changes we make after the pilot.

TUTOR: Good. That audit trail will strengthen your final report. Meet me after ethics approval, and we can review the sampling plan before any responses are collected.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'The students decided to focus their campaign on',
          options: [
            'sugary drinks',
            'diet in general',
            'fast food',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Their target audience will be',
          options: [
            'the whole campus',
            'first-year students',
            'postgraduate students',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'Their main message will emphasise',
          options: [
            'the health risks',
            'the money students can save',
            'the environmental impact',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'They will mainly reach students through',
          options: [
            'posters',
            'email',
            'social media',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'They will measure the campaign\'s success using',
          options: [
            'social media shares',
            'staff interviews',
            'a before-and-after survey',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• Do not start filming until a clear {{26}} has been written.
• Approval is needed from the {{27}} committee before collecting data.
• Book the recording {{28}} early.
• Keep a copy of everything in a shared {{29}}.
• Success will be judged by comparing the survey {{30}}.`,
          blanks: [
            { num: 26, answers: ['script'], maxWords: 1 },
            { num: 27, answers: ['ethics'], maxWords: 1 },
            { num: 28, answers: ['equipment'], maxWords: 1 },
            { num: 29, answers: ['folder'], maxWords: 1 },
            { num: 30, answers: ['results'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-20.mp3',
      title: 'Listening — Section 4: The History of Chocolate',
      instructions: 'You will hear a lecture about the history of chocolate. Listen and answer Questions 31–40.',
      transcript: `Today I'm going to talk about the history of chocolate, which stretches back over three thousand years.

Chocolate comes from the seeds of the cacao tree, which grows in the tropical regions of Central and South America. The first people to use it were the ancient Olmec, but it was the Maya and later the Aztecs who truly valued it. They ground the roasted seeds and mixed them with water to make a bitter drink. Interestingly, the seeds were also used as a form of currency — you could actually buy everyday goods with cacao beans.

When Spanish explorers reached the Americas in the sixteenth century, they carried chocolate back to Europe. There, people added sugar to the drink to make it sweeter, and it quickly became a fashionable luxury among the wealthy. For a long time chocolate stayed expensive, because processing the beans by hand was extremely slow.

Everything changed during the Industrial Revolution. New machinery made it possible to produce chocolate on a large scale, and prices began to fall. A major breakthrough came in 1828, when a Dutch chemist invented a press that removed much of the fat, leaving a smooth powder that was far easier to use.

The solid chocolate bar we know today appeared a few decades later. Manufacturers found that adding extra cocoa butter produced a bar that would melt in the mouth. Soon afterwards, the addition of milk created milk chocolate, which became hugely popular, especially with children.

The sequence was not quite as simple as popular histories sometimes suggest. Techniques developed in different places and companies competed over texture, shelf life and price. Grinding reduced the particles, while careful heating and mixing helped create the smooth consistency consumers expected. Packaging mattered too: once bars could be wrapped and transported reliably, chocolate moved beyond specialist shops into a mass market.

Demand also changed what manufacturers sold. Dark chocolate contains cocoa solids and cocoa butter but no added milk solids, whereas recipes for milk and white chocolate use different proportions. Legal definitions vary between countries, so a product sold under one name in one market may need a different label elsewhere. This is one reason historians distinguish cacao as the tree or raw crop from the many processed foods called chocolate.

Today chocolate is a global industry worth billions. However, it faces serious challenges. Most cacao is now grown in West Africa, where many smallholder farmers have limited bargaining power and incomes can be unstable. A low shop price does not show how revenue is divided among growers, traders, processors and retailers. Certification schemes try to improve traceability and farming practices, but their standards and coverage differ; a logo is not evidence that every social or environmental problem has been solved.

There are environmental concerns as well, since expanding plantations into forested land can contribute to deforestation. Yet simply blaming individual farmers misses wider pressures, including insecure land rights, crop disease, ageing trees and volatile prices. Some programmes therefore combine forest monitoring with training, shade-grown production and support for more productive existing farms.

Climate change adds another layer of uncertainty. Cacao thrives within a limited range of temperature and rainfall, and changing conditions can alter where it grows well. Researchers and farmers are testing more resilient varieties, but a new tree takes time to mature. That long investment horizon makes stable income and access to advice especially important.

So next time you eat a chocolate bar, remember that its history is not only a chain of inventions. It is also a continuing story about agriculture, trade, consumer taste and the choices used to share risks and rewards across a global supply network.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE HISTORY OF CHOCOLATE',
          template: `Origins

• Chocolate comes from the seeds of the {{31}} tree.
• The seeds were also used as a form of {{32}}.

Arrival in Europe

• Spanish explorers carried chocolate back to {{33}}.
• People added {{34}} to make the drink sweeter.

Industrial change

• In 1828 a Dutch {{35}} invented a press.
• The press removed much of the {{36}}.
• Adding extra cocoa {{37}} produced a bar that melts in the mouth.
• The addition of {{38}} created milk chocolate.

Today

• Most cacao is now grown in West {{39}}.
• Expanding plantations can lead to {{40}}.`,
          blanks: [
            { num: 31, answers: ['cacao', 'cocoa'], maxWords: 1 },
            { num: 32, answers: ['currency'], maxWords: 1 },
            { num: 33, answers: ['Europe'], maxWords: 1 },
            { num: 34, answers: ['sugar'], maxWords: 1 },
            { num: 35, answers: ['chemist'], maxWords: 1 },
            { num: 36, answers: ['fat'], maxWords: 1 },
            { num: 37, answers: ['butter'], maxWords: 1 },
            { num: 38, answers: ['milk'], maxWords: 1 },
            { num: 39, answers: ['Africa'], maxWords: 1 },
            { num: 40, answers: ['deforestation'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Crisis of Antibiotic Resistance',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Crisis of Antibiotic Resistance

Antibiotics—medicines that kill or inhibit bacteria—are among the most transformative discoveries in the history of medicine. After Alexander Fleming observed the antibacterial action of a Penicillium mould in 1928, later research turned penicillin into a medicine. Antibiotics made many previously fatal infections treatable and lowered the infection risk surrounding surgery, organ transplantation and cancer chemotherapy. That capacity is now threatened by a biological process that medicine can manage but not abolish: antimicrobial resistance (AMR).

Resistance is a product of selection. When a drug suppresses susceptible bacteria, organisms carrying a protective mutation or an acquired resistance gene may survive and reproduce. Bacteria can inherit resistance vertically and can also exchange genetic material, so a useful trait need not remain within one lineage. Evolution cannot be stopped, but unnecessary exposure increases selection pressure. Examples include prescribing antibiotics for viral infections such as colds and influenza, self-medication with unsuitable doses, and inappropriate use in food-producing animals. Agriculture is one important sector, although the routes by which resistant organisms and genes move among people, animals and the environment are complex.

The burden is already severe, but two measures are easily confused. A major analysis estimated that bacterial AMR was attributable to 1.27 million deaths in 2019 and associated with 4.95 million deaths in total; the larger number is not a further group to add to the first. An influential review also projected that annual deaths associated with drug-resistant infections could reach ten million by 2050 under its assumptions. That figure is a scenario, not an observed total. To guide research, the WHO's 2024 bacterial priority pathogens list groups 24 pathogens in 15 families into critical, high and medium categories. It includes resistant forms of Klebsiella pneumoniae, Acinetobacter baumannii and Enterococcus faecium; some resist carbapenems, drugs often reserved as last-resort treatments for severe infections when alternatives are limited.

The antibiotic pipeline—the route from laboratory discovery through trials and approval—has remained inadequate. Antibiotics are usually taken for short periods and should be prescribed cautiously to preserve effectiveness. Those features weaken the conventional commercial reward for developing them. By the end of 2023, the WHO counted 97 antibacterial products in clinical development for priority pathogens, yet judged the pipeline insufficient because too few candidates were innovative or directed at the most urgent threats. Counting candidates alone is misleading: many will fail, and approval does not guarantee affordable access in every health system.

Addressing AMR requires action on several fronts. Stewardship programmes aim to ensure that antibiotics are used only when indicated, with an appropriate drug, dose and duration. Diagnostics can support that decision, but capabilities vary: some rapid tests identify a pathogen or resistance marker quickly, while conventional culture and susceptibility testing may take much longer. A test must also be affordable, available and interpreted in context. In animal production, vaccination, hygiene and veterinary oversight can reduce the need for treatment. The European Union restricts routine use and reserves prophylaxis for exceptional individual cases, rather than pretending that all preventive and therapeutic uses are identical.

International coordination is essential because resistant organisms and genes move through trade, travel and environmental flows. The WHO's Global Action Plan on Antimicrobial Resistance, adopted in 2015, provides a framework, but implementation and surveillance capacity remain uneven. The pandemic disrupted health services and changed antibiotic use, although its effects differed by place and time; it should not be treated as a single quantified cause of every later trend. In 2024, governments agreed a global target to reduce deaths associated with bacterial AMR by ten percent by 2030 from the 2019 baseline. That commitment makes measurement as important as invention: countries need comparable data to know whether stewardship, infection prevention and access to effective treatment are improving together.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Fleming observed the antibacterial action of a mould in 1928.\n2. {{2}}: Antibiotic resistance arises because antibiotics completely eliminate all bacteria in a population.\n3. {{3}}: Inappropriate antibiotic use in food-producing animals can add to the selection pressure for resistance.\n4. {{4}}: In 2019, AMR was directly responsible for 4.95 million deaths globally.\n5. {{5}}: The WHO regarded all 97 antibacterial products in clinical development at the end of 2023 as sufficient.\n6. {{6}}: Every health facility can now identify a pathogen and its resistance within minutes.\n7. {{7}}: The WHO Global Action Plan on AMR was adopted in 2015.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] },
            { num: 5, answers: ['FALSE'] },
            { num: 6, answers: ['FALSE'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. Antibiotic {{8}} programmes aim to ensure that drugs are prescribed only when necessary and in correct doses.\n9. Carbapenems are described in the passage as {{9}} treatments when alternatives are limited.\n10. The route from laboratory discovery through trials and approval is called the antibiotic {{10}}.\n11. The pandemic {{11}} health services and changed patterns of antibiotic use.\n12. Resistance genes spread internationally through trade, travel, and {{12}} flows.\n13. The WHO groups urgent bacterial threats as {{13}} pathogens.`,
          blanks: [
            { num: 8, answers: ['stewardship'] },
            { num: 9, answers: ['last-resort'] },
            { num: 10, answers: ['pipeline'] },
            { num: 11, answers: ['disrupted'] },
            { num: 12, answers: ['environmental'] },
            { num: 13, answers: ['priority'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Urban Gardening and the Green City',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Urban Gardening and the Green City

A. Urban gardening—the cultivation of plants within city environments—has moved from a marginal activity associated with wartime food production and community allotments to a significant component of contemporary urban planning and sustainability strategy. From rooftop gardens and vertical farms to community vegetable patches and edible street planting, cities around the world are increasingly integrating growing spaces into the fabric of urban life. This shift reflects both practical motivations—food security, environmental benefits—and deeper cultural desires for connection to nature and community.

B. The history of urban food growing is long and cyclical. In both world wars, "victory gardens" were promoted by governments in the United Kingdom and United States as a patriotic response to pressure on food supplies, with public parks and private lawns converted to vegetable production. Cuba's "organoponico" movement expanded after the loss of Soviet trade and inputs in the early 1990s. Organopónicos and other urban farms converted many plots in and around Havana to food production. The case is important because it shows how policy, access to land and necessity can accelerate urban cultivation; it does not provide a universal estimate of the share of vegetables that every city could grow.

C. Urban vegetation can provide several environmental services, although their scale depends on design, climate and maintenance. Shade and evapotranspiration can moderate the heat island effect locally, plants store some carbon, and varied planting can provide habitat for pollinators, birds and invertebrates. Where stormwater management is a challenge, suitable green roofs and garden soils can retain rainfall and slow runoff, alleviating pressure on drainage systems. Claims about air quality require particular care. Vegetation may intercept some particles, but species, street geometry and airflow affect the outcome, and dense planting in a confined street can sometimes restrict dispersion. A garden is therefore one component of green infrastructure, not a substitute for controlling pollution at source.

D. Possible social and health benefits have attracted growing research interest. Studies often find associations between contact with green space or gardening and lower reported stress, depression or anxiety, as well as better subjective wellbeing. Such findings do not prove that a garden alone caused the difference: people who participate may already differ from non-participants, and programmes vary greatly. Community gardens can nevertheless create repeated opportunities for social contact across age, ethnicity and income. Some surveys report higher social trust and community cohesion in neighbourhoods with gardens, but a credible evaluation must consider selection, local leadership and how safely the space is maintained.

E. The contribution of urban agriculture to food security is real but often overstated. Urban growing can supplement household food budgets, particularly for low-income families, and can provide access to fresh produce in areas described as "food deserts"—urban neighbourhoods where affordable, nutritious food is difficult to obtain. However, the physical constraints of urban environments—limited space, competition for land, soil contamination, and artificial light requirements for indoor growing—mean that cities are unlikely to achieve meaningful self-sufficiency in food production in the foreseeable future. The economic viability of urban farming at scale remains contested; many operations require significant public subsidy or premium pricing to remain financially sustainable.

F. Vertical farming—the cultivation of crops in stacked layers within controlled indoor environments, typically using artificial LED lighting, hydroponic nutrient systems, and precise climate control—has attracted enormous investor attention as a potential solution to the space constraints of urban agriculture. Proponents argue that vertical farms can produce dramatically higher yields per unit of land area than conventional agriculture and can be located anywhere, independent of climate and soil conditions. Critics point to the high capital and energy costs of these systems, and question whether the environmental benefits of local food production justify the carbon footprint of the artificial lighting and climate control that vertical farms require.

G. The future of urban gardening will be shaped by land-use rules, tenure, water access and public investment as well as community priorities. Integrating green infrastructure when a district is planned can make room for connected soil, drainage and public access. Existing cities face the harder task of retrofitting dense environments built for other purposes. Even then, technical design is only part of the answer. A short grant may create planting beds, but long-term value depends on who can use the space, who maintains it and whether development pressure can displace it. The strongest policy case is therefore not that every garden delivers every claimed benefit, but that clearly defined projects can be assessed against food, water, biodiversity or social goals instead of being judged by appearance alone.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of a country that developed large-scale urban farming in response to an economic crisis', answer: 'B' },
            { num: 15, stem: 'Survey findings of higher reported social trust in neighbourhoods with gardens', answer: 'D' },
            { num: 16, stem: 'A caution that cities are unlikely to achieve significant food self-sufficiency through urban farming', answer: 'E' },
            { num: 17, stem: 'An overview of how urban gardening has become part of contemporary sustainability strategy', answer: 'A' },
            { num: 18, stem: 'A description of how vertical farms work and the debate about their environmental credentials', answer: 'F' },
            { num: 19, stem: 'An argument that the best outcomes require integrating green space into city planning from the beginning', answer: 'G' },
            { num: 20, stem: 'A mention of the role urban gardens can play in managing rainwater and reducing flooding risk', answer: 'C' },
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
          title: 'Urban Gardening: Benefits and Limitations',
          template: `Urban gardening has a long history, including wartime {{21}} gardens that converted parks and lawns to food production. In Cuba, the {{22}} movement transformed abandoned lots into community growing spaces after economic crisis. Urban green spaces provide environmental benefits including reducing the {{23}} effect, absorbing CO₂, and supporting biodiversity. Community gardens are associated with reduced {{24}} and improved social cohesion across demographic groups. However, soil {{25}} and space constraints mean cities are unlikely to achieve food self-sufficiency. Vertical farming uses hydroponic systems and artificial light, but its high {{26}} costs and energy demands have attracted criticism.`,
          blanks: [
            { num: 21, answers: ['victory'] },
            { num: 22, answers: ['organoponico'] },
            { num: 23, answers: ['heat island'] },
            { num: 24, answers: ['depression', 'anxiety'] },
            { num: 25, answers: ['contamination'] },
            { num: 26, answers: ['capital'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The Future of Transport',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Future of Transport

Transport systems connect homes, jobs and markets, but they also lock in energy use and patterns of access. In the European Union, for example, transport including international aviation and shipping accounted for about 31 percent of greenhouse-gas emissions in 2023, and road transport produced nearly 73 percent of the transport total. The figures are regional rather than global, but they illustrate why changing mobility matters. Three recurring pathways are electrification, modal shift and improved efficiency; none removes the need to examine how much travel is created and who can reach essential destinations.

Electrification is the most visible pathway. Nearly 14 million electric cars were sold worldwide in 2023, more than 17 million in 2024 and 21 million in 2025; their share of new-car sales rose from about 18 percent to one quarter over those three years. Falling battery costs and wider model choice helped this expansion, but policy and affordability still matter. In China, many battery-electric models are cheaper than comparable conventional cars, whereas purchase-price gaps remain in some other major markets. Charging access is also uneven, especially for apartment residents, rural drivers and people unable to install a private charger. Supply chains for lithium, graphite, nickel and other materials create environmental, labour and geopolitical questions that sales totals alone cannot answer.

Electrification, however, is not sufficient by itself. Lifecycle assessment includes mineral processing, vehicle and battery manufacture, fuel or electricity production, use and disposal. On a global-average basis, the IEA estimates that a medium-sized battery-electric car sold in 2023 produces about half the lifetime emissions of a comparable internal-combustion car over 15 years. The result is not identical everywhere: vehicle size, distance driven and the carbon intensity of electricity affect the comparison. Battery production generally gives an electric car higher manufacturing emissions, but a universal two- or three-year "payback" cannot be stated without assumptions. Moreover, electrification removes tailpipe exhaust, not congestion, tyre wear, road danger or the land devoted to driving and parking.

Modal shift means moving suitable journeys from private cars or aircraft to public transport, walking or cycling. Its impact depends on occupancy, energy supply and whether new journeys replace old ones, yet active travel and well-used rail usually require far less energy per passenger than a private car. Urban form affects whether those choices are practical. Mixed-use neighbourhoods with connected streets and nearby services tend to generate lower travel demand and make active modes easier than dispersed, single-use development. Frequency, reliability, safe routes and affordable fares matter at least as much as announcing a new vehicle technology.

Autonomous vehicles have attracted intense investment since the early 2010s, but the phrase covers different capabilities. Driver-assistance features still require supervision, while limited driverless services operate inside mapped areas under specified conditions. By 2026, robotaxis had expanded beyond early pilots, yet they still served selected, controlled urban environments rather than every road and weather condition. This distinction matters: success inside an operational boundary does not prove universal autonomy. Policy must also consider responsibility after a collision, accessibility, cybersecurity and whether empty vehicles add traffic while travelling to their next passenger.

Physical infrastructure changes slowly. Roads, railways, ports and airports are expensive, long-lived systems, so decisions made today will constrain and enable transport choices for generations. High-speed rail can replace some short-haul flights where demand, geography and connections support it, but the passage does not claim that it has replaced a majority of them. Aviation remains difficult to decarbonise. Sustainable aviation fuel can work in existing aircraft when certified, but global supply is still small and generally more costly than conventional jet fuel. Hydrogen and battery-electric aircraft face questions of storage, weight, infrastructure and range. Each option therefore has a possible role rather than a guaranteed timetable.

The equity dimension is frequently overlooked in technology-led accounts. Early benefits from electric cars and app-based services often accrue to households able to buy a newer vehicle, charge at home or live in a well-served area. Meanwhile, a low-income worker on an early shift may depend on an older car because no bus runs at that hour. A fair transition cannot simply make one technology expensive before a usable alternative exists. Distributional tests should ask who receives subsidies, who bears road pricing, whether disabled travellers can use a service and how rural access will be protected. Improving mobility equity—people's practical ability to reach work, education, health care and social life—is therefore a defining policy challenge, not an optional benefit. Useful evaluation must combine averages with distribution: travel time, household cost, reliability, injury risk and access can improve for one group while worsening for another. Publishing those differences makes trade-offs visible and gives residents evidence with which to challenge a technically impressive but socially weak plan.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'Which factor does the passage identify as helping electric-car sales to expand?',
          options: [
            'Government subsidies have made EVs cheaper than conventional vehicles in every market.',
            'Falling battery costs alongside a wider choice of models.',
            'The superior performance and range of electric vehicles compared to petrol cars.',
            'International agreements requiring car manufacturers to phase out combustion engines.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What does the passage say about lifecycle emissions from electric vehicles?',
          options: [
            'Manufacturing emissions can be ignored because electric cars have no exhaust.',
            'Battery production raises manufacturing emissions, but the full comparison depends on several assumptions.',
            'The carbon debt of EV manufacturing is higher in countries with renewable electricity grids.',
            'The carbon debt means that EVs never achieve a lower carbon footprint than petrol cars.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What does the passage suggest about autonomous vehicles?',
          options: [
            'They operate without geographic or weather restrictions in most major cities by 2026.',
            'They have proved much more difficult to deploy than early optimists predicted.',
            'Most investment in AVs has come from public transport authorities rather than private companies.',
            'They are expected to be widely available within the next two to three years.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What equity concern about the transport transition does the passage identify?',
          options: [
            'EVs are too expensive for high-income households in most countries.',
            'Public transport improvements have benefited rural areas more than cities.',
            'The benefits of new mobility technologies have disproportionately gone to wealthier, urban households.',
            'Lower-income countries are choosing to build high-speed rail instead of expanding road networks.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The writer argues that electrification alone is sufficient to decarbonise the transport sector fully.\n32. {{32}}: The carbon benefit of an EV depends significantly on how clean the electricity grid is in the country where it is charged.\n33. {{33}}: Cities designed at human scale with mixed uses tend to generate lower overall travel demand than car-dependent sprawl.\n34. {{34}}: High-speed rail has already replaced the majority of short-haul flights in Europe and Asia.\n35. {{35}}: Sustainable aviation fuels are already available at cost-competitive prices and are widely used by major airlines.\n36. {{36}}: The passage suggests that transport infrastructure built today will constrain choices for future generations.`,
          blanks: [
            { num: 31, answers: ['NO'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NOT GIVEN'] },
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
          template: `37. The three principal pathways for decarbonising transport are electrification, {{37}}, and improved efficiency.\n38. Electric vehicles are charged from electricity grids of varying {{38}} intensity, which determines their actual climate benefit.\n39. Robotaxi services currently operate in a limited number of cities in {{39}} urban environments with favourable road conditions.\n40. The passage identifies improving {{40}} equity as one of the defining challenges for transport policy in the coming decades.`,
          blanks: [
            { num: 37, answers: ['modal shift'] },
            { num: 38, answers: ['carbon'] },
            { num: 39, answers: ['controlled'] },
            { num: 40, answers: ['mobility'] },
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
          imageUrl: '/assets/ielts/charts/set20-task1.svg',
          imageAlt: 'Two bar charts comparing global electric-car sales in millions and their share of new-car sales in 2023, 2024 and 2025. Sales were approximately 14 million, more than 17 million and 21 million; shares were approximately 18%, more than 20% and 25%, respectively.',
          stimulus: 'The two bar charts below compare global electric-car sales and their share of all new-car sales in 2023, 2024 and 2025.',
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
          stimulus: 'Many city governments want to reduce traffic congestion, air pollution and greenhouse-gas emissions linked to private cars. One approach is to discourage driving directly through congestion charges, fewer parking spaces or restrictions in busy districts. Supporters say that road space is limited and that people will not change their habits while driving remains the easiest option. Critics argue that restrictions can be unfair to disabled people, rural commuters and shift workers who do not yet have a practical alternative. They believe public authorities should first invest in frequent public transport, safe walking and cycling routes, and better connections between suburbs and employment areas. The debate is therefore not only about technology or the environment; it is also about the timing of change, access to essential journeys and how costs are shared across different groups.',
          text: 'Some people believe cities should restrict private-car use directly, while others believe they should improve alternatives without restricting drivers. Discuss both views and give your own opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about transport and getting around',
          followUp: [
            'How do you usually travel to work or study?',
            'Do you drive a car, or do you prefer public transport? Why?',
            'How long does your usual journey take?',
            'Is there a type of transport you dislike using? Why?',
            'Did you travel differently when you were a child?',
            'Have you ever used a bicycle as a regular form of transport?',
            'What do you think could be improved about public transport in your city or town?',
            'Do you think the way you travel will change in the future?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a health issue or challenge that you think is important for your community or country.\n\nYou should say:\n• what the health issue is\n• how widespread it is\n• what is currently being done about it\n• and explain why you think this issue deserves more attention`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Health, environment, and the future of cities',
          followUp: [
            'Why do some public-health problems receive more attention than others?',
            'How should governments decide whether prevention or treatment deserves more funding?',
            'To what extent should authorities restrict individual behaviour to protect public health?',
            'Why can health information change behaviour in some groups but not in others?',
            'How does the design of a city influence residents\' physical and mental health?',
            'Who should be responsible for reducing health inequalities in a community?',
          ],
        },
      ],
    },
  ],
};

export default mock;
