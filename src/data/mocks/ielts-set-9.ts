import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-9',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 9',
  subtitle: 'Vaccination · Deep-Sea Exploration · The Future of Work',
  timeMinutes: 164,
  sections: [
    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-9.mp3',
      title: 'Listening — Section 1: Hotel Reservation',
      instructions: 'You will hear a conversation between a hotel receptionist and a customer. Listen and answer Questions 1–10.',
      transcript: `RECEPTIONIST: Good afternoon, Seaview Hotel. How may I help you?

CUSTOMER: Hello, I'd like to book a room for next month, please.

RECEPTIONIST: Of course. Can I take your name?

CUSTOMER: Yes, my first name's Rebecca, and my surname is Whitcombe.

RECEPTIONIST: Could you spell the surname for me?

CUSTOMER: Certainly — W-H-I-T-C-O-M-B-E.

RECEPTIONIST: Thank you, Ms Whitcombe. And a contact number in case we need to reach you?

CUSTOMER: My mobile is 07734 209865.

RECEPTIONIST: Let me read that back — 07734 209865. Perfect. And how many nights will you be staying?

CUSTOMER: We'll be there for four nights, arriving on the Thursday.

RECEPTIONIST: Four nights, noted. And what type of room would you like?

CUSTOMER: I'll take a twin room — oh, sorry, no, a double, please. My husband is coming with me.

RECEPTIONIST: A double, of course. May I ask the reason for your visit?

CUSTOMER: It's for business — there's a conference in the city that week.

RECEPTIONIST: Noted. Is there anything else you need for your stay?

CUSTOMER: Two things, actually. We'll be driving down, so we'd like parking. And we're bringing our baby, so could you put a cot in the room?

RECEPTIONIST: No problem at all — parking is free for guests, and I'll arrange a cot. Now, let me describe our rooms so you can choose. Our Standard room has one double bed and looks out over the garden; that's £95 a night.

CUSTOMER: And something a little larger?

RECEPTIONIST: The Family room sleeps more — it has three beds, though it overlooks the car park, I'm afraid. That one is £120 per night.

CUSTOMER: And your very best room?

RECEPTIONIST: That would be the Suite, with one double bed and a wonderful sea view. The Suite is £180 a night.

CUSTOMER: The Standard sounds perfect for us.

RECEPTIONIST: Excellent choice. Breakfast is included in every rate, served until half past nine.

CUSTOMER: Wonderful — thank you very much.

RECEPTIONIST: You're very welcome. We look forward to seeing you, Ms Whitcombe.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Hotel Reservation',
          example: 'First name:  Rebecca',
          template: `Surname: {{1}}
Contact number: 07734 209865
Number of nights: {{2}}
Room type: {{3}}
Reason for visit: {{4}}
Also needs {{5}} for the car
Also needs a {{6}} in the room for a baby`,
          blanks: [
            { num: 1, answers: ['Whitcombe'], maxWords: 1 },
            { num: 2, answers: ['4', 'four'], maxWords: 1 },
            { num: 3, answers: ['double'], maxWords: 1 },
            { num: 4, answers: ['business'], maxWords: 1 },
            { num: 5, answers: ['parking'], maxWords: 1 },
            { num: 6, answers: ['cot'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Room', 'Beds', 'View', 'Price per night'],
          rows: [
            [
              'Standard',
              'one double',
              { num: 7, answers: ['garden'], maxWords: 1 },
              '£95',
            ],
            [
              'Family',
              { num: 8, answers: ['3', 'three'], maxWords: 1 },
              'car park',
              { num: 9, answers: ['120', '£120'], maxWords: 1 },
            ],
            [
              'Suite',
              'one double',
              'sea',
              { num: 10, answers: ['180', '£180'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-9.mp3',
      title: 'Listening — Section 2: Company Induction',
      instructions: 'You will hear a talk given to new employees on their first day at a company. Listen and answer Questions 11–20.',
      transcript: `Good morning everyone, and a warm welcome to Brightwater Solutions. My name's Diane, and I'm part of the HR team. This short induction will help you settle in during your first week with us.

Let me start with the building itself, because we've made some changes recently. Over the summer we added a brand-new gym on the ground floor, which all employees can use free of charge. We've also installed secure bike storage by the rear entrance, which has proved very popular with cyclists. The canteen and the car park, of course, have been here for years, so those aren't new — but the gym and the bike storage are, and I'd encourage you to make the most of them.

Now, a few practical matters. On your first morning, please collect your security pass from the reception desk — you'll need it to enter the building and to use the lifts. Our working day starts at 8.30, though many people arrive a little earlier for a coffee.

Let me tell you about the facilities. The canteen is on the second floor, and it serves hot meals from midday. In every kitchen area you'll find free hot drinks available throughout the day, so please help yourself.

In terms of your first few weeks, each new employee is assigned a mentor — an experienced colleague who'll answer your questions and show you how things work. Your early training will focus mainly on the company software, which can take a little getting used to. And I should mention that the probation period lasts three months, after which we'll have a review to discuss how you're getting on.

Finally, staying informed. There's a team meeting every Friday, where we share updates and celebrate successes. We also send out a newsletter once a month by email.

If you have any questions at all, my door is always open, and you can find me in the HR office on the third floor. Once again, welcome aboard — we're delighted to have you with us.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO facilities have recently been added to the building?',
          options: [
            { letter: 'A', text: 'the gym' },
            { letter: 'B', text: 'the canteen' },
            { letter: 'C', text: 'the car park' },
            { letter: 'D', text: 'the bike storage' },
            { letter: 'E', text: 'the reception desk' },
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
          title: 'New Employee Induction',
          template: `Getting started
• Collect your {{13}} from the reception desk.
• The working day starts at {{14}}.

Facilities
• The canteen is located on the {{15}} floor.
• All staff get free {{16}} in the kitchen area.

Your first weeks
• Each new employee is assigned a {{17}}.
• Early training focuses on the company {{18}}.
• The probation period lasts {{19}} months.

Staying informed
• There is a team meeting every {{20}}.`,
          blanks: [
            { num: 13, answers: ['security pass', 'pass'], maxWords: 2 },
            { num: 14, answers: ['8.30', '8:30'], maxWords: 2 },
            { num: 15, answers: ['second', 'second floor'], maxWords: 2 },
            { num: 16, answers: ['hot drinks', 'drinks'], maxWords: 2 },
            { num: 17, answers: ['mentor'], maxWords: 1 },
            { num: 18, answers: ['software'], maxWords: 1 },
            { num: 19, answers: ['3', 'three'], maxWords: 1 },
            { num: 20, answers: ['Friday'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-9.mp3',
      title: 'Listening — Section 3: Nutrition Study Project',
      instructions: 'You will hear two students discussing a nutrition study project with their tutor. Listen and answer Questions 21–30.',
      transcript: `TUTOR: So, Kirsty, Tom — let's talk about your nutrition project. Remind me what your main aim was.

KIRSTY: Well, we set out to investigate students' breakfast habits — whether they eat breakfast, and what they typically have.

TUTOR: And why breakfast in particular?

TOM: Mainly because it's the meal students skip most often. We thought that made it worth studying — there's a lot of advice telling people not to skip it, but not much on what students actually do.

TUTOR: Good reasoning. How did you gather your data?

KIRSTY: We considered doing face-to-face interviews at first, but in the end we used an online questionnaire. It let us reach far more people quickly.

TUTOR: Sensible. And what did you find?

TOM: The most surprising result was that most students who skipped breakfast did so simply to save time in the mornings — not because they weren't hungry or were dieting, as we'd assumed.

TUTOR: Interesting. Were there any weaknesses in your study?

KIRSTY: Yes — our biggest problem was the sample. We had far too few male participants; nearly eighty per cent of respondents were women, so the results are a bit skewed.

TUTOR: That's an honest assessment. Now, thinking about the write-up: your data is strong, but the report itself needs more graphs — at the moment it's very text-heavy, and readers will find visuals easier to follow.

TOM: That's fair. We'll add some.

TUTOR: And for any future work, do make your sample larger — a few hundred would be ideal. I'd also advise you to check the reliability of your sources; a couple of the websites you cited aren't peer-reviewed.

KIRSTY: Understood. When do you need the final version?

TUTOR: The final report must be handed in by Friday, so you've got a few days. Oh — and Tom, I'll lend you a book that covers survey design really well; come by my office and collect it.

TOM: Brilliant, thank you very much.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What was the main aim of the nutrition project?',
          options: [
            'to compare diets in different countries',
            'to investigate students\' breakfast habits',
            'to test a new dietary supplement',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Why did the students decide to focus on breakfast?',
          options: [
            'It is the meal students most often skip.',
            'It is the cheapest meal to study.',
            'Earlier research on it was unreliable.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'How did they collect most of their data?',
          options: [
            'through laboratory experiments',
            'through an online questionnaire',
            'through face-to-face interviews',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What did they find most surprising?',
          options: [
            'Students who ate breakfast concentrated better.',
            'Most students skipped breakfast to save time.',
            'Breakfast made no difference to performance.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What was the main weakness of their study?',
          options: [
            'There were too few male participants.',
            'The participants were all the same age.',
            'The overall sample was too small.',
          ],
          answer: 0,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• The tutor thinks the report needs more {{26}}.
• In future they should make their {{27}} larger.
• The tutor advises checking the {{28}} of their sources.
• The final report must be handed in by {{29}}.
• The tutor will lend Tom a useful {{30}}.`,
          blanks: [
            { num: 26, answers: ['graphs', 'graph'], maxWords: 1 },
            { num: 27, answers: ['sample'], maxWords: 1 },
            { num: 28, answers: ['reliability'], maxWords: 1 },
            { num: 29, answers: ['Friday'], maxWords: 1 },
            { num: 30, answers: ['book'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-9.mp3',
      title: 'Listening — Section 4: Volcanoes',
      instructions: 'You will hear part of a lecture about volcanoes. Listen and answer Questions 31–40.',
      transcript: `Today I'm going to talk about volcanoes — how they form, the different types, the dangers they pose, and, perhaps surprisingly, the benefits they bring.

Let's begin with formation. The Earth's outer shell is broken into enormous sections, and most volcanoes form at the boundaries of these tectonic plates, where they pull apart or push together. Deep underground, rock melts to form magma. When this molten rock finally reaches the surface, we no longer call it magma — it's known as lava.

Now, volcanoes are not all the same. Broadly, there are two main types. Shield volcanoes, like those in Hawaii, are built up from very runny lava that flows a long way before it cools. As a result, they are broad and low, with gentle slopes. Composite volcanoes, by contrast, are formed from thicker, stickier lava. They are tall and steep, and they tend to produce far more violent eruptions.

That brings me to hazards. When a large volcano erupts, it can throw enormous clouds of ash high into the atmosphere. This ash can travel great distances on the wind, and it's a serious problem for aviation, since it can ground aircraft across whole continents. But the deadliest hazard of all is what's called a pyroclastic flow — a fast-moving avalanche of superheated gas and rock that races down the slopes, destroying everything in its path.

Despite these dangers, people continue to live near volcanoes, and there are good reasons why. For one thing, volcanic regions often have extremely fertile soil, which is excellent for growing crops. For another, the heat below the surface can be tapped to generate geothermal energy, providing clean electricity for nearby communities.

Finally, a word on monitoring. Because eruptions are so dangerous, scientists watch active volcanoes closely. Sensitive instruments record tiny earthquakes beneath the ground, which often increase in the days before an eruption. By studying these signals, together with changes in the shape of the volcano, scientists can increasingly predict eruptions — and that early warning can save thousands of lives.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'VOLCANOES',
          template: `Formation
• Most volcanoes form at the boundaries of tectonic {{31}}.
• Molten rock that reaches the surface is known as {{32}}.

Types
• Shield volcanoes are broad and low, with gentle {{33}}.
• Composite volcanoes produce far more violent {{34}}.

Hazards
• Clouds of {{35}} can travel great distances and ground aircraft.
• The deadliest hazard is a pyroclastic {{36}} of hot gas and rock.

Benefits
• Volcanic regions often have very {{37}} soil for crops.
• The heat below the surface provides geothermal {{38}}.

Monitoring
• Instruments record tiny {{39}} before an eruption.
• Good monitoring allows scientists to {{40}} eruptions.`,
          blanks: [
            { num: 31, answers: ['plates', 'plate'], maxWords: 1 },
            { num: 32, answers: ['lava'], maxWords: 1 },
            { num: 33, answers: ['slopes', 'slope'], maxWords: 1 },
            { num: 34, answers: ['eruptions', 'eruption'], maxWords: 1 },
            { num: 35, answers: ['ash'], maxWords: 1 },
            { num: 36, answers: ['flow'], maxWords: 1 },
            { num: 37, answers: ['fertile'], maxWords: 1 },
            { num: 38, answers: ['energy'], maxWords: 1 },
            { num: 39, answers: ['earthquakes', 'earthquake'], maxWords: 1 },
            { num: 40, answers: ['predict'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5, skill: 'reading',
      title: 'Reading — Passage 1: The History of Vaccination',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The History of Vaccination

Vaccination is one of the most effective public health interventions in human history. Before its development, infectious diseases including smallpox, polio, measles, and diphtheria killed or disabled millions of people annually and were considered inescapable facts of life. Today, smallpox has been completely eradicated, polio survives in only a handful of countries, and childhood diseases that once swept through populations in devastating waves are largely preventable with a single injection.

The foundational insight of vaccination—that exposure to a mild or weakened form of a disease could confer protection against the severe form—was not the product of a single discovery but emerged from centuries of observation. In China, practitioners of variolation were inoculating people against smallpox as early as the sixteenth century by introducing dried scabs from mild cases into healthy individuals through the nose or skin. The practice spread through the Ottoman Empire and reached England in the early eighteenth century, where it was championed by Lady Mary Wortley Montagu, who had observed it in Constantinople. Variolation carried a small but real mortality risk—approximately two percent of those inoculated died—but this was far lower than the thirty percent case fatality rate of naturally acquired smallpox.

The decisive advance came in 1796, when English country physician Edward Jenner noticed that milkmaids who had contracted cowpox—a mild disease transmitted from cows—seemed to be protected against smallpox. Testing this hypothesis on a young boy named James Phipps, Jenner inoculated him with cowpox material and subsequently exposed him to smallpox. Phipps did not develop the disease. Jenner published his findings in 1798, coining the term "vaccine" from the Latin word vacca (cow). His discovery was remarkable not because it was immediately understood—the germ theory of disease would not emerge for another century—but because it worked.

The late nineteenth and early twentieth centuries saw rapid expansion of vaccine development, driven by advances in bacteriology and virology pioneered by Louis Pasteur and Robert Koch. Pasteur developed vaccines against chicken cholera, anthrax, and rabies; Koch established the methodological framework for identifying disease-causing microorganisms. The introduction of vaccines against diphtheria, tetanus, and pertussis in the 1920s and 1930s dramatically reduced childhood mortality in industrialised countries.

The polio vaccine, developed by Jonas Salk and introduced in 1955, demonstrated the transformative potential of large-scale vaccination campaigns. Before the vaccine, polio paralysed hundreds of thousands of children annually. Within a decade of the vaccine's introduction, cases had fallen by ninety percent in the United States. The global effort to eradicate polio, launched in 1988, has since reduced annual cases from approximately 350,000 to fewer than fifty—one of the greatest public health achievements of the modern era.

Vaccination has not been without controversy. In the late 1990s, a study published in a major medical journal claimed a link between the measles-mumps-rubella vaccine and autism. The study was subsequently found to be fraudulent; its lead author lost his medical licence and the paper was retracted. However, the damage to public confidence in vaccination proved persistent. Vaccine hesitancy—reluctance or refusal to vaccinate—has been identified by the World Health Organization as one of the top ten threats to global health, contributing to resurgences of measles in countries that had previously eliminated the disease.`,
      questions: [
        {
          type: 'formgroup', id: 'r1-tfng', part: 5, qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Smallpox has been completely eradicated thanks to vaccination.\n2. {{2}}: Variolation was first practised in the Ottoman Empire before spreading to China.\n3. {{3}}: Lady Mary Wortley Montagu introduced variolation to England after observing it in Constantinople.\n4. {{4}}: The mortality rate from variolation was higher than from naturally acquired smallpox.\n5. {{5}}: James Phipps was Edward Jenner's own son.\n6. {{6}}: The germ theory of disease had already been established when Jenner published his findings.\n7. {{7}}: Before the polio vaccine, hundreds of thousands of children were paralysed by the disease each year.`,
          blanks: [
            { num: 1, answers: ['TRUE'] }, { num: 2, answers: ['FALSE'] }, { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] }, { num: 5, answers: ['NOT GIVEN'] },
            { num: 6, answers: ['FALSE'] }, { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup', id: 'r1-table', part: 5, qRange: [8, 13],
          groupLabel: 'Complete the table below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          title: 'Key Scientists and Events in Vaccination History',
          template: `8. Jenner (1796): Coined the word "{{8}}" from the Latin word for cow.\n9. Pasteur: Developed vaccines against cholera, {{9}}, and rabies.\n10. Koch: Established methods for identifying {{10}} microorganisms.\n11. Salk (1955): Developed a vaccine against {{11}}, reducing US cases by 90% within a decade.\n12. 1988 global campaign: Reduced annual {{12}} cases from 350,000 to fewer than fifty.\n13. Late 1990s: A fraudulent study claimed a link between the MMR vaccine and {{13}}.`,
          blanks: [
            { num: 8,  answers: ['vaccination', 'vaccine'] },
            { num: 9,  answers: ['anthrax'] },
            { num: 10, answers: ['disease-causing', 'pathogenic'] },
            { num: 11, answers: ['polio'] },
            { num: 12, answers: ['polio'] },
            { num: 13, answers: ['autism'] },
          ],
        },
      ],
    },

    {
      part: 6, skill: 'reading',
      title: 'Reading — Passage 2: Deep-Sea Exploration',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Deep-Sea Exploration

A. The deep ocean—generally defined as water below 200 metres in depth—covers more than half of the Earth's surface and represents the planet's largest habitat. Yet it remains the least explored environment on Earth. As of 2024, less than 25 percent of the ocean floor has been mapped to a resolution comparable to what is available for the surface of Mars. The technological and logistical challenges of deep-sea exploration are immense, but so are the potential rewards: in biodiversity, in mineral resources, and in understanding the fundamental processes that regulate Earth's climate.

B. Pressure is the defining physical challenge of deep-sea environments. At the deepest point of the ocean—the Challenger Deep in the Mariana Trench, approximately 11,000 metres below the surface—the water pressure reaches about 1,086 bar, or roughly 1,086 times the pressure at sea level. This pressure would crush most conventional equipment and is lethal to organisms adapted to surface conditions. Exploring such environments requires specially engineered submersibles with titanium or glass spherical hulls capable of withstanding these forces, and the cost of constructing and operating such vehicles is prohibitive for most research institutions.

C. Despite these difficulties, the deep sea has already yielded discoveries that have transformed our understanding of life. The discovery of hydrothermal vent ecosystems in 1977 overturned a foundational assumption of biology: that all life on Earth ultimately depends on photosynthesis. Vent communities thrive in total darkness, sustained by chemosynthesis—the conversion of chemical energy from hydrogen sulfide and other compounds emitted by vents into organic matter. Tube worms, shrimp, crabs, and fish crowd around these superheated plumes at temperatures that would be fatal to most surface life. The existence of life in such extreme conditions has extended scientific speculation about the possibility of life elsewhere in the solar system, particularly in the subsurface oceans of Jupiter's moon Europa and Saturn's moon Enceladus.

D. The deep ocean also holds vast mineral deposits. Polymetallic nodules—potato-sized lumps of manganese, cobalt, nickel, and copper—litter vast areas of the abyssal plain, formed over millions of years by the precipitation of minerals from seawater. The Clarion-Clipperton Zone in the Pacific alone is estimated to contain more nickel and cobalt than all known land-based deposits combined—metals critical to battery technology for electric vehicles. Growing interest in deep-sea mining has alarmed marine scientists, who warn that the ecosystems of the abyssal plain, where biological turnover is extraordinarily slow, may take centuries to recover from physical disturbance.

E. Remote sensing technologies have transformed the pace and scope of deep-sea exploration. Autonomous Underwater Vehicles (AUVs) can be programmed to follow pre-set survey routes, collecting bathymetric data, water samples, and high-resolution imagery for months at a time without a surface crew. Remotely Operated Vehicles (ROVs), controlled in real time by operators on a surface ship, allow for more flexible investigation and the collection of biological specimens. Together, these technologies have enabled the mapping and characterisation of thousands of previously unknown seamounts, cold-water coral ecosystems, and deep-water fish populations.

F. International governance of the deep ocean remains incomplete. The high seas—oceans beyond national jurisdiction—cover approximately 43 percent of the Earth's surface and are governed by a fragmented framework of treaties. In 2023, after nearly two decades of negotiation, the United Nations adopted a Treaty on the High Seas, establishing for the first time a legal mechanism for creating marine protected areas in international waters. Conservationists welcomed the treaty as a historic step, though its effectiveness will ultimately depend on the political will of member states to ratify and enforce its provisions.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of mineral deposits found on the ocean floor and their commercial value', answer: 'D' },
            { num: 15, stem: 'Details of vehicles that can operate without human pilots during deep-sea surveys', answer: 'E' },
            { num: 16, stem: 'A reference to the possibility of life on moons of other planets', answer: 'C' },
            { num: 17, stem: 'A comparison between ocean floor mapping and data available for another planet', answer: 'A' },
            { num: 18, stem: 'An explanation of why pressure makes deep-sea exploration technically difficult', answer: 'B' },
            { num: 19, stem: 'Details of a new international agreement on ocean governance', answer: 'F' },
            { num: 20, stem: 'An account of an ecosystem that does not depend on sunlight for energy', answer: 'C' },
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
          template: `21. At the Challenger Deep, water pressure reaches approximately {{21}} bar.\n22. Deep-sea ecosystems at hydrothermal vents are sustained by {{22}}, not photosynthesis.\n23. Polymetallic nodules contain metals such as manganese, cobalt, nickel, and {{23}}.\n24. Scientists warn that abyssal plain ecosystems may take {{24}} to recover from mining disturbance.\n25. AUVs collect data during pre-set surveys that can last for {{25}} without a surface crew.\n26. The 2023 UN treaty was welcomed as a historic step, but its success depends on member states' willingness to {{26}} its provisions.`,
          blanks: [
            { num: 21, answers: ['1,086', 'one thousand'] }, { num: 22, answers: ['chemosynthesis'] },
            { num: 23, answers: ['copper'] }, { num: 24, answers: ['centuries'] },
            { num: 25, answers: ['months'] }, { num: 26, answers: ['ratify and enforce', 'enforce'] },
          ],
        },
      ],
    },

    {
      part: 7, skill: 'reading',
      title: 'Reading — Passage 3: The Future of Work',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Future of Work

Few questions preoccupy economists, sociologists, and policy-makers more acutely than the future of work. Automation, artificial intelligence, globalisation, and shifting demographic patterns are converging to reshape labour markets at a pace and scale that many regard as unprecedented. Whether this transformation will be broadly beneficial or deeply disruptive depends on factors that remain deeply uncertain—and on policy choices that have not yet been made.

The fear that technological change will destroy jobs on a net basis has a long history. The Luddites—English textile workers who destroyed machinery in the early nineteenth century—feared, correctly, that mechanisation would eliminate their specific occupations. They were wrong, however, about the broader consequences: industrialisation ultimately created far more employment than it destroyed, raising living standards across the economy. Economists who draw comfort from this history argue that technological change is fundamentally labour-complementing—creating new tasks, new industries, and new forms of work that offset the jobs displaced. Sceptics counter that artificial intelligence differs qualitatively from previous technologies because it can replicate not just manual labour but cognitive work, threatening a much broader range of occupations simultaneously.

The empirical evidence so far is mixed. Routine cognitive and manual tasks—those that can be reduced to a set of predictable steps—have been automated at substantial rates since the 1980s. Jobs involving non-routine physical tasks (plumbing, surgery, hairdressing) and non-routine cognitive tasks (creative problem-solving, social intelligence, strategic judgement) have proved considerably more resilient. Studies by economists David Autor and colleagues have documented a polarisation of labour markets in advanced economies: middle-skill jobs in routine occupations have hollowed out, while demand has grown at both the high-skill and low-skill ends of the distribution. The result is an "hourglass economy" in which middle-income earners face declining opportunity.

The rise of generative artificial intelligence since 2020 has added a new dimension to this debate. Large language models and image-generation systems can now produce text, code, and creative content of professional quality in seconds. Unlike the automation of the 1980s, which primarily affected production workers, generative AI threatens professions that have historically been insulated from technological displacement: lawyers, accountants, journalists, radiologists, and software developers. Whether this represents the beginning of a genuinely new economic era or simply an accelerated version of previous technological transitions remains vigorously contested.

Policy responses to labour market transformation have varied widely. Nordic countries have invested heavily in active labour market policies—retraining programmes, wage subsidies, and generous unemployment insurance—that facilitate transitions between sectors without the prolonged hardship experienced in economies with weaker social safety nets. Some economists have proposed universal basic income as a more radical solution: providing every adult with an unconditional payment sufficient to cover basic needs, freeing individuals to pursue education, caregiving, or entrepreneurship without being trapped in insecure low-wage employment. Critics question whether such schemes are financially sustainable or whether they would reduce incentives to work.

Education systems face enormous pressure to adapt. Curricula designed for the industrial era, emphasising memorisation and standardised assessment, are increasingly misaligned with the cognitive competencies—adaptability, complex communication, creative thinking—that labour markets are beginning to demand. Educational reformers argue that learning to learn—developing the metacognitive skills to acquire and deploy new capabilities throughout a working life—is more valuable than mastery of any fixed body of knowledge. Sceptics warn that fundamental skills in literacy, numeracy, and analytical reasoning remain essential foundations, and that enthusiasm for "twenty-first-century skills" has sometimes been used to justify the abandonment of rigorous instruction.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'What does the passage say about the Luddites?',
          options: [
            'They were correct that mechanisation would both destroy their jobs and harm the broader economy.',
            'They were wrong that mechanisation would affect their specific occupations.',
            'They correctly predicted the elimination of their jobs but were wrong about broader economic consequences.',
            'They successfully prevented the mechanisation of the textile industry.',
          ],
          answer: 2,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'According to the passage, what distinguishes AI from previous technologies, according to sceptics?',
          options: [
            'It can automate manual labour more efficiently than earlier machines.',
            'It can replicate both manual and cognitive work, threatening a wider range of jobs simultaneously.',
            'It has already destroyed more jobs than any previous technology in history.',
            'It primarily affects low-skill workers rather than professionals.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q29', part: 7,
          text: 'What does the "hourglass economy" described by Autor et al. refer to?',
          options: [
            'An economy in which both high-skill and low-skill jobs are shrinking simultaneously.',
            'A polarised labour market where middle-skill jobs decline while demand grows at both extremes.',
            'An economy that cycles rapidly between growth and recession.',
            'A model in which middle-income earners have more job security than those at either extreme.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q30', part: 7,
          text: 'What criticism of universal basic income is mentioned in the passage?',
          options: [
            'It has been shown to significantly reduce motivation to work in pilot programmes.',
            'It primarily benefits high-income individuals who do not need additional support.',
            'It may not be financially sustainable and could reduce incentives to work.',
            'It has been rejected by all Nordic countries as impractical.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup', id: 'r3-ynng', part: 7, qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Routine cognitive tasks have been more resistant to automation than non-routine physical tasks.\n32. {{32}}: Generative AI since 2020 has primarily affected production workers in manufacturing.\n33. {{33}}: Nordic countries have invested in labour market policies that help workers transition between sectors.\n34. {{34}}: Universal basic income has been successfully implemented in all Nordic countries.\n35. {{35}}: Educational reformers argue that developing adaptability is more valuable than fixed knowledge.\n36. {{36}}: The writer takes a clear personal position on whether AI will ultimately benefit or harm employment.`,
          blanks: [
            { num: 31, answers: ['NO'] }, { num: 32, answers: ['NO'] }, { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NOT GIVEN'] }, { num: 35, answers: ['YES'] }, { num: 36, answers: ['NO'] },
          ],
        },
        {
          type: 'formgroup', id: 'r3-sent', part: 7, qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Jobs involving {{37}} problem-solving and social intelligence have proved more resilient to automation.\n38. Nordic countries use active labour market policies including retraining and {{38}} subsidies.\n39. Reformers argue that {{39}} to learn—developing metacognitive skills—is more valuable than any fixed knowledge.\n40. Sceptics warn that enthusiasm for new skills has sometimes justified abandoning {{40}} instruction.`,
          blanks: [
            { num: 37, answers: ['non-routine'] }, { num: 38, answers: ['wage'] },
            { num: 39, answers: ['learning'] }, { num: 40, answers: ['rigorous'] },
          ],
        },
      ],
    },

    {
      part: 8, skill: 'writing', title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [{
        type: 'write', id: 'w1', part: 8, taskNumber: 1,
        imageUrl: '/assets/ielts/charts/set9-task1.svg',
        imageAlt: 'Bar chart comparing university enrolment by subject area in 2005 and 2023',
        stimulus: 'The bar chart below compares the percentage of students enrolled in six university subject areas in 2005 and 2023.',
        text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'Some people argue that zoos serve an important role in wildlife conservation and education. Others believe that keeping animals in captivity is unethical and unnecessary.',
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
          text: 'Part 1 — Personal questions about science and discovery',
          followUp: [
            'Are you interested in science? Which area of science interests you most?',
            'Can you describe a scientific discovery that impressed or surprised you?',
            'Did you enjoy science classes at school? Why or why not?',
            'Do you think science is well-funded in your country?',
          ],
        },
        {
          type: 'speak', id: 'sp2', part: 10, partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a person you know who works in science, medicine, or research.\n\nYou should say:\n• who this person is and what they do\n• how you know them\n• what their work involves\n• and explain what you admire about their work or dedication`,
        },
        {
          type: 'speak', id: 'sp3', part: 10, partNumber: 3,
          text: 'Part 3 — Discussion: Science, ethics, and society',
          followUp: [
            'Should scientific research always be driven by practical benefit, or is pure research also valuable?',
            'How should governments decide which areas of science to fund?',
            'Do you think the public understands science well enough to make informed decisions on issues like vaccines or climate change?',
            'Are there areas of scientific research that should be restricted for ethical reasons?',
          ],
        },
      ],
    },
  ],
};

export default mock;
