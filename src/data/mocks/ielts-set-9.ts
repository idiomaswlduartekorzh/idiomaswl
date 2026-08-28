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

CUSTOMER: Do you need an email address now?

RECEPTIONIST: We can add it at check-in. The telephone number is enough to hold the booking, and we never ask for card details by an unexpected message. Your confirmation will carry a booking reference, so quote that if you call again.

CUSTOMER: We'll be there for four nights, arriving on the Thursday.

RECEPTIONIST: Four nights, noted. And what type of room would you like?

CUSTOMER: I'll take a twin room — oh, sorry, no, a double, please. My husband is coming with me.

RECEPTIONIST: A double, of course. May I ask the reason for your visit?

CUSTOMER: It's for business — there's a conference in the city that week.

RECEPTIONIST: The conference centre is about a fifteen-minute walk away. We can order a taxi in bad weather, though morning traffic makes walking quicker. If you need to work here, the lounge has desks and the room rate includes wireless internet.

RECEPTIONIST: Noted. Is there anything else you need for your stay?

CUSTOMER: Two things, actually. We'll be driving down, so we'd like parking. And we're bringing our baby, so could you put a cot in the room?

RECEPTIONIST: No problem at all — parking is free for guests, and I'll arrange a cot. Now, let me describe our rooms so you can choose. Our Standard room has one double bed and looks out over the garden; that's £95 a night.

CUSTOMER: Is the cot included, and can we reach the room without stairs?

RECEPTIONIST: There is no cot charge. A lift serves every guest floor, but tell us if you need a fully accessible bathroom because that is a separate room category. The Standard rooms are quieter than those facing the road.

CUSTOMER: And something a little larger?

RECEPTIONIST: The Family room sleeps more — it has three beds, though it overlooks the car park, I'm afraid. That one is £120 per night.

CUSTOMER: And your very best room?

RECEPTIONIST: That would be the Suite, with one double bed and a wonderful sea view. The Suite is £180 a night.

CUSTOMER: Does the price change at the weekend?

RECEPTIONIST: These are the rates for your actual dates, including tax. The Family room's extra beds do not make it better for two adults and a baby, and the Suite has more sitting space rather than another bedroom.

CUSTOMER: The Standard sounds perfect for us.

RECEPTIONIST: Excellent choice. Breakfast is included in every rate, served until half past nine.

CUSTOMER: We may leave early on the final morning.

RECEPTIONIST: Ask reception the night before and we can prepare a simple takeaway breakfast. Check-in begins at three, but you may leave luggage earlier. Cancellation is free until two days before arrival; after that the first night is charged.

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

Complete a short gym induction before using equipment, and register your bicycle at reception rather than sharing the storage code. Showers are beside the gym. Lockers there are for daytime use only, so remove belongings before the building closes.

Now, a few practical matters. On your first morning, please collect your security pass from the reception desk — you'll need it to enter the building and to use the lifts. Our working day starts at 8.30, though many people arrive a little earlier for a coffee.

Wear the pass visibly and never hold a secure door for someone you do not recognise. Visitors sign in and receive a different badge. If your pass is lost, report it immediately so access can be cancelled; do not wait until the next morning.

Let me tell you about the facilities. The canteen is on the second floor, and it serves hot meals from midday. In every kitchen area you'll find free hot drinks available throughout the day, so please help yourself.

Ingredient and allergen information is displayed beside each dish. Reusable cups are provided in kitchens, and please label food placed in a shared refrigerator. The small ground-floor café is run separately, so purchases there are not included.

In terms of your first few weeks, each new employee is assigned a mentor — an experienced colleague who'll answer your questions and show you how things work. Your early training will focus mainly on the company software, which can take a little getting used to. And I should mention that the probation period lasts three months, after which we'll have a review to discuss how you're getting on.

Your mentor supports everyday questions but does not replace your manager or the confidential HR service. Complete the data-protection module before using a live customer record. During probation, keep examples of completed work and raise obstacles early; the review should not contain surprises.

Finally, staying informed. There's a team meeting every Friday, where we share updates and celebrate successes. We also send out a newsletter once a month by email.

The meeting notes are stored on the staff portal for colleagues working remotely. Urgent safety notices appear there and by text; the newsletter is for longer stories, so it should never be your only source for a change that takes effect immediately.

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

TUTOR: Keep that wording. It describes behaviour; it does not claim breakfast caused grades or health outcomes, which your design cannot test.

TOM: We also defined breakfast as food or an energy-containing drink before ten, so respondents were not using different definitions.

TUTOR: And why breakfast in particular?

TOM: Mainly because it's the meal students skip most often. We thought that made it worth studying — there's a lot of advice telling people not to skip it, but not much on what students actually do.

TUTOR: Be careful with “most often” unless your source compares every meal in the same population. Explain that it was your reason for choosing the topic, not a result of this survey.

TUTOR: Good reasoning. How did you gather your data?

KIRSTY: We considered doing face-to-face interviews at first, but in the end we used an online questionnaire. It let us reach far more people quickly.

TUTOR: How did you prevent repeat responses?

KIRSTY: Each invitation link could be submitted once, but participation was anonymous. We piloted the wording with eight students and removed a question that assumed everyone lived on campus.

TUTOR: Sensible. And what did you find?

TOM: The most surprising result was that most students who skipped breakfast did so simply to save time in the mornings — not because they weren't hungry or were dieting, as we'd assumed.

TUTOR: Report the available response categories and the number who selected each. “Simply” may be too strong because a multiple-choice answer can hide several motives.

TUTOR: Interesting. Were there any weaknesses in your study?

KIRSTY: Yes — our biggest problem was the sample. We had far too few male participants; nearly eighty per cent of respondents were women, so the results are a bit skewed.

TUTOR: And recruitment through student societies may create other differences. Present the gender imbalance clearly, but do not imply that correcting that one variable would make the sample representative of every student.

TUTOR: That's an honest assessment. Now, thinking about the write-up: your data is strong, but the report itself needs more graphs — at the moment it's very text-heavy, and readers will find visuals easier to follow.

KIRSTY: We could use a bar chart for frequency and a separate chart for reasons, rather than a three-dimensional pie chart.

TUTOR: Good. Give each figure a title, denominator and readable labels. A graph should reveal the data, not decorate it.

TOM: That's fair. We'll add some.

TUTOR: And for any future work, do make your sample larger — a few hundred would be ideal. I'd also advise you to check the reliability of your sources; a couple of the websites you cited aren't peer-reviewed.

TOM: So should we remove every non-academic source?

TUTOR: Not automatically. A university policy page can document its own service, but a nutrition claim needs suitable research. Record author, date, population and method instead of judging reliability from appearance.

KIRSTY: Understood. When do you need the final version?

TUTOR: The final report must be handed in by Friday, so you've got a few days. Oh — and Tom, I'll lend you a book that covers survey design really well; come by my office and collect it.

KIRSTY: We'll also attach the questionnaire and an anonymous summary table so another group can see how our categories were produced.

TUTOR: Excellent, but check that free-text comments cannot identify anyone before sharing the file.

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

“Most” matters because volcanic hot spots can occur away from a current plate boundary. Melting also does not mean the whole mantle is liquid: pressure, added water and rising hot material can produce magma locally. Its gas content and chemistry influence what follows.

Now, volcanoes are not all the same. Broadly, there are two main types. Shield volcanoes, like those in Hawaii, are built up from very runny lava that flows a long way before it cools. As a result, they are broad and low, with gentle slopes. Composite volcanoes, by contrast, are formed from thicker, stickier lava. They are tall and steep, and they tend to produce far more violent eruptions.

This two-type scheme is useful for an introduction but not exhaustive. Cinder cones, calderas and submarine volcanoes complicate it, and one volcano can change behaviour. Viscosity, dissolved gases and the route magma takes matter more than a label alone.

That brings me to hazards. When a large volcano erupts, it can throw enormous clouds of ash high into the atmosphere. This ash can travel great distances on the wind, and it's a serious problem for aviation, since it can ground aircraft across whole continents. But the deadliest hazard of all is what's called a pyroclastic flow — a fast-moving avalanche of superheated gas and rock that races down the slopes, destroying everything in its path.

Risk depends on exposure as well as the physical event. Ash can damage engines, contaminate water and overload roofs; rain can remobilise loose material into lahars long after an eruption. Pyroclastic flows are exceptionally destructive, but calling one hazard always the deadliest ignores eruption and settlement context.

Despite these dangers, people continue to live near volcanoes, and there are good reasons why. For one thing, volcanic regions often have extremely fertile soil, which is excellent for growing crops. For another, the heat below the surface can be tapped to generate geothermal energy, providing clean electricity for nearby communities.

Benefits are not evenly available. Fresh deposits may take time to weather into soil, geothermal wells require investment and poorly managed fluids can carry gases or minerals. Tourism and cultural attachment also keep communities nearby. Describing residents as simply choosing danger overlooks land, livelihoods and relocation costs.

Finally, a word on monitoring. Because eruptions are so dangerous, scientists watch active volcanoes closely. Sensitive instruments record tiny earthquakes beneath the ground, which often increase in the days before an eruption. By studying these signals, together with changes in the shape of the volcano, scientists can increasingly predict eruptions — and that early warning can save thousands of lives.

Monitoring teams also measure gas and temperature and compare several instruments. No signal guarantees an eruption: unrest can stop, and some eruptions accelerate with little warning. Scientists therefore issue probabilistic forecasts and alert levels rather than a precise appointment. A warning saves lives only when communication, evacuation routes and public trust work with the instruments.`,
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
            { num: 33, answers: ['slopes'], maxWords: 1 },
            { num: 34, answers: ['eruptions', 'eruption'], maxWords: 1 },
            { num: 35, answers: ['ash'], maxWords: 1 },
            { num: 36, answers: ['flow'], maxWords: 1 },
            { num: 37, answers: ['fertile'], maxWords: 1 },
            { num: 38, answers: ['energy'], maxWords: 1 },
            { num: 39, answers: ['earthquakes'], maxWords: 1 },
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

Vaccination is one of the most effective public-health interventions, but “a vaccine” is not one identical product or a guarantee that one injection prevents every case. Vaccines train immune responses against particular pathogens; schedules, number of doses, effectiveness and duration of protection vary. Smallpox was declared eradicated by the World Health Organization in 1980. Wild poliovirus transmission remains endemic in Afghanistan and Pakistan in 2026, while outbreaks of vaccine-derived poliovirus are tracked separately. Measles and diphtheria remain preventable only when programmes achieve and sustain high coverage.

The foundational insight of vaccination—that exposure to a mild or weakened form of a disease could confer protection against the severe form—was not the product of a single discovery but emerged from centuries of observation. In China, practitioners of variolation were inoculating people against smallpox as early as the sixteenth century by introducing dried scabs from mild cases into healthy individuals through the nose or skin. The practice spread through the Ottoman Empire and reached England in the early eighteenth century, where it was championed by Lady Mary Wortley Montagu, who had observed it in Constantinople. Variolation carried a small but real mortality risk—approximately two percent of those inoculated died—but this was far lower than the thirty percent case fatality rate of naturally acquired smallpox.

The decisive advance came in 1796, when English country physician Edward Jenner tested whether material associated with cowpox could protect against smallpox. He inoculated a boy named James Phipps and later deliberately exposed him to smallpox material; Phipps did not develop the disease. Such an experiment would violate modern requirements for consent, risk review and protection of children. Jenner published in 1798. The word vaccine derives through Latin from vacca, meaning cow, and the terminology later broadened beyond smallpox. Germ theory had not yet supplied the modern mechanism, but the safer approach eventually displaced variolation.

The late nineteenth and early twentieth centuries saw rapid expansion of vaccine development, driven by advances in bacteriology and virology pioneered by Louis Pasteur and Robert Koch. Pasteur developed vaccines against chicken cholera, anthrax, and rabies; Koch established the methodological framework for identifying disease-causing microorganisms. The introduction of vaccines against diphtheria, tetanus, and pertussis in the 1920s and 1930s dramatically reduced childhood mortality in industrialised countries.

The inactivated polio vaccine developed by Jonas Salk and announced effective in 1955 demonstrated the potential of large campaigns; oral vaccines later became central to interrupting transmission. The Global Polio Eradication Initiative began in 1988, when wild polio was estimated to cause about 350,000 cases across more than 125 endemic countries. Cases have fallen by more than 99 percent, but the endpoint has proved difficult. In 2026 two countries remain endemic for wild type 1, and surveillance must also detect genetically distinct circulating vaccine-derived viruses. “Case” counts and environmental detections answer different questions, so a single current total requires a date and virus type.

Vaccination has not been without controversy. A 1998 paper raised concern about the measles-mumps-rubella vaccine and autism; it was retracted and found fraudulent, and its lead author lost his medical licence. Large studies across countries did not find a causal link. In 2025 a WHO expert review again concluded that available evidence shows childhood vaccines do not cause autism. Correcting a claim does not automatically repair trust: people assess institutions, access, past experience and social networks as well as data.

Safety monitoring continues after approval because trials cannot observe every rare event or every population. A report following vaccination is a signal to investigate, not proof that the vaccine caused it. Researchers compare observed rates with expected background rates and weigh adverse effects against disease risk. Transparent uncertainty is essential: overstating certainty can be as damaging as repeating a disproved claim.

Protection is also a population process. Some people cannot receive a particular vaccine or mount a strong response, so lower transmission can protect them indirectly. The coverage needed varies with pathogen, vaccine and contact pattern; there is no universal “herd-immunity percentage”. Waning immunity, unequal access and clusters of unvaccinated people can matter even when a national average appears high.

Technology changed production as well as ideas. Vaccines may use weakened or inactivated organisms, purified components, viral vectors or genetic instructions. These platforms differ in storage, dosing and manufacturing, and a platform's success against one pathogen does not guarantee success against another. Delivery requires cold chains, trained staff, surveillance and communication. Scientific discovery alone cannot correct an inequitable distribution system.

Elimination and eradication are also distinct. A country can interrupt endemic transmission yet remain vulnerable to imported infection; eradication means sustained worldwide absence under defined surveillance. Smallpox met that standard, whereas polio has not. Certification therefore follows a period of sensitive case and environmental monitoring rather than the first year with no recognised patient. Political conflict and inaccessible communities can weaken the evidence as well as vaccine delivery.`,
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
          template: `8. The English word {{8}} derives through Latin from the word for cow.\n9. Pasteur: Developed vaccines against cholera, {{9}}, and rabies.\n10. Koch: Established methods for identifying {{10}} microorganisms.\n11. Salk (1955): Developed an inactivated vaccine against {{11}}.\n12. In 2026 wild poliovirus remains endemic in {{12}} countries.\n13. A fraudulent paper claimed a link between the MMR vaccine and {{13}}.`,
          blanks: [
            { num: 8,  answers: ['vaccine'] },
            { num: 9,  answers: ['anthrax'] },
            { num: 10, answers: ['disease-causing'] },
            { num: 11, answers: ['polio'] },
            { num: 12, answers: ['two'] },
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

A. The deep ocean is commonly described as water below 200 metres, beyond which sunlight rapidly diminishes. Mapping, sampling and direct observation are different achievements: a ship may map seafloor shape without identifying the animals or chemistry above it. In April 2026 the Seabed 2030 project reported that 28.7 percent of the world ocean floor had been mapped to its modern standard. Coverage is uneven, and a percentage says nothing about whether a cell has later been revisited at finer resolution. Exploration must therefore state what was measured and at what scale.

B. Pressure is a defining challenge. At Challenger Deep in the Mariana Trench, close to 11,000 metres below the surface, pressure is roughly 1,086 bar. Conventional housings can collapse, seals can leak and small deformations affect instruments. Engineers use pressure-tolerant electronics or strong spherical housings, test components before a dive and often build redundant systems. Organisms adapted to the deep face a different problem when brought upward: changing pressure and temperature can damage a specimen before it reaches a laboratory.

C. The discovery of hydrothermal-vent ecosystems in 1977 changed biological assumptions about where primary production could occur. Microbes use chemosynthesis, obtaining energy from reactions involving compounds such as hydrogen sulfide, and support food webs that include tube worms, crustaceans and fish. Vent fluid itself can be extremely hot, but visible animals occupy mixing zones where temperatures are survivable; saying they live inside the hottest plume would be misleading. These ecosystems inform hypotheses about possible habitats in subsurface oceans on Europa or Enceladus, but an Earth analogue is not evidence that life exists on either moon.

D. Polymetallic nodules are slowly formed mineral concretions containing manganese, nickel, cobalt and copper. Commercial interest focuses on large fields such as the Clarion-Clipperton Zone, but an estimated amount in place is not the same as an economically recoverable reserve. Collection vehicles would remove nodules that provide hard habitat, disturb sediment and create plumes. Recovery cannot be represented by one universal number: tracks may remain visible for decades, nodules form over millions of years and different organisms recolonise at different rates. Baseline surveys are difficult because natural variation is still being described.

E. Autonomous Underwater Vehicles follow pre-set routes without a pilot controlling every movement, collecting bathymetry, imagery or chemical measurements before returning. Endurance depends on vehicle, payload, speed and battery; “months without a surface crew” is not a general property. Remotely Operated Vehicles remain connected to a ship and receive commands in real time, which supports selective sampling but ties the expedition to vessel time and weather. Neither system eliminates people: teams plan missions, monitor risk, calibrate sensors and interpret data. A beautiful image without position, scale and sampling context has limited scientific value.

F. Governance depends on both location and activity. The 2023 United Nations Agreement on biodiversity beyond national jurisdiction, or BBNJ Agreement, entered into force on 17 January 2026. It addresses marine genetic resources, area-based tools including protected areas, environmental-impact assessment, capacity-building and technology transfer. Entry into force changes its legal status but does not itself designate every protected area or settle seabed-mining rules administered through other institutions. Effectiveness now depends on implementation, finance, scientific capacity and cooperation among parties. Exploration produces knowledge needed for those decisions, while also creating disturbance and unequal access that governance must consider.

Sampling design limits every conclusion. A camera transect covers a tiny corridor, bait changes which animals approach and a water sample may capture DNA transported from elsewhere. Repeating a standard route can reveal change, whereas visiting only spectacular sites exaggerates rarity or abundance. Teams record failed dives and unusable samples because excluding them can make a method appear more reliable than it was.

Data stewardship is another challenge. Sonar files, images and specimen records need calibration, metadata and long-term storage if independent researchers are to reuse them. Coastal states and Indigenous communities may also hold knowledge relevant to migrations and ecological change. Open data can widen participation, but sensitive locations sometimes require protection. Exploration is therefore an information system as well as an engineering expedition.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of mineral deposits found on the ocean floor and their commercial value', answer: 'D' },
            { num: 15, stem: 'Details of vehicles that can operate without human pilots during deep-sea surveys', answer: 'E' },
            { num: 16, stem: 'A reference to the possibility of life on moons of other planets', answer: 'C' },
            { num: 17, stem: 'A warning that mapped coverage does not imply detailed biological observation', answer: 'A' },
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
          template: `21. At Challenger Deep, pressure is approximately {{21}} bar.\n22. Hydrothermal-vent food webs are supported by {{22}}.\n23. Polymetallic nodules contain manganese, nickel, cobalt and {{23}}.\n24. Nodules themselves form over {{24}} of years.\n25. AUVs navigate along {{25}} without continuous piloting.\n26. The BBNJ Agreement entered into force in January {{26}}.`,
          blanks: [
            { num: 21, answers: ['1,086'] }, { num: 22, answers: ['chemosynthesis'] },
            { num: 23, answers: ['copper'] }, { num: 24, answers: ['millions'] },
            { num: 25, answers: ['pre-set routes'] }, { num: 26, answers: ['2026'] },
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

Fear of technological displacement has a long history, but the Luddites are a poor shorthand for irrational resistance. Skilled textile workers attacked selected machinery and employers within conflicts over wages, apprenticeship and control of production. Mechanisation could damage a community even if national employment later expanded, and aggregate living standards do not reveal who bore transition costs. Historical analogy therefore supplies questions, not an automatic forecast. New technology can create tasks and demand while eliminating others; timing, bargaining power, ownership and social protection determine how gains are distributed.

Research on earlier automation distinguishes jobs from tasks. Routine cognitive and manual tasks—those expressible as predictable procedures—were easier to codify, while many non-routine physical and cognitive tasks proved more resilient. Studies by David Autor and colleagues documented job polarisation in several advanced economies: declining shares in some middle-skill routine occupations alongside growth toward higher- and lower-paid ends, sometimes called an hourglass economy. The pattern is neither universal nor permanent. Occupation labels contain changing bundles of tasks, and trade, institutions and demand also affect employment.

Generative artificial intelligence extends potential automation into language, software, media and administrative tasks. Exposure is not observed job loss. A 2025 ILO–NASK index estimated that one in four jobs worldwide had some degree of exposure, while concluding that transformation was more likely than complete replacement because occupations still combine tasks requiring human input. Clerical work showed the highest exposure, with increasing exposure in some highly digitised professional roles. Outcomes depend on adoption, reliability, cost, regulation and whether increased productivity creates new demand. Systems also rely on human data work and oversight that a simple automation score may hide.

Policy responses include job-search support, retraining, wage subsidies, collective bargaining and income insurance. Nordic systems are often discussed under the broad label of active labour-market policy, but programme design and results vary. Universal basic income proposes an unconditional regular payment; it is not automatically “sufficient to cover basic needs”, since amount and financing are political choices. Critics question fiscal cost, distribution and interaction with services, while advocates value simplicity and security. Pilot effects cannot be scaled mechanically to an entire tax-and-benefit system.

Education and training cannot target a fixed list of future occupations. Adaptability, communication and learning to learn matter, but they operate through domain knowledge rather than replacing it. This is not an argument against rigorous instruction: literacy, numeracy and analytical reasoning remain foundations for evaluating an AI output or acquiring a specialist skill. Access also matters: workers with time, money and employer support can retrain more easily than those facing unstable schedules.

Job quantity is only one outcome. Algorithmic management can change pace, surveillance and discretion even where headcount rises; assistance can remove routine work or intensify expectations. Evaluation should measure wages, hours, autonomy, error responsibility and unequal exposure as well as productivity.

Adoption evidence should distinguish a demonstration from sustained use. A firm may buy licences without redesigning a workflow, and a worker may quietly verify or redo an automated output. Productivity measured for one task does not reveal demand for the whole occupation. Longitudinal data, worker reports and employer records are needed to identify whether saved time becomes higher output, shorter hours or fewer posts.

Transition policy must anticipate differences within occupations. An experienced worker may use a tool to extend expertise, while an entrant loses the routine tasks through which expertise was learned. Employers can redesign apprenticeships, define escalation points and preserve human review. Workers should participate because they observe practical errors and incentives that a vendor benchmark misses. The future of work is a sequence of choices about task design, institutions and who participates in them.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'Why does the writer discuss the Luddites?',
          options: [
            'To prove that opposition to technology is always irrational in the long run.',
            'To show that national employment figures fully describe local transition costs.',
            'To warn that a familiar historical label can hide conflicts over wages and control.',
            'To establish that textile workers prevented industrial mechanisation.',
          ],
          answer: 2,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'What distinction does the passage make about generative-AI exposure?',
          options: [
            'Exposure estimates are direct measurements of jobs already eliminated.',
            'Task exposure can be substantial even when complete job replacement remains unlikely.',
            'Only production and manual occupations contain exposed tasks.',
            'Every exposed occupation will experience the same outcome.',
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
          template: `31. {{31}}: Routine cognitive tasks have generally been easier to codify than non-routine physical tasks.\n32. {{32}}: Occupational exposure to generative AI is identical to observed job loss.\n33. {{33}}: Active labour-market programmes can include wage subsidies and retraining.\n34. {{34}}: The amount of a universal basic income is a political design choice.\n35. {{35}}: The writer argues that adaptability makes domain knowledge unnecessary.\n36. {{36}}: Job quality should be assessed alongside the number of jobs.`,
          blanks: [
            { num: 31, answers: ['YES'] }, { num: 32, answers: ['NO'] }, { num: 33, answers: ['YES'] },
            { num: 34, answers: ['YES'] }, { num: 35, answers: ['NO'] }, { num: 36, answers: ['YES'] },
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
        imageAlt: 'Grouped bar chart comparing enrolment in thousands across Business and Management, Computer Science, Engineering, Health Sciences and Humanities in 2005 and 2023',
        stimulus: 'The bar chart below compares student enrolment, in thousands, across five university subject areas in 2005 and 2023.',
        text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'Some research institutes invite members of the public to help classify wildlife images collected by remote cameras. Some people think volunteers should be allowed to participate without formal training, while others believe only trained specialists should handle scientific data.',
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
            'How often do you read or watch news about science?',
            'Have you ever taken part in a science-related activity outside school?',
            'Which scientific subject do people in your area discuss most?',
            'Would you consider working in a scientific field?',
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
            'What kinds of scientific work can volunteers do reliably, and what should remain with specialists?',
            'How can researchers explain uncertainty without causing the public to lose trust?',
          ],
        },
      ],
    },
  ],
};

export default mock;
