import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-13',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 13',
  subtitle: 'Human Migration · Quantum Computing · The Placebo Effect',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-13.mp3',
      title: 'Listening — Section 1: Signing up for a gym',
      instructions: 'You will hear a conversation between a gym receptionist and a new customer. Listen and answer Questions 1–10.',
      transcript: `STAFF: Good afternoon, and welcome to Riverside Gym. How can I help you today?

CUSTOMER: Hello. I'd like to sign up for a membership, please. I visited once with a colleague and liked the atmosphere, but I did not have time to ask about the plans.

STAFF: No problem. I will take your contact details, ask what you want from the gym and then compare the plans. Nothing is confirmed until you choose. Can I start with your name?

CUSTOMER: Yes, it's Diana Dalton.

STAFF: Could you spell your surname for me?

CUSTOMER: Of course — it's D-A-L-T-O-N.

STAFF: Thank you, Diana. And the best contact number for you?

CUSTOMER: My mobile is 077 3352 9041.

STAFF: Let me read that back to be sure — 077 3352 9041. Would you prefer reminders by text or email?

CUSTOMER: Text, please. I do not always check personal email during the week.

STAFF: That's fine. And your home address?

CUSTOMER: I live at 14 Hazelwood Street. It is close enough for me to walk here, which is one reason I chose this gym.

STAFF: Great. New members receive an introductory appointment with a trainer. It isn't a test; it is simply a chance to discuss safe use of the equipment. What is your main fitness goal?

CUSTOMER: At first I thought about weight loss, but what I really want is to improve my stamina. I get tired during long walks even though I am generally active.

STAFF: We can build a gradual programme around that. The trainer might combine the exercise bicycle with swimming rather than beginning with high-intensity classes. And how did you hear about us?

CUSTOMER: A friend recommended you, actually. She comes before work and said the changing rooms are quieter then.

STAFF: They usually are. Is there anything our trainers should know — any injuries, for example?

CUSTOMER: Just my knee. I hurt it last year, so nothing too high-impact. My doctor said ordinary exercise is fine, provided I increase it slowly.

STAFF: Noted. The trainer can show you alternatives if a movement is uncomfortable. We also ask members to stop and tell a member of staff if they feel sudden pain rather than trying to complete a session. And when would you like to begin?

CUSTOMER: Could I start on Monday? I can come after work at about half past six.

STAFF: That's fine. The induction appointments last about forty minutes, and there is a slot at seven. Now let me explain our two membership plans. The Standard contract lasts 12 months at £29 a month, and it includes free use of the sauna.

CUSTOMER: Does Standard include group classes?

STAFF: Most classes are included, but specialist workshops have a separate charge. Standard members can book five days ahead. The plan is less expensive, though it is a longer commitment.

CUSTOMER: And the other one?

STAFF: The Premium plan is more flexible — it's a shorter, 6-month contract, but it costs £45 a month. Premium members can book classes ten days ahead. You also get a free towel service and two guest passes every month. The passes cannot be carried into the following month.

CUSTOMER: I travel for work, so the shorter commitment and not having to bring a towel would help. I think the Premium plan sounds better for me.

STAFF: A great choice. I will print the terms for you to read before you sign. We will also confirm the cancellation notice and the date of the first payment, so there are no surprises.

CUSTOMER: Thank you. I appreciate being able to check it first.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Riverside Gym — Membership Application',
          example: 'Enquiry:  gym membership',
          template: `Name: Diana {{1}}
Telephone (mobile): 077 3352 9041
Home address: 14 {{2}} Street

Main fitness goal: to improve {{3}}
Heard about gym from: a {{4}}
Existing injury: problem with one {{5}}
Preferred start day: {{6}}`,
          blanks: [
            { num: 1, answers: ['Dalton', 'dalton'], maxWords: 1 },
            { num: 2, answers: ['Hazelwood', 'hazelwood'], maxWords: 1 },
            { num: 3, answers: ['stamina'], maxWords: 1 },
            { num: 4, answers: ['friend'], maxWords: 1 },
            { num: 5, answers: ['knee'], maxWords: 1 },
            { num: 6, answers: ['Monday', 'monday'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Plan', 'Contract length (months)', 'Monthly fee', 'Extra included'],
          rows: [
            [
              'Standard',
              { num: 7, answers: ['12'], maxWords: 1 },
              '£29',
              { num: 8, answers: ['sauna'], maxWords: 1 },
            ],
            [
              'Premium',
              '6',
              { num: 9, answers: ['45', '£45'], maxWords: 1 },
              { num: 10, answers: ['towel'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-13.mp3',
      title: 'Listening — Section 2: Airport orientation announcement',
      instructions: 'You will hear an orientation announcement for passengers at an airport. Listen and answer Questions 11–20.',
      transcript: `Good morning, passengers, and welcome to Kingsford International Airport. My name is Rachel, and I'm one of the terminal's passenger-service officers. Before you continue to the departure gates, I'd like to explain the facilities and procedures in the new Terminal Three. The building is long but straightforward: public transport arrives at the east end, check-in occupies the central hall, and departures are beyond the screening area to the west.

Let me start with what is available free of charge. Throughout the terminal you'll find high-speed wireless internet, which is completely free and needs no password. Select the airport network and accept the conditions on the opening page. We also run a free shuttle bus between the terminal and the long-stay car park, leaving every ten minutes from Exit B. Allow extra time at busy periods because the journey includes two stops.

Not every facility is complimentary. Our luggage trolleys require a two-pound refundable deposit, the shower rooms in the lounge cost eight pounds, and left-luggage storage is charged by the hour. The deposit is returned when a trolley is placed in an official bay; leaving it beside the road will not release the coin.

Now, some important information about check-in. The desks for international flights are on level two, and they open exactly three hours before departure. Arriving earlier will not speed up the process because airline staff cannot accept bags until the desk opens. Check your airline and flight number on the entrance screens, since two carriers sometimes fly to the same city at similar times.

If you're travelling with hand luggage only and already have a boarding pass, you can skip the desks and go straight to security. Families and passengers who need assistance may use the wider lane on the right. At security, remember to take any liquids out of your bag — each container must hold no more than 100 millilitres, and all of them must fit inside a single clear plastic bag. A large bottle that is almost empty is not permitted; the limit applies to the container's capacity. Medicines and baby food follow separate procedures, so show them to an officer before screening.

Once you're through, you'll enter the departure lounge. Boarding information is shown on the large screens, but please don't rely on hearing your name, as we no longer call passengers individually. Keep checking the display because a gate can change. Your gate number appears roughly 40 minutes before boarding. That is not the time to begin boarding; it is when the location is normally confirmed.

If you have time, the duty-free shops are on your left, while cafés and water fountains are directly ahead. A quiet rest area with reclining seats is on the upper floor, right next to the pharmacy. The lift is behind the information point. Please keep phone calls brief in that area and do not leave bags on empty seats.

Finally, a word about connections. If you're transferring to another flight, follow the purple signs to the transfer desk, where staff can reprint your boarding pass and confirm whether your checked bag continues automatically. Do not follow signs to baggage reclaim unless instructed, as that route leaves the secure area. Passengers with less than one hour between flights should speak to a member of staff at once. Thank you, and enjoy your journey.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO services does the announcement say are free of charge?',
          options: [
            { letter: 'A', text: 'the wireless internet' },
            { letter: 'B', text: 'the luggage trolleys' },
            { letter: 'C', text: 'the shower rooms' },
            { letter: 'D', text: 'the shuttle bus' },
            { letter: 'E', text: 'the left-luggage storage' },
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
          title: 'Terminal Three — passenger information',
          template: `Check-in and security

• Check-in desks for international flights are on level {{13}}.
• The desks open {{14}} before departure.
• Passengers with hand luggage only can go straight to {{15}}.
• Each liquid container must hold no more than {{16}}.
• All liquids must fit inside a single clear {{17}} bag.

In the departure lounge

• Your gate number appears about {{18}} before boarding.
• A quiet rest area is on the upper floor, next to the {{19}}.
• Transferring passengers should follow the {{20}} signs to the transfer desk.`,
          blanks: [
            { num: 13, answers: ['two', '2'], maxWords: 1 },
            { num: 14, answers: ['three hours', '3 hours'], maxWords: 2 },
            { num: 15, answers: ['security'], maxWords: 1 },
            { num: 16, answers: ['100 millilitres'], maxWords: 2 },
            { num: 17, answers: ['plastic'], maxWords: 1 },
            { num: 18, answers: ['40 minutes', 'forty minutes'], maxWords: 2 },
            { num: 19, answers: ['pharmacy'], maxWords: 1 },
            { num: 20, answers: ['purple'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-13.mp3',
      title: 'Listening — Section 3: Tourism dissertation discussion',
      instructions: 'You will hear a tutor and a student discussing the student\'s tourism dissertation. Listen and answer Questions 21–30.',
      transcript: `TUTOR: Hi Maya, come in. I read the outline you sent. Before we discuss individual chapters, remind me of your main focus now.

MAYA: Originally I wanted to look at the economic impact of tourism, but after doing the reading I decided to focus on how local residents feel about tourism in their town — their attitudes, really. The economic question was too broad for one dissertation.

TUTOR: Good. Residents' attitudes gives you a clearer outcome to investigate, though you still need to define what counts as positive or negative. And why did you choose Whitby as your case study?

MAYA: Partly because it's beautiful, but mainly because visitor numbers there have grown so fast in the last five years. That rapid growth makes tensions easier to observe. I also have relatives nearby, although convenience wasn't my academic reason.

TUTOR: Mention that connection when you discuss access. It helped you recruit participants and could also influence who agreed to take part. So how are you collecting your data?

MAYA: I considered interviews, but in the end I'm mainly using a questionnaire because I wanted responses from a large number of people. It has rating scales and two open questions.

TUTOR: A survey is sensible, provided you don't treat the rating as a complete explanation. How did you distribute it?

MAYA: I left paper copies at the library and shared an online link through neighbourhood groups. I avoided the visitor centre because I wanted residents, not tourists.

TUTOR: Reasonable, but users of the library or online groups may not represent every resident. Did you run into any practical difficulties?

MAYA: The biggest problem was the response rate — many people simply didn't return the form. In the end I got about a hundred and twenty completed questionnaires. I had hoped for twice that number.

TUTOR: That's still workable for a student project. Report how many invitations you distributed and avoid presenting the sample as the whole town. What did the results show?

MAYA: The clearest pattern was that attitudes differed by age. Younger respondents were more positive, while older ones more often mentioned noise and crowding. But I shouldn't say age caused the difference, because the groups might differ in other ways too.

TUTOR: Exactly. Also show the number of respondents in each group; percentages without denominators can mislead. Did the open answers reveal anything your scale missed?

MAYA: Yes. Some people liked the employment created by visitors but disliked weekend traffic, so the same respondent could express both benefits and costs.

TUTOR: That nuance is valuable. Now, one suggestion — have you thought about comparing Whitby with a second location?

MAYA: I hadn't. Would I need to repeat the full survey there?

TUTOR: Not at this stage. A limited comparison using published local data could strengthen the analysis without pretending it is a second equivalent case study. Explain the different evidence sources clearly.

MAYA: That sounds manageable.

TUTOR: Make sure your literature review covers the idea of carrying capacity — it's central to the debate, but treat it as a framework rather than one fixed number. Social, environmental and physical limits can be measured differently. When you write up, keep your methodology chapter detailed, so the study could be repeated by someone else.

MAYA: Right. And should I include the raw data?

TUTOR: Protect participants' anonymity. Put the blank questionnaire in an appendix, not completed forms containing comments, and summarise the key figures in the main text. Store consent records separately. Finally, get the dissertation proofread before submitting it, but the proofreader should correct language, not rewrite your argument.

MAYA: Great. I'll revise the methods and send you the new chapter next week. Thank you.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'The main focus of Maya\'s dissertation is',
          options: [
            'the economic impact of tourism',
            'the environmental impact of tourism',
            'residents\' attitudes to tourism',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Maya chose Whitby as her case study mainly because',
          options: [
            'it is a very beautiful place',
            'its visitor numbers have grown rapidly',
            'it is easy for her to travel to',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'To collect her data, Maya is mainly using',
          options: [
            'face-to-face interviews',
            'a questionnaire',
            'official statistics',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'The main difficulty Maya had was',
          options: [
            'the low response rate',
            'the cost of the survey',
            'finding a suitable case study',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'The tutor suggests that Maya should',
          options: [
            'reduce the size of her sample',
            'compare her town with a second location',
            'change her research topic',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• The literature review should cover the idea of {{26}} capacity.
• The methodology chapter must be detailed enough for the study to be {{27}}.
• The full questionnaire should be placed in an {{28}}.
• Only the key {{29}} should be summarised in the main text.
• Maya should get the dissertation {{30}} before submitting it.`,
          blanks: [
            { num: 26, answers: ['carrying'], maxWords: 1 },
            { num: 27, answers: ['repeated'], maxWords: 1 },
            { num: 28, answers: ['appendix'], maxWords: 1 },
            { num: 29, answers: ['figures'], maxWords: 1 },
            { num: 30, answers: ['proofread'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-13.mp3',
      title: 'Listening — Section 4: Antarctic research',
      instructions: 'You will hear a lecture about scientific research in Antarctica. Listen and answer Questions 31–40.',
      transcript: `Good morning. Today's lecture is about scientific research in Antarctica, the coldest, windiest and, on average, driest continent on Earth. It has no Indigenous or permanent resident population. Staffing changes greatly with the season, but during summer several thousand scientists and support staff may live and work at research stations and field camps.

Why conduct research in such a demanding place? First, Antarctica provides unusually long records of past climate. Snow accumulates, is compressed into ice and can preserve evidence in layers. Tiny bubbles of ancient air become trapped within it. By drilling long cylinders of ice, called cores, researchers can analyse past atmospheric gases and compare them with other measurements. An ice core is therefore a climate archive, although interpreting it requires dating the layers and understanding how gases and particles were deposited.

In 2025, researchers announced analysis of Antarctic ice extending beyond the familiar eight-hundred-thousand-year continuous record. Older ice can reveal earlier climate conditions, but age alone does not make a sample useful: scientists also need a sufficiently clear sequence and careful protection from contamination. Teams log the depth and orientation of every section before transporting it in frozen storage.

Antarctica is also central to ocean research. Cold, salty water formed around parts of the continent can sink and contribute to the global system of ocean currents. This circulation moves heat, carbon, oxygen and nutrients, but it is more complex than one conveyor belt and changes by region and season. The surrounding Southern Ocean is rich in krill, a small crustacean eaten by fish, penguins, seals and whales. Calling krill simply the bottom of the food chain is convenient, though primary producers such as microscopic algae supply the energy they consume.

The continent is important for space and atmospheric science too. At high inland sites, thin, dry, stable air makes conditions valuable for certain telescopes. Detectors embedded deep in the ice can register faint flashes associated with neutrinos, particles that have travelled through space and matter. Scientists do not see a distant galaxy directly in the ice; they infer a particle's path from the pattern recorded by many sensors.

Meteorites are comparatively easy to locate in some Antarctic areas because dark rocks stand out against the ice. Ice movement can also concentrate them near barriers. Researchers record each location and use clean handling procedures, since a rock removed without context loses scientific information.

Of course, working in Antarctica is difficult. Extreme cold, wind and crevasses create hazards, but the biggest practical and psychological challenge for many winter teams is isolation. Darkness lasts for months at high latitudes, evacuation may be impossible for long periods, and a small group must live and work together. Stations prepare supplies and redundant systems well before winter, while medical screening and training reduce risks that cannot be eliminated.

Finally, a word about governance. The Antarctic Treaty was signed in 1959 and entered into force in 1961. It reserves Antarctica for peaceful purposes and protects freedom of scientific investigation; later agreements added environmental rules. Research stations are not outside law, and treaty parties inspect activities and share information. Scientists are particularly concerned about changes in the ice sheet because land-ice loss contributes to global sea levels. Satellite, airborne and ground measurements are combined: no single instrument can answer every question. Continued monitoring is therefore essential, both to detect change and to estimate uncertainty honestly.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'SCIENTIFIC RESEARCH IN ANTARCTICA',
          template: `General facts

• Antarctica has no permanent population.
• In summer, about 5,000 {{31}} and support staff work there.

Studying the climate and oceans

• Ancient bubbles of {{32}} are trapped in the ice.
• Cylinders of ice drilled out by researchers are called {{33}}.
• The ice works as a unique climate {{34}}.
• Cold, dense water drives the global system of ocean {{35}}.
• The Southern Ocean is rich in {{36}}, at the base of the food chain.

Space science and challenges

• The stable air makes Antarctica a good site for {{37}}.
• {{38}} are easy to find because they stand out against the ice.
• The biggest practical problem for researchers is the {{39}}.
• Melting ice would raise global sea {{40}}.`,
          blanks: [
            { num: 31, answers: ['scientists'], maxWords: 1 },
            { num: 32, answers: ['air'], maxWords: 1 },
            { num: 33, answers: ['cores', 'core'], maxWords: 1 },
            { num: 34, answers: ['archive'], maxWords: 1 },
            { num: 35, answers: ['currents'], maxWords: 1 },
            { num: 36, answers: ['krill'], maxWords: 1 },
            { num: 37, answers: ['telescopes'], maxWords: 1 },
            { num: 38, answers: ['meteorites'], maxWords: 1 },
            { num: 39, answers: ['isolation'], maxWords: 1 },
            { num: 40, answers: ['levels'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Patterns of Human Migration',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Changing Evidence, Categories and Patterns of Human Migration Across Time and Place

Migration—the movement of people from one place to another—is among the forces that shape human societies. It is also ancient: Homo sapiens emerged in Africa roughly three hundred thousand years ago and, over many millennia, populations dispersed across every continent except Antarctica. Archaeology, ancient DNA and isotope analysis now reveal repeated movements and mixtures rather than one simple outward journey. Modern migration occurs under different institutions, borders and transport systems, so prehistoric movement is context, not a direct model for present policy.

Contemporary statistics describe several different things. An international migrant stock counts people living outside their country of birth or citizenship at a particular time; a migration flow counts moves during a period. The International Organization for Migration's 2024 report used a United Nations estimate of almost 281 million international migrants in 2020, about 3.6 percent of the global population. It also reported that international remittances—money migrants send across borders—reached about US$831 billion in 2022, far above official development assistance. Neither number means that all migrants moved for work or that all transfers went to low-income households.

Forced displacement is a related but distinct category. The United Nations refugee agency's Global Trends report published in June 2026 recorded 41.6 million refugees at the end of 2025, alongside nine million asylum-seekers awaiting decisions. It also reported 68.7 million people internally displaced by conflict or violence. A refugee has crossed an international border and meets a legal protection definition; an internally displaced person has remained inside their country. People can move between categories as circumstances and legal decisions change, so adding headline figures without checking definitions or dates can mislead.

Environmental pressures complicate the picture. Drought, flooding, storms and sea-level rise may damage livelihoods or make return difficult, but movement usually also reflects income, governance, conflict, family networks and the ability to relocate. The phrase “climate refugee” has no general definition in the 1951 Refugee Convention. That does not mean environmental factors are legally irrelevant: a person may qualify for protection when climate impacts interact with persecution or conflict, and human-rights obligations can limit removal in particular cases. Most environmentally influenced movement also occurs within national borders.

The effects of migration on receiving and origin communities depend on who moves, where they settle and which period is measured. Migrants may fill vacancies, start businesses, pay taxes and increase demand; public services and housing may face short-run pressure if investment does not keep pace. Average national output can rise while effects differ across regions, employers and workers. Origin communities may gain remittances and international connections but lose scarce professionals. A credible analysis therefore specifies the comparison group and does not convert an aggregate benefit into a claim that every person gains.

Evidence about integration also changes over time. Wages, language use, educational outcomes and citizenship may look different soon after arrival than after a decade. Children of migrants cannot automatically be treated as having the same experience as foreign-born adults. Administrative records are valuable for large totals, while surveys can explore identity, discrimination and intentions; each source excludes some people and answers a different question.

Researchers reconstruct older movement with a similarly mixed toolkit. Objects can travel through trade without their makers relocating, so pottery alone does not prove population replacement. Ancient genomes can reveal biological relationships, while isotope ratios in teeth may indicate that a person grew up on different geology from the place of burial. Both methods have sampling limits: preservation favours some climates, graves may not represent the whole population and an individual traveller does not establish mass migration. Conclusions are strongest when several independent lines of evidence converge.

Public discussion often ignores these distinctions. Survey research in several countries has found that respondents overestimate the migrant share of the population, although the size of the error depends on wording and knowledge. Other misperceptions concern employment, benefits or crime. Correcting one number may not change an attitude rooted in trust, local experience or political identity. Researchers and policymakers therefore need to communicate definitions, uncertainty and distributional effects, rather than presenting either migration or restriction as producing one universal outcome.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Homo sapiens originated in Africa and eventually spread to every continent including Antarctica.\n2. {{2}}: In 2022, international remittances exceeded official development assistance.\n3. {{3}}: At the end of 2025, the number of conflict-displaced people remaining inside their country exceeded the number of refugees.\n4. {{4}}: “Climate refugee” has a general legal definition in the 1951 Refugee Convention.\n5. {{5}}: A person's migration category can change as circumstances and legal decisions change.\n6. {{6}}: An increase in national output proves that every resident benefits from migration.\n7. {{7}}: Surveys in several countries have found that people overestimate the migrant share of the population.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] },
            { num: 5, answers: ['TRUE'] },
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
          template: `8. Cross-border money transfers made by migrants are known as {{8}}.\n9. People who are displaced but remain within their own country are described as {{9}} displaced.\n10. The expression “{{10}} refugee” has no general definition in the 1951 Refugee Convention.\n11. Records may classify an international migrant by country of birth or {{11}}.\n12. Incorrect beliefs about migrant numbers, employment or crime are described as {{12}}.\n13. Both researchers and {{13}} need to communicate definitions, uncertainty and distributional effects.`,
          blanks: [
            { num: 8, answers: ['remittances'] },
            { num: 9, answers: ['internally'] },
            { num: 10, answers: ['climate'] },
            { num: 11, answers: ['citizenship'] },
            { num: 12, answers: ['misperceptions'] },
            { num: 13, answers: ['policymakers'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Quantum Computing — Promise and Reality',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Quantum Computing — Promise and Reality

A. Classical computers encode information in bits that take values such as zero or one. Quantum computers use quantum bits, or qubits. A qubit can be prepared in a superposition described by amplitudes associated with zero and one; measurement produces an ordinary outcome with probabilities determined by that state. Multiple qubits can also be entangled, creating correlations that have no simple classical equivalent. A useful algorithm controls interference so that amplitudes for desired outcomes are strengthened and others are reduced. This is more precise than saying a machine merely “tries every answer at once”. Quantum methods offer major advantages for some defined problems, not automatic speed for every calculation.

B. In the 1980s, physicist Richard Feynman argued that a device governed by quantum mechanics might simulate quantum systems more naturally than a classical machine. In 1994, Peter Shor described an algorithm allowing a sufficiently capable, fault-tolerant quantum computer to factorise large integers much faster than the best known classical methods. This matters to public-key systems such as RSA, which use the difficulty of factoring as part of their security. It does not imply that every kind of encryption fails in exactly the same way: symmetric ciphers, signatures and key-establishment systems require separate analysis.

C. Building useful hardware is difficult because qubits are fragile. Uncontrolled interaction with the environment can cause decoherence and operations introduce errors. The engineering response depends on the platform: superconducting circuits operate at extremely low temperatures, while trapped ions, neutral atoms and photons use different equipment and face different noise. Perfect isolation is neither possible nor sufficient, because qubits must also be controlled and measured. Quantum error correction spreads a logical qubit across many physical qubits so errors can be detected without directly reading the encoded information. The overhead is large, and a high physical-qubit count does not by itself show that a machine can run a long reliable algorithm.

D. In 2019, Google claimed “quantum supremacy” after its 53-qubit Sycamore processor sampled the output of a specially designed random circuit in about 200 seconds. Google estimated that the contemporary leading classical supercomputer would need roughly 10,000 years; IBM argued that a different simulation and storage strategy could reduce the classical estimate to about two and a half days. Later classical methods improved further. The experiment was a technical milestone, but not a demonstration that the processor could solve a useful business problem. The episode also showed why benchmark claims must name the task, accuracy, hardware and best comparison method. Many researchers now prefer the less sweeping term “quantum computational advantage”.

E. Quantum simulation is a plausible application because molecules and materials are themselves quantum systems. Better calculations might support research on catalysts, batteries or drug candidates, but experimental validation and classical modelling would still be required. Optimisation and machine-learning proposals are also studied, yet a theoretical speed-up may disappear once data loading, error correction and strong classical heuristics are included. Quantum key distribution has limited commercial use and can reveal certain eavesdropping attempts under stated assumptions. It is not a theoretically unbreakable communication system: implementation flaws, compromised endpoints and ordinary software can remain vulnerable.

F. The timeline for broadly useful fault-tolerant quantum computing remains uncertain. Present machines are often described as NISQ, or Noisy Intermediate-Scale Quantum, devices: they can support experiments and limited demonstrations, but noise restricts circuit depth and makes most claimed applications difficult to compare with improving classical alternatives. Researchers report physical error rates, logical-qubit performance and reproducible workloads rather than relying on raw qubit totals alone. Governments and companies continue to invest, but funding announcements are not evidence that a promised capability has been achieved.

Resource accounting is essential when comparing approaches. A quoted running time may exclude compilation, repeated measurements, error mitigation or the classical computer used to interpret results. Conversely, a classical estimate may ignore a better algorithm discovered after the benchmark was announced. Independent replication and openly specified workloads make progress easier to assess. Hybrid systems are likely to remain common: a classical processor prepares data and optimises controls, a quantum device performs a specialised subroutine, and classical analysis checks whether the output is useful.

G. A cryptographically relevant quantum computer could threaten widely deployed public-key methods used for key establishment and digital signatures. Systems must migrate before such a machine exists because inventories, software updates and long-lived confidential data take years to protect. Post-quantum cryptography uses algorithms intended to resist both classical and quantum attacks while running on conventional computers. In August 2024, the United States National Institute of Standards and Technology finalised its first three post-quantum standards: one key-encapsulation mechanism and two digital-signature schemes. Standardisation begins deployment and scrutiny; it does not guarantee that every implementation is secure or that migration will be automatic.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of why qubits are difficult to keep stable', answer: 'C' },
            { num: 15, stem: 'An account of a disputed claim about quantum computers outperforming classical ones', answer: 'D' },
            { num: 16, stem: 'An explanation of how qubits differ from classical computer bits', answer: 'A' },
            { num: 17, stem: 'Information about international standards designed to protect data from quantum attacks', answer: 'G' },
            { num: 18, stem: 'An account of an early mathematical discovery that had implications for internet security', answer: 'B' },
            { num: 19, stem: 'An explanation of what NISQ devices are and their current limitations', answer: 'F' },
            { num: 20, stem: 'A mention of an existing commercial use of quantum technology', answer: 'E' },
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
          title: 'Quantum Computing: Principles and Progress',
          template: `Unlike classical computers, quantum computers use {{21}} which can exist as zero, one, or a combination of both simultaneously. The theoretical basis for quantum computing was partly established by Richard Feynman, while Peter Shor developed an algorithm to {{22}} large numbers exponentially faster than classical computers. The main engineering obstacle is {{23}}, which causes qubits to lose their quantum state due to environmental interference. In 2019, Google claimed its Sycamore processor had achieved {{24}}, though this was disputed by IBM. Near-term quantum applications include {{25}}, which could transform drug development by modelling molecular behaviour. To protect future communications, cryptographers are already developing {{26}} cryptographic schemes resistant to quantum attack.`,
          blanks: [
            { num: 21, answers: ['qubits'] },
            { num: 22, answers: ['factorise'] },
            { num: 23, answers: ['decoherence'] },
            { num: 24, answers: ['quantum supremacy'] },
            { num: 25, answers: ['quantum simulation'] },
            { num: 26, answers: ['post-quantum'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The Placebo Effect',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Placebo Effect

In a clinical trial, a placebo is designed to resemble the intervention under study while lacking its specific active component. Comparing randomly assigned groups can help estimate whether outcomes differ because of that component. For much of the twentieth century, placebo-related change was treated mainly as a nuisance to control. Researchers now study how expectations, learning and the therapeutic encounter can influence symptoms, while also drawing an important distinction between a placebo response and a placebo effect.

A placebo response is the change observed in a placebo group. It can include natural fluctuation in illness, regression toward an average after participants enrol during a bad period, additional care received in the trial, reporting bias and expectation. A placebo effect is the part attributable to the meaning or context of the placebo itself. A placebo group alone cannot separate all these causes; a no-treatment group or another carefully chosen control may be needed. Consequently, a high response percentage in a drug trial is not, by itself, proof of a large psychological effect or evidence that the active treatment has no specific benefit.

Expectation is one mechanism, but not the only one. Previous treatment can create classical conditioning: a familiar taste, procedure or clinical setting may become associated with a physiological response. In experimental placebo analgesia, expectation and conditioning can alter reported pain, and some studies have found activity in endogenous opioid systems. These findings do not show that thought can cure every disease. Effects are generally more consistent for symptoms such as pain or nausea than for outcomes like eliminating an infection or repairing damaged tissue.

The therapeutic encounter can influence experience and behaviour. A clinician who listens, explains a plan and expresses realistic confidence may reduce anxiety and help a patient follow treatment. That supportive context is not the same as an inert pill, and it can accompany an effective medicine. Features such as route, branding, price or pill appearance have affected expectations in some experiments, but responses vary across cultures, conditions and study designs. Simple rules claiming that one colour always stimulates while another always calms extend beyond the evidence.

Open-label placebo research asks whether deception is necessary. Participants are told that the pills contain no active drug, often alongside a rationale explaining that placebo responses can occur. Trials have reported improvements in self-reported outcomes for conditions including chronic back pain and irritable bowel syndrome. A 2021 meta-analysis found a positive overall effect compared with no treatment, but included only thirteen studies, identified moderate risk of bias and substantial variation. Later experimental reviews have also found clearer effects for self-reported than objective outcomes. Open-label placebos are therefore promising research tools, not established replacements for effective care.

Ethics depends on disclosure, evidence and alternatives. Giving an inert treatment while falsely describing it as active can undermine consent and trust. Honest use avoids that deception, yet a clinician must still explain uncertainty and must not delay diagnosis or proven treatment. The ritual of care can be studied without implying that a patient's symptoms are imaginary. Indeed, symptom experience is real even when expectation contributes to its intensity.

Negative expectations can produce a nocebo effect. Trial participants assigned to placebo often report adverse events, but not every symptom in a placebo arm is caused by expectation: background illness, ordinary symptoms and wording of questions also contribute. Experiments and reviews indicate that instructions can influence some adverse outcomes, with effects varying widely. This creates a communication challenge, not a reason to hide risk. Informed consent requires material side effects to be discussed. Researchers are testing balanced framing and nocebo education so clinicians can communicate honestly without using alarming or deterministic language.

The broader lesson is methodological. Outcomes emerge from the active treatment, the course of illness, concurrent care, expectations, learning and measurement. Randomisation and suitable control groups help distinguish these influences, but no single design answers every question. Placebo science is valuable precisely because it replaces a mysterious catch-all explanation with testable mechanisms and explicit uncertainty.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'How was the placebo effect primarily viewed during most of the twentieth century?',
          options: [
            'As a powerful and useful therapeutic tool in clinical practice.',
            'As an unwanted confounding factor in clinical trials.',
            'As a psychological phenomenon with no measurable physiological basis.',
            'As the primary mechanism behind most drug treatments.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What conclusion does the passage draw from experimental placebo analgesia?',
          options: [
            'Expectations and conditioning can affect pain and endogenous opioid activity.',
            'A placebo can eliminate infections as effectively as an active drug.',
            'Every pain response is created only by conscious expectation.',
            'Brain evidence proves that all placebo treatments are clinically useful.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What is the key finding of "open-label placebo" research?',
          options: [
            'Placebos only work when patients are completely unaware they are receiving them.',
            'Informing patients they are taking a placebo makes the treatment entirely ineffective.',
            'Placebos can produce measurable benefits even when patients know they are inert.',
            'Open-label placebos are more effective than blinded placebos in all conditions.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does the nocebo effect demonstrate, according to the passage?',
          options: [
            'Patients should not be told about potential side effects of their treatment.',
            'Negative expectations can produce adverse physical symptoms.',
            'Informed consent procedures are unnecessary for placebo treatments.',
            'The nocebo effect is stronger than the placebo effect in most studies.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Every improvement observed in a placebo group is caused by the meaning of the placebo.\n32. {{32}}: Classical conditioning can contribute to a placebo effect.\n33. {{33}}: Open-label placebo studies have reported improvements in chronic back pain.\n34. {{34}}: Treatment appearance has produced identical responses in every culture studied.\n35. {{35}}: Open-label placebos are already established replacements for effective medical care.\n36. {{36}}: The way risk information is communicated can influence some adverse outcomes.`,
          blanks: [
            { num: 31, answers: ['NO'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NO'] },
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
          template: `37. A {{37}} includes every change observed in the group receiving an inactive intervention.\n38. Listening, explanation and realistic confidence are parts of the {{38}}.\n39. The {{39}} effect describes adverse outcomes produced by negative expectations.\n40. Researchers are testing balanced framing and {{40}} to improve honest risk communication.`,
          blanks: [
            { num: 37, answers: ['placebo response'] },
            { num: 38, answers: ['therapeutic encounter'] },
            { num: 39, answers: ['nocebo'] },
            { num: 40, answers: ['nocebo education'] },
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
          imageUrl: '/assets/ielts/charts/set13-task1.svg',
          imageAlt: 'Grouped bar chart comparing international tourist arrivals in Europe, Asia and the Pacific, the Americas, the Middle East and Africa in 2010 and 2023, measured in millions',
          stimulus: 'The bar chart below shows the estimated number of international tourist arrivals, in millions, in five world regions in 2010 and 2023.',
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
          stimulus: 'Some governments offer qualified migrants a faster route to permanent residence if they live and work for several years in regions with long-term labour shortages. Some people think this supports regional development, while others believe residence rights should not depend on where a person agrees to live.',
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
          text: 'Part 1 — Personal questions about travel and different cultures',
          followUp: [
            'Have you ever lived or studied in a different country? What was that like?',
            'Do you enjoy meeting people from different cultural backgrounds? Why?',
            'What aspects of your own culture are you most proud of?',
            'How easy do you think it is to adapt to living in a foreign country?',
            'What kind of place do you most enjoy visiting on holiday?',
            'Do you usually plan a journey carefully or decide things after you arrive?',
            'Is there a foreign food, celebration or custom that interests you?',
            'What can visitors do to show respect for local people?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe an experience you had that changed your perspective on something important.\n\nYou should say:\n• what the experience was\n• where and when it happened\n• how it affected the way you think\n• and explain why this change in perspective was significant to you`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Globalisation and cultural identity',
          followUp: [
            'Do you think globalisation threatens local cultures and traditions? Why or why not?',
            'What are the main challenges that migrants face when adapting to a new country?',
            'Should host countries do more to help migrants integrate into society? What could they do?',
            'How might future changes in climate or technology affect patterns of migration?',
            'Why do some regions struggle to attract workers even when jobs are available?',
            'Should a person\'s right to remain in a country depend on living in a particular region?',
          ],
        },
      ],
    },
  ],
};

export default mock;
