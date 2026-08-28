import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-8',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 8',
  subtitle: 'The Domestication of Dogs · Vertical Farming · Psychology of Money',
  timeMinutes: 164,
  sections: [
    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-8.mp3',
      title: 'Listening — Section 1: Reporting a Lost Item',
      instructions: 'You will hear a conversation between a passenger and a lost property officer. Listen and answer Questions 1–10.',
      transcript: `OFFICER: Good afternoon, lost property office. How can I help?

PASSENGER: Hi, I think I left a bag on a train earlier today, and I'm hoping someone's handed it in.

OFFICER: I'll do my best to help. Let me take some details and fill in a report. Can I start with your name?

PASSENGER: Yes, it's Daniel Ashworth.

OFFICER: Could you spell the surname for me?

PASSENGER: Of course — A-S-H-W-O-R-T-H.

OFFICER: Ashworth, thank you. And a phone number we can reach you on?

PASSENGER: Yes, it's 0161 496 0175.

OFFICER: Let me just repeat that — 0161 496 0175. Now, what exactly did you lose?

PASSENGER: Before we continue, do you need an email address as well?

OFFICER: Not for the initial search. We use the telephone number for urgent contact and ask for further details only if an item is found. The report receives a reference number, so you won't need to repeat personal information whenever you call.

PASSENGER: It was a suitcase — sorry, no, I mean a rucksack. I've been travelling all day and I'm a bit muddled.

OFFICER: No problem at all. And what colour is the rucksack?

PASSENGER: It's green — a dark green, with grey straps.

OFFICER: Right. And where do you think you left it?

PASSENGER: I'm fairly sure I left it on the train, up on the luggage rack, rather than down on the platform.

OFFICER: That's helpful. Was there anything valuable inside?

PASSENGER: Yes, unfortunately — my laptop was in the main compartment, along with some books.

OFFICER: Can you describe the outside more precisely? Similar bags arrive every day.

PASSENGER: There's a small reflective strip across the front pocket and one buckle is scratched. It has no name label, but a paper luggage tag from an earlier journey is tied to the handle.

OFFICER: Excellent; those details are more useful than the brand. Please don't give me a password or any private information from the laptop.

OFFICER: I'll note that down. Now, a few details about your journey so we can trace it. Where were you travelling from?

PASSENGER: From Manchester, on the two o'clock service.

OFFICER: Was it a direct train or did you change?

PASSENGER: Direct. It stopped twice, and I got off at Preston. I remember taking my coat from the hook, but I must have left the bag above the seat.

OFFICER: That narrows the search to one carriage rather than the whole route.

OFFICER: And which day was that — today?

PASSENGER: Yes, today, Friday.

OFFICER: Good. Weekend staffing is different, so recording the day prevents the request going to Monday's collection by mistake.

OFFICER: Do you remember your seat number?

PASSENGER: It was seat 43, in the quiet coach.

OFFICER: Were you facing forwards or backwards?

PASSENGER: Forwards, beside the aisle. Another passenger joined at the second stop, but the rack was nearly empty when I boarded.

OFFICER: And roughly what would you say the contents are worth, for the report?

PASSENGER: All together, probably around £400.

OFFICER: That's an estimate, not a promise of compensation, but it helps us classify the report. If we find the rucksack, you'll need identification to collect it. We can transfer it to this station without charge, although that normally takes two working days.

OFFICER: Thank you. I'll circulate this description straight away, and we'll call you the moment anything matching turns up.

PASSENGER: That's very kind. Is it worth me checking back tomorrow as well?

OFFICER: By all means — most items are handed in within a day or two, so there's every chance we'll trace it.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Lost Property Report',
          example: 'First name:  Daniel',
          template: `Surname: {{1}}
Contact number: {{2}}
Item lost: {{3}}
Colour: {{4}}
Item was left on the {{5}}
Most valuable contents: a {{6}}`,
          blanks: [
            { num: 1, answers: ['Ashworth', 'ashworth'], maxWords: 1 },
            { num: 2, answers: ['0161 496 0175', '01614960175'], maxWords: 1 },
            { num: 3, answers: ['rucksack'], maxWords: 1 },
            { num: 4, answers: ['green'], maxWords: 1 },
            { num: 5, answers: ['train'], maxWords: 1 },
            { num: 6, answers: ['laptop'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Journey detail', 'Information'],
          rows: [
            ['Travelling from', { num: 7, answers: ['Manchester', 'manchester'], maxWords: 1 }],
            ['Day of travel', { num: 8, answers: ['Friday', 'friday'], maxWords: 1 }],
            ['Seat number', { num: 9, answers: ['43'], maxWords: 1 }],
            ['Estimated value of contents', { num: 10, answers: ['400', '£400'], maxWords: 1 }],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-8.mp3',
      title: 'Listening — Section 2: Community Festival Briefing',
      instructions: 'You will hear a briefing given to volunteers at a community festival. Listen and answer Questions 11–20.',
      transcript: `Good morning, everyone, and thank you for volunteering at this year's Riverside Community Festival. Before we open the gates, let me run through the key information.

First, what's new this year. We've kept all our old favourites — the food market, the evening concert, and the popular fireworks display are all returning. But we've added two brand-new attractions: a children's parade through the grounds at midday, and a series of craft workshops in the main tent.

The parade route has been shortened so young participants do not cross the service road. Families should assemble at the east lawn twenty minutes beforehand. Workshop places are allocated at the tent rather than online; volunteers must never promise a place, because capacity depends on the activity and age group.

Now, some practical details you'll need in order to answer visitors' questions. As always, the festival is being held in Victoria Park, right in the centre of town.

The northern entrance has level access, and a temporary hard-surface route connects it to the central facilities. A quiet space is available near the community garden. Please point visitors to the accessibility desk if they need a loan wheelchair or a large-print programme.

This year the event runs for three days, from Friday afternoon through to Sunday evening, so we've got a long weekend ahead of us. It's shaping up to be our biggest festival yet, with well over two hundred stalls already booked.

For those of you volunteering, please collect your festival T-shirt from the desk behind me before you start your shift — it helps visitors to identify you.

Wear your own name badge as well, and sign both in and out. If you swap a shift, tell the coordinator; otherwise we cannot tell whether an area is properly staffed. Water and a secure cupboard for personal belongings are provided in the volunteer room.

Let me remind you of the layout. The main stage is set up beside the lake, where there's plenty of room for a crowd.

Barriers mark a clear emergency lane behind it. Keep that route open, even between performances, and ask a steward rather than moving a barrier yourself. The smaller acoustic stage is on the opposite side of the grounds, so check which stage a visitor means.

Parking is always a common question. Visitors can leave their cars at the sports centre just across the road, as there's no parking inside the park itself.

There is also supervised bicycle parking at the south entrance. Performers and suppliers use a separate gate and must show a vehicle pass; ordinary visitors should not be directed there, even if the public car park is busy.

Now, we are expecting some rain on Saturday. If the weather turns bad, the outdoor performances will be moved into the marquee near the west gate.

A very important point: if you come across a child who has become separated from their family, please bring them straight to the information tent, where our trained staff will look after them.

And finally, a reminder of why we're all here. This year, all the money we raise will go to the local hospital, to fund new equipment for the children's ward.

Please separate recycling at every food area and report a full bin rather than trying to compress it. For medical help, contact the first-aid team by radio. Do not announce a person's name over the main-stage microphone unless the control tent authorises it.

Right — let's have a wonderful festival. The gates open in ten minutes.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO attractions are new at this year\'s festival?',
          options: [
            { letter: 'A', text: 'the food market' },
            { letter: 'B', text: 'the evening concert' },
            { letter: 'C', text: 'the children\'s parade' },
            { letter: 'D', text: 'the craft workshops' },
            { letter: 'E', text: 'the fireworks display' },
          ],
          selectCount: 2,
          answers: ['C', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Riverside Community Festival',
          template: `• Location: {{13}}, in the town centre.
• The festival runs for {{14}}.
• Volunteers should collect their {{15}} before their shift.
• The main stage is beside the {{16}}.
• Visitors can park at the {{17}} across the road.
• If it rains, performances move to the {{18}}.
• Lost children should be taken to the {{19}}.
• Money raised goes to the local {{20}}.`,
          blanks: [
            { num: 13, answers: ['Victoria Park', 'park'], maxWords: 2 },
            { num: 14, answers: ['three days', '3 days'], maxWords: 2 },
            { num: 15, answers: ['T-shirt', 't-shirt'], maxWords: 1 },
            { num: 16, answers: ['lake'], maxWords: 1 },
            { num: 17, answers: ['sports centre'], maxWords: 2 },
            { num: 18, answers: ['marquee'], maxWords: 1 },
            { num: 19, answers: ['information tent', 'tent'], maxWords: 2 },
            { num: 20, answers: ['hospital'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-8.mp3',
      title: 'Listening — Section 3: Business Plan Tutorial',
      instructions: 'You will hear a student discussing a business plan with his tutor. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Come in, Sam. I've read the draft of your business plan — a mobile bicycle-repair service. Let's talk it through.

SAM: Thanks. I'm quite excited about it.

TUTOR: So why this idea in particular?

SAM: I've repaired bikes as a hobby for years, but really it came from a gap I noticed — there are lots of cyclists here but hardly any repair shops, and nobody wants to carry a broken bike across town.

TUTOR: A sensible start. Now, your market research. You surveyed thirty people, but they were all from your cycling club. What's the problem there?

SAM: I suppose they're already keen cyclists, so they're not really typical customers.

TUTOR: Exactly — your sample is biased. Next, pricing. You planned to charge less than the existing shops. Is that wise?

SAM: I should probably interview occasional cyclists and commuters who do not belong to a club, and record how recently each person paid for a repair.

TUTOR: Yes. Ask about actual behaviour as well as hypothetical interest. Someone may like the idea but still repair a puncture at home.

SAM: I thought a low price would attract customers, but it might not cover my costs. Maybe I should charge the same as competitors and compete on convenience instead.

TUTOR: I agree — convenience is your real selling point. And don't ignore the online retailers selling cheap spare parts. How could you compete?

SAM: I could offer something they can't — visiting the customer at home.

TUTOR: Precisely. You cannot win every comparison on component price, but you can offer diagnosis, fitting and a booked time. State what happens if a repair needs workshop equipment you cannot carry.

TUTOR: Good. Last thing — the biggest risk. What worries you most?

SAM: Honestly, cash flow. Early on I'll have spent money on tools and a van, but I won't have many customers yet.

TUTOR: Model a cautious case, not only the number of bookings you hope for. Include fuel, card fees, replacement tools and tax, and allow for winter weeks when fewer people cycle.

TUTOR: A realistic fear. Now, the document itself. It opens too slowly — add a short summary at the very start that captures the whole idea.

SAM: Should it contain every figure?

TUTOR: No. It should identify the customer problem, the mobile solution and the immediate funding need. A reader can inspect the assumptions later.

SAM: An executive summary, yes.

TUTOR: Second, your finances are thin. I want a monthly cash-flow forecast for the first year.

SAM: I'll build one.

TUTOR: Show money entering and leaving in the month when it actually moves. Profit on paper will not pay a bill if a customer has not yet paid.

TUTOR: Third, you describe the product but not the buyers. Add a clear description of your target customers.

SAM: Cyclists who commute, mostly.

TUTOR: Put that in. And there's nothing on how people will hear about you, so include a section on marketing. One more practical thing you've forgotten — you must arrange insurance before taking on any paying work.

SAM: I could test a small local search advert and partnerships with employers that provide cycle parking, then compare enquiries rather than counting views.

TUTOR: Good. Also describe how you will keep booking details secure and dispose of replaced parts responsibly. Those operational choices affect trust as much as a logo does.

SAM: I hadn't thought of that. I'll sort it out.

TUTOR: Do all that and resubmit next week.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'Sam chose the business idea mainly because',
          options: [
            'he has always wanted to run a business',
            'he noticed a gap in the local market',
            'a friend suggested it to him',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'The tutor thinks Sam\'s market research is weak because',
          options: [
            'too few people were surveyed',
            'the questions were badly written',
            'the people he surveyed were not typical customers',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'Regarding pricing, Sam finally decides to',
          options: [
            'charge less than his competitors',
            'charge the same as his competitors',
            'offer a free first repair',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'The tutor advises Sam to respond to online competitors by',
          options: [
            'offering a service they cannot — visiting customers at home',
            'selling spare parts more cheaply than them',
            'opening a physical shop',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'Sam says the biggest risk to the business is',
          options: [
            'competition from established repair shops',
            'his own lack of technical skill',
            'poor cash flow in the early months',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `The business plan still needs:
• a short {{26}} at the very beginning.
• a monthly cash-flow {{27}} for the first year.
• a description of the target {{28}}.
• a section on {{29}}.
• Sam must also arrange {{30}} before starting.`,
          blanks: [
            { num: 26, answers: ['summary'], maxWords: 1 },
            { num: 27, answers: ['forecast'], maxWords: 1 },
            { num: 28, answers: ['customers', 'customer'], maxWords: 1 },
            { num: 29, answers: ['marketing'], maxWords: 1 },
            { num: 30, answers: ['insurance'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-8.mp3',
      title: 'Listening — Section 4: The History of Clocks',
      instructions: 'You will hear a lecture about the history of clocks. Listen and answer Questions 31–40.',
      transcript: `Good afternoon. Today we'll trace the history of clocks — humanity's long effort to measure the passing of time. It's a story that stretches from simple shadows cast on the ground all the way to the steady vibrations of atoms.

The earliest timekeeping device was the sundial, used by ancient civilisations thousands of years ago.

That description is convenient rather than absolute: archaeology preserves some devices better than others, and people also estimated time from recurring events long before they built instruments. A sundial divides daylight locally; it does not deliver one universal hour independent of season and place.

A sundial works by casting a shadow that moves as the day progresses. Its obvious weakness, however, was that it depended entirely on the position of the sun, so it was useless at night or in cloudy weather.

To overcome this, other cultures developed the water clock, which measured time by the steady dripping of liquid from one container to another. Water clocks were used by the ancient Egyptians, among others, and worked in darkness as well as in daylight.

The next great step came in medieval Europe. The first mechanical clocks appeared in the great monasteries, where monks needed to know the correct hours for prayer.

Historians are cautious about assigning a single inventor. Surviving written records and mechanisms are incomplete, and mechanical timekeepers also appeared in towers and civic settings. Monastic schedules nevertheless provided a clear reason to sound hours without watching the sky.

These early machines were very different from clocks today. Remarkably, many had no hands at all; instead, they simply struck a bell to mark the hours.

Their escapements released stored energy in repeated steps. Friction, changes in driving force and rough manufacture limited accuracy, so an operator still adjusted the mechanism against an astronomical observation or another local reference.

A revolution in accuracy arrived in the seventeenth century. In 1656 the Dutch scientist Huygens built the first pendulum clock.

Galileo had studied pendulum motion earlier, but Huygens combined the principle with a working clock and patented his design. The period of a pendulum is stable only within limits: temperature changes its length and a moving ship disrupts its swing.

The swinging pendulum kept far steadier time than anything before it, making clocks vastly more accurate — losing only seconds a day rather than minutes.

The next challenge was to make clocks portable. This became possible with the invention of the coiled spring, which could power a clock without heavy weights, leading eventually to the pocket watch.

Accurate timekeeping also transformed navigation. Once reliable clocks could be carried on ships, sailors could finally calculate their longitude — their east–west position — something that had defeated navigators for centuries.

They compared local noon with the time kept for a reference meridian. Each hour of difference represented fifteen degrees of longitude. Marine chronometers therefore had to resist changes in motion, humidity and temperature throughout a voyage, and navigators still combined their readings with astronomical observations.

Finally, the modern age. Most clocks and watches today keep time using tiny vibrating crystals of quartz, which are astonishingly precise and cheap to produce.

An electronic circuit counts the stable oscillations produced when voltage is applied to quartz. Atomic clocks use transitions associated with atoms rather than a crystal; national laboratories compare them to maintain time scales. Everyday clocks remain less exact, yet networks can correct them without their owners seeing the reference process.

Next week, we'll look at how atomic clocks now define the very second itself.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE HISTORY OF CLOCKS',
          template: `Early timekeeping

• The earliest device was the {{31}}.
• It relied on the position of the {{32}} and failed at night.
• The water clock was used by the ancient {{33}}.

Mechanical clocks

• The first mechanical clocks appeared in European {{34}}.
• Many early clocks had no {{35}} and only struck a bell.

Greater accuracy

• In 1656 {{36}} built the first pendulum clock.
• The pendulum made clocks far more {{37}}.
• The coiled {{38}} allowed clocks to become portable.

Wider effects

• Reliable clocks let sailors calculate their {{39}} at sea.
• Modern clocks keep time using crystals of {{40}}.`,
          blanks: [
            { num: 31, answers: ['sundial'], maxWords: 1 },
            { num: 32, answers: ['sun'], maxWords: 1 },
            { num: 33, answers: ['Egyptians', 'egyptians'], maxWords: 1 },
            { num: 34, answers: ['monasteries'], maxWords: 1 },
            { num: 35, answers: ['hands'], maxWords: 1 },
            { num: 36, answers: ['Huygens', 'huygens'], maxWords: 1 },
            { num: 37, answers: ['accurate'], maxWords: 1 },
            { num: 38, answers: ['spring'], maxWords: 1 },
            { num: 39, answers: ['longitude'], maxWords: 1 },
            { num: 40, answers: ['quartz'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5, skill: 'reading',
      title: 'Reading — Passage 1: The Domestication of Dogs',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Domestication of Dogs

The domestic dog is the oldest animal companion of humanity, a relationship that predates agriculture, pottery, and the wheel. Yet the precise origins of this partnership remain one of archaeology's most debated questions. When, where, and how wolves became dogs are matters on which geneticists, archaeologists, and evolutionary biologists continue to disagree vigorously.

Archaeological classification is difficult because an early dog need not resemble a modern breed and a small wolf is not automatically a dog. Genomes published in 2026 identified dog ancestry in remains about 14,300 years old from Gough's Cave in Britain and about 15,800 years old from Pınarbaşı in Türkiye. The dated material indicates that a genetically related dog population was already widespread in western Eurasia by at least 14,300 years ago. It does not locate the first domestication event. Older proposed specimens remain disputed, and the earliest specimen recovered is not necessarily from the place where the lineage began.

Ancient-wolf DNA adds a different layer. An analysis of 72 wolf genomes found that dogs are generally closer to ancient wolves from eastern Eurasia than to the western Eurasian wolves sampled, yet no analysed wolf was a direct match for the progenitor. Many Near Eastern and African dogs also carry ancestry related to a second, western wolf population. The data can fit more than one history: two domestication processes that later merged, or an eastern domestication followed by admixture with western wolves. Missing genomes from relevant places and periods prevent a final choice between them.

How the relationship began is equally uncertain. One widely held theory proposes that wolves began following human hunter-gatherer groups to scavenge scraps and carrion. The bolder, less fearful individuals that approached humans most closely would have gained preferential access to food, and over generations, natural selection would have favoured traits associated with reduced aggression towards humans—a process sometimes called "self-domestication." Supporting this model is a landmark long-term experiment begun in Siberia in 1959 by geneticist Dmitri Belyaev, who selectively bred silver foxes for reduced fear of humans. Within a remarkably small number of generations, Belyaev's foxes began showing physical and behavioural traits associated with domestication: floppy ears, curled tails, shortened snouts, and reduced stress hormone levels. The experiment demonstrated that selection for tameness could rapidly produce the suite of traits observed in domestic animals.

The fox experiment demonstrates a possible process, not the historical route taken by dogs. Its animals came from a managed breeding population, people controlled which foxes reproduced, and researchers selected a behavioural response under captive conditions. Changes correlated with tameness may reflect linked genes, development or altered stress systems, and descriptions of when every physical trait appeared have been debated. The work supports the idea that selection on behaviour can have wider consequences; it cannot identify an ancient wolf population or decide whether wolves, people or both initiated contact.

Living with people also affected dog behaviour, but “unique” depends on the comparison and task. Dogs are highly sensitive to some human social cues: in standard cooperative experiments many follow a pointing gesture to locate hidden food more reliably than chimpanzees. Performance varies with development, experience and experimental design, and hand-raised wolves can succeed in some conditions. Dogs also use gaze, voice and body posture. These results support selection and learning for communication with people; they do not show literal mind-reading. Researchers who say dogs infer human intentions are describing performance in defined behavioural tests, not unrestricted access to another species' thoughts.

Calling the relationship an evolutionary bargain is a metaphor rather than a signed exchange. Dogs gained access to human-associated food and shelter; people later used dogs for transport, hunting, guarding and companionship. The balance was not uniformly beneficial. Free-ranging dogs can compete or hybridise with wild canids, while persecution and habitat change affect wolf populations differently across regions. A single global dog-to-wolf ratio would combine uncertain estimates and conceal those contrasts.

Diet shows that domestication continued after the first partnership. Some dog populations have extra copies of a gene involved in starch digestion, consistent with later adaptation to starch-rich human diets. Copy numbers vary, so the finding does not prove that agriculture initiated domestication or that every dog followed the same nutritional route. Traits could spread after dogs were already accompanying hunter-gatherers.

Evidence must therefore be tied to the question it can answer. Bone shape addresses morphology; ancient DNA traces ancestry; modern behaviour tests current animals under particular conditions. None alone reveals who first approached whom. The strongest account treats domestication as a changing relationship among human communities, dog lineages and wolf populations, and marks uncertainty instead of forcing every result into one origin story.`,
      questions: [
        {
          type: 'formgroup', id: 'r1-tfng', part: 5, qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Dog ancestry has been identified in remains more than 14,000 years old.\n2. {{2}}: Genetic studies have produced a single universally accepted theory of dog domestication.\n3. {{3}}: Belyaev's fox experiment began in the 1950s in Russia.\n4. {{4}}: Belyaev selected foxes based on their physical appearance rather than their behaviour.\n5. {{5}}: Foxes in Belyaev's experiment developed curled tails within the first generation.\n6. {{6}}: In standard cooperative tests, many dogs follow pointing more reliably than chimpanzees.\n7. {{7}}: A single worldwide dog-to-wolf ratio would hide important regional differences.`,
          blanks: [
            { num: 1, answers: ['TRUE'] }, { num: 2, answers: ['FALSE'] }, { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] }, { num: 5, answers: ['NOT GIVEN'] }, { num: 6, answers: ['TRUE'] }, { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup', id: 'r1-sent', part: 5, qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `8. Wolves that were less fearful of humans had better access to food scraps, a process sometimes called {{8}}.\n9. Belyaev's experiment showed that selection for {{9}} rapidly produced a range of domestication traits.\n10. Dogs are highly sensitive to some human {{10}} cues.\n11. In standard pointing tests, {{11}} are often less reliable than dogs.\n12. Behavioural studies investigate whether dogs infer human {{12}}.\n13. The relationship between early humans and dogs is described metaphorically as a {{13}}.`,
          blanks: [
            { num: 8, answers: ['self-domestication'] }, { num: 9, answers: ['tameness'] },
            { num: 10, answers: ['social'] }, { num: 11, answers: ['chimpanzees'] },
            { num: 12, answers: ['intentions'] }, { num: 13, answers: ['bargain'] },
          ],
        },
      ],
    },

    {
      part: 6, skill: 'reading',
      title: 'Reading — Passage 2: Vertical Farming',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Vertical Farming

A. Vertical farming grows crops in stacked layers, usually inside a controlled environment with electric lighting. The label covers different systems: a research cabinet, a converted warehouse and a purpose-built plant factory do not share one cost or footprint. Advocates point to land scarcity, recirculated water and protection from outdoor weather; critics point to capital, electricity and a narrow crop range. Any comparison must therefore declare its crop, location, electricity source and system boundary. A result per square metre of floor can favour stacked production, while a result per kilogram, calorie or unit of nutrition may answer a different question.

B. Stacking layers and scheduling several harvests can produce much more food per unit of building footprint. Closed hydroponic loops collect drainage and can recirculate water and nutrients, while indoor barriers reduce exposure to some pests and weather. These benefits are not automatic: disease can still enter a facility, sanitation requires resources and water accounting may or may not include electricity generation. One life-cycle comparison of lettuce supply chains found land and water use efficiency 38–60 times higher for controlled-environment production than for open-field production. That range belongs to the configurations studied, not to every vertical farm or every field.

C. A controlled facility separates production from local soil and much outdoor weather, which creates geographic flexibility. Projects operate in dense Japanese cities and in water-stressed Middle Eastern regions, but physical possibility is not the same as environmental advantage. Building near consumers may shorten transport and reduce spoilage, yet transport is often smaller than cultivation electricity in the life cycle of indoor lettuce. A city farm powered by a carbon-intensive grid can therefore have a larger climate footprint than field produce carried over a considerable distance. Local labour, cooling demand, building reuse and the reliability of the grid also shape the result.

D. The dominant operating challenge is electricity for lighting, cooling, ventilation and pumps. A 2022 comparison estimated roughly 15 kilowatt-hours of electricity per kilogram of supplied lettuce for the controlled-environment systems it modelled. Climate impact then changed sharply with the electricity source: typical grids produced large footprints, whereas renewable supply and credit for land opportunity could make carefully designed systems competitive with some field supply chains. Economics likewise depend on local power prices, yield and utilisation. Salad leaves and herbs remain more plausible than commodity grains because they grow quickly and command more value per kilogram.

Capital risk sits beside operating cost. A facility buys lighting, racks, pumps and climate equipment before achieving a stable harvest, and a biological problem can affect several stacked layers at once. Consistent conditions can improve scheduling, but they also require monitoring, backup power and staff who understand both crops and machinery. Published yield from a trial should not be inserted directly into a business case without allowing for cleaning time, unsold produce and imperfect occupancy.

E. Crop choice limits the contribution to food security. Wheat, rice and maize supply many inexpensive calories but require large areas and substantial biomass; paying for artificial light around that biomass is rarely competitive. Current systems favour crops with short growth cycles, compact canopies and high value relative to weight. Breeding could adapt plants to indoor conditions, yet optimisation for yield alone may neglect taste, nutrient content or resilience. Comparing tonnes of lettuce with tonnes of grain would also confuse their different dietary roles. Vertical farms can diversify some fresh supply without replacing broad-acre agriculture.

F. LEDs convert electricity into useful light more efficiently than older lamps, and growers can tune intensity, timing and spectrum for photosynthesis rather than human vision. Experiments show that these settings affect yield, water use and energy efficiency together; maximising light does not necessarily maximise efficiency. Sensors, automation and improved climate control can reduce waste, but their equipment and computation also have material and energy costs. The grid mix remains decisive, and renewable electricity is not impact-free. A credible assessment reports infrastructure, refrigerants, nutrient losses and end-of-life as well as farm output. Technical improvement may widen the viable crop range, but it does not establish that every urban site is sustainable.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'An explanation of why staple crops are not suitable for vertical farming', answer: 'E' },
            { num: 15, stem: 'A description of how water is conserved in vertical farming systems', answer: 'B' },
            { num: 16, stem: 'An explanation of why a shorter transport route does not guarantee a smaller climate footprint', answer: 'C' },
            { num: 17, stem: 'A quantified estimate of electricity used to supply a kilogram of lettuce', answer: 'D' },
            { num: 18, stem: 'A reference to how new lighting technologies have improved efficiency', answer: 'F' },
            { num: 19, stem: 'A general introduction to the debate about vertical farming\'s potential', answer: 'A' },
            { num: 20, stem: 'A mention of the crops for which vertical farming is currently most economically feasible', answer: 'D' },
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
          template: `21. One lettuce study found land and water use efficiency {{21}} times higher than in open fields.\n22. Locating production near consumers may shorten {{22}}, although cultivation can dominate the footprint.\n23. The main operating challenge is high {{23}} use.\n24. Crops with short {{24}} cycles and compact canopies are better suited to vertical farming.\n25. Lighting can be tuned for {{25}} rather than human vision.\n26. The carbon intensity of the {{26}} remains decisive.`,
          blanks: [
            { num: 21, answers: ['38–60'] }, { num: 22, answers: ['transport'] },
            { num: 23, answers: ['electricity'] }, { num: 24, answers: ['growth'] },
            { num: 25, answers: ['photosynthesis'] }, { num: 26, answers: ['grid mix'] },
          ],
        },
      ],
    },

    {
      part: 7, skill: 'reading',
      title: 'Reading — Passage 3: The Psychology of Money',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Psychology of Money

Economists often model choices using rational agents who maximise utility under stated assumptions. Such a model can be a benchmark rather than a claim that every person consciously calculates each decision. Behavioural economics studies systematic patterns the benchmark omits and tests how framing, timing, emotion and social context alter choices. Calling a response a bias describes a difference from a specified standard; it does not by itself prove that the person is foolish or that an observer knows the person's true goals.

Prospect theory, introduced by Daniel Kahneman and Amos Tversky in 1979 and later refined, evaluates gains and losses relative to a reference point rather than only final wealth. Its value function gives losses greater weight than equivalent gains in many choices, a pattern called loss aversion. The memorable claim that a loss is always felt “twice” as strongly is too universal: estimated strength varies with stakes, method and context, and some studies of small losses find weak or absent effects. Reference dependence can nevertheless help explain why an investor treats a fall below a purchase price differently from an equal change above it. It does not prove one psychological mechanism behind every insurance purchase or sale.

Mental accounting is the tendency to categorise and evaluate money differently according to its source or intended purpose. A windfall may be treated differently from earned income even though both have identical purchasing power. Likewise, a holiday fund can feel separate from a current account. Classical fungibility says one pound can substitute for another; real budgets may impose labels to support self-control or meet household commitments. The same partition can therefore prevent overspending in one setting and produce an expensive mistake in another, such as borrowing at high interest while protecting a low-interest savings account.

Social comparison is a further proposed influence. The expression “expenditure cascade” describes a process in which visible spending near the top shifts standards for households below, with pressure passing through an income distribution. Social media can make selected consumption unusually visible. Studies report associations between exposure to idealised luxury images, materialistic aspirations and lower financial wellbeing, but association is not a randomised intervention. Platform use, prior preferences, income and peer groups can affect both exposure and outcome. Evidence for a mechanism must therefore be distinguished from a story that merely fits a correlation.

Time inconsistency—the tendency to prefer a smaller reward now despite previously planning to wait for a larger reward—poses challenges for long-term finance. Behavioural economists call the extra weight on the immediate option present bias. Default enrolment in pension schemes, where employees must actively opt out, often raises participation compared with opt-in systems. Yet enrolment is not the same as an adequate contribution or a suitable investment. The default rate, fees, access to emergency savings and the ability to opt out all affect welfare. A successful participation statistic can conceal poor design elsewhere.

Understanding financial psychology has implications beyond individual wellbeing. Product design, retirement systems and consumer regulation increasingly use behavioural insights. Critics call some interventions paternalistic because an institution chooses the path of least resistance; defenders reply that every form, sequence and default already creates a choice architecture. The relevant comparison is not design versus no design, but one transparent design against plausible alternatives.

Evaluation should measure distribution as well as averages. A reminder may help busy customers but burden people with unstable income; automatic saving may benefit many workers while creating hardship for someone with expensive debt. Researchers should preregister outcomes where possible, report opt-outs and unintended effects, and test whether results persist. Behavioural evidence can improve a policy, but it does not make the policy-maker's objective neutral or guarantee respect for individual autonomy.

Individual variation matters throughout. An average treatment effect can combine people who benefit, people who are unaffected and people who are harmed. Financial literacy, scarcity, age and institutional trust may change a response, while repeated exposure can weaken an initially effective cue. Field evidence is valuable because real money and constraints are present, but causal interpretation still depends on comparison groups and measurement. The psychology of money is therefore a set of testable mechanisms, not a catalogue of tricks that predicts every person.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'What central idea of prospect theory does the passage emphasise?',
          options: [
            'People evaluate only their final level of wealth, regardless of a starting point.',
            'People evaluate gains and losses relative to a reference point and may weight losses more heavily.',
            'Every person values a loss at exactly twice an equivalent gain in all settings.',
            'Investment behaviour can be explained without considering framing or context.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'According to the passage, what does "mental accounting" refer to?',
          options: [
            'The formal process of keeping financial records in separate accounts.',
            'A psychological tendency to value money differently based on its source or intended use.',
            'The rational calculation of expected value when making financial decisions.',
            'A banking practice of separating holiday funds from regular income.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q29', part: 7,
          text: 'What is an "expenditure cascade" as described by Frank and Cook?',
          options: [
            'A government scheme to reduce excessive spending among high earners.',
            'A pattern where high-income spending pressure drives increased spending further down the income distribution.',
            'The tendency for windfall money to be spent more quickly than earned income.',
            'A psychological effect caused by the visibility of others\' savings rather than spending.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q30', part: 7,
          text: 'What is the main argument against "behavioural nudge" approaches mentioned in the passage?',
          options: [
            'They are ineffective because people ignore default settings.',
            'They are too costly to implement in pension systems.',
            'They may be paternalistic by guiding people towards choices chosen by policy-makers.',
            'They have been shown to reduce participation in retirement savings schemes.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup', id: 'r3-ynng', part: 7, qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Rational-agent models can be used as benchmarks rather than literal descriptions of every decision.\n32. {{32}}: The passage says loss aversion has the same measured strength in every context.\n33. {{33}}: A windfall and earned income can have identical purchasing power.\n34. {{34}}: Associations involving social-media exposure establish that the exposure caused the financial outcome.\n35. {{35}}: Present bias gives extra weight to an immediate option.\n36. {{36}}: The writer says behavioural evidence automatically makes a policy objective neutral.`,
          blanks: [
            { num: 31, answers: ['YES'] }, { num: 32, answers: ['NO'] }, { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NO'] }, { num: 35, answers: ['YES'] }, { num: 36, answers: ['NO'] },
          ],
        },
        {
          type: 'formgroup', id: 'r3-sent', part: 7, qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Kahneman and Tversky's research on loss aversion was formalised in a theory called {{37}} theory.\n38. The tendency to prefer smaller rewards now over larger future rewards is called {{38}}.\n39. Default {{39}} in pension schemes significantly increases participation rates compared to opt-in systems.\n40. Critics of behavioural nudges argue such approaches may undermine {{40}} by directing people towards policy-maker-chosen outcomes.`,
          blanks: [
            { num: 37, answers: ['prospect'] }, { num: 38, answers: ['present bias'] },
            { num: 39, answers: ['enrolment'] }, { num: 40, answers: ['individual autonomy'] },
          ],
        },
      ],
    },

    {
      part: 8, skill: 'writing', title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [{
        type: 'write', id: 'w1', part: 8, taskNumber: 1,
        imageUrl: '/assets/ielts/charts/set8-task1.svg',
        imageAlt: 'Process diagram in which sunlight reaches solar panels, direct current passes to an inverter, and alternating current is distributed to a home or the national grid while surplus can enter battery storage',
        stimulus: 'The diagram below shows how a domestic solar-panel system generates electricity and distributes it to a home, battery storage and the national grid.',
        text: 'Summarise the information by selecting and reporting the main features and stages of the process.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'Public museums increasingly create high-resolution digital copies of objects in their collections. Some people believe these images should be freely available for anyone to reuse, while others argue that museums should charge commercial users to help fund conservation.',
        text: 'Discuss both views and give your own opinion.',
        minWords: 250,
      }],
    },
    {
      part: 10, skill: 'speaking', title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak', id: 'sp1', part: 10, partNumber: 1,
          text: 'Part 1 — Personal questions about art and creativity',
          followUp: [
            'Do you enjoy any form of art, such as painting, music, or writing?',
            'Have you ever tried to create something artistic? Tell me about it.',
            'Do you think art is important in everyday life? Why or why not?',
            'Are there any artists or musicians you particularly admire?',
            'Did you visit museums or performances when you were a child?',
            'What kind of creative activity is popular where you live?',
            'Do you prefer seeing art in person or on a screen?',
            'Would you like to learn a new creative skill in the future?',
          ],
        },
        {
          type: 'speak', id: 'sp2', part: 10, partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a piece of art, music, or literature that has had a strong impact on you.\n\nYou should say:\n• what it is and who created it\n• when and how you first encountered it\n• why it made such an impression on you\n• and explain what you think it communicates or represents`,
        },
        {
          type: 'speak', id: 'sp3', part: 10, partNumber: 3,
          text: 'Part 3 — Discussion: Art, culture, and society',
          followUp: [
            'Should governments fund arts and culture programmes? Why or why not?',
            'Do you think digital technology has made it easier or harder for artists to make a living?',
            'How important is it for schools to include arts education in their curriculum?',
            'Do you think commercial art (created for profit) can be just as valuable as non-commercial art?',
            'How should museums balance public access with the cost of conserving collections?',
            'What may be gained or lost when a physical work is experienced only as a digital copy?',
          ],
        },
      ],
    },
  ],
};

export default mock;
