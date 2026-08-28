import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-7',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 7',
  subtitle: 'Biomimicry · Blue Zones · Linguistic Relativity',
  timeMinutes: 164,
  sections: [
    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-7.mp3',
      title: 'Listening — Section 1: Enrolling in an Evening Course',
      instructions: 'You will hear a conversation between a student and a college registrar. Listen and answer Questions 1–10.',
      transcript: `REGISTRAR: Good evening, Riverside Adult Education Centre. How can I help you?

STUDENT: Hello. I'd like to enrol in one of your evening courses for the autumn term.

REGISTRAR: Of course. Let me take a few details. Could I start with your name?

STUDENT: Yes, my first name's Helen.

REGISTRAR: Thank you, Helen. And your surname?

STUDENT: It's Whitcombe.

REGISTRAR: Could you spell that for me?

STUDENT: Certainly — it's W-H-I-T-C-O-M-B-E.

REGISTRAR: Whitcombe, got it. And a contact number, in case a class is ever cancelled?

STUDENT: My mobile is 07700 900318.

REGISTRAR: Let me read that back — 07700 900318. And may I ask how you heard about the centre?

STUDENT: Well, a friend recommended it to me — though actually, I first saw a poster in the library.

REGISTRAR: The library, lovely — we advertise there each term. Now, which course were you interested in?

STUDENT: I was originally thinking of the cookery class, but I've made up my mind — I'd like to do photography.

REGISTRAR: Photography, an excellent choice. Is there a particular reason you've chosen it?

STUDENT: Mainly I'm hoping it'll help with my career — I work in marketing and I need to take better images myself.

REGISTRAR: Very sensible. One important thing: for this course, students have to bring their own camera, as the centre doesn't lend them out.

STUDENT: That's no problem — I've already got one.

REGISTRAR: Good. It does not need to be a professional model, but you should be able to control the focus and exposure manually. The tutor sends a short equipment guide before the first class.

STUDENT: Mine has those controls. Will we be outside much? I ask because evenings get dark quite early in autumn.

REGISTRAR: Two sessions involve a supervised walk near the river, but most teaching takes place indoors. If the weather is unsuitable, the tutor uses objects and lighting equipment in the studio instead. There is also a computer room for basic editing, although the course concentrates on taking photographs rather than software.

STUDENT: That balance sounds right for me.

REGISTRAR: Perfect. Let me give you the practical details, then. The beginners' photography course runs on Tuesday evenings, and it lasts for 10 weeks. The fee for the term is £120, and the classes are held in Room B4.

STUDENT: What time does it begin?

REGISTRAR: At half past six, finishing at eight. The fee includes printing for two assignments, but not travel to the outdoor locations. If you miss a class, the tutor can send the handout, though the practical exercise is not repeated.

STUDENT: And is there anything more advanced afterwards?

REGISTRAR: Yes — the follow-up course runs on Thursday evenings. It's a little shorter, only eight weeks, and the fee is slightly lower at £95. That one's in Room B7.

STUDENT: That sounds ideal. I'll sign up for the beginners' course to start with.

REGISTRAR: Before I print the form, I should mention our cancellation policy. You can receive a full refund if you withdraw at least fourteen days before the term begins. After that, we can normally transfer the fee to another course only if your place is filled from the waiting list.

STUDENT: I understand. I am confident about Tuesday evenings.

REGISTRAR: Excellent. The first class is on the third of October. You will receive an email receipt and the equipment guide today, then a reminder shortly before the course starts. Bring your camera, its manual if you have it, and a fully charged battery.

STUDENT: Great. I'll watch for the email.

REGISTRAR: Wonderful. I'll print the enrolment form for you now.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Evening Course Enrolment',
          example: 'First name:  Helen',
          template: `Surname: {{1}}
Contact number: {{2}}
Heard about the centre from: {{3}}
Course chosen: {{4}}
Reason for taking the course: to help with her {{5}}
Note: students must bring their own {{6}}`,
          blanks: [
            { num: 1, answers: ['Whitcombe', 'whitcombe'], maxWords: 1 },
            { num: 2, answers: ['07700900318', '07700 900318'], maxWords: 1 },
            { num: 3, answers: ['library'], maxWords: 1 },
            { num: 4, answers: ['photography'], maxWords: 1 },
            { num: 5, answers: ['career'], maxWords: 1 },
            { num: 6, answers: ['camera'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Course', 'Evening', 'Number of weeks', 'Fee', 'Room'],
          rows: [
            [
              'Photography (beginners)',
              'Tuesday',
              { num: 7, answers: ['10', 'ten'], maxWords: 1 },
              { num: 8, answers: ['120', '£120'], maxWords: 1 },
              'B4',
            ],
            [
              'Photography (advanced)',
              { num: 9, answers: ['Thursday', 'thursday'], maxWords: 1 },
              '8 weeks',
              { num: 10, answers: ['95', '£95'], maxWords: 1 },
              'B7',
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-7.mp3',
      title: 'Listening — Section 2: Museum Audio Guide',
      instructions: 'You will hear part of an audio guide at a maritime museum. Listen and answer Questions 11–20.',
      transcript: `Welcome to the Harborough Maritime Museum. I'll be your audio guide today, showing you around our collection.

Before we begin, a few practical points. Admission to our main galleries is completely free, so you can explore them at your own pace. Our popular children's activity trail is also free of charge, and I'd recommend it if you're visiting with a family. Do be aware, though, that our guided harbour tour, the temporary exhibition on the top floor, and hire of this audio guide all carry a small charge.

The building has step-free access on the ground floor. A platform lift reaches the upper gallery, but it is narrow, so a member of staff will operate it for you. Photography without flash is permitted in the permanent collection. Please check the signs in the temporary exhibition, where lenders may impose different conditions.

Now, a little about the building itself. The museum is housed in a nineteenth-century warehouse that once stored goods arriving by sea. It's one of the oldest buildings on the waterfront.

The brick walls and timber roof are historic, while the internal ramps, cases and environmental controls are modern additions. This combination lets us preserve the structure and protect objects from changes in humidity. Begin on the ground floor rather than going directly upstairs; the route follows the development of the harbour in chronological order.

Let's start in the entrance hall. The oldest object in our whole collection is displayed here — a ship's bell dating back four hundred years, recovered from a wreck just off the coast.

The label beside it explains how conservators removed salt from the metal. Please do not touch the bell: even clean hands leave moisture and oils that can damage its surface.

Moving into the first gallery on your left, you'll find a wonderful collection of detailed models of fishing boats, each one built by local craftsmen over the past century.

Look closely at the changing hull shapes rather than treating the models as decoration. They show how builders adapted boats for shallow coastal water and later added engines.

The second gallery is devoted to maps. Here you can trace how the coastline around the town has changed over the centuries, as the sea has advanced and retreated.

An interactive display lets you align three surveys. Remember that part of the apparent change comes from improved measurement, while storms and harbour construction changed the shore itself.

Upstairs, our most popular exhibit awaits: a complete Victorian diving suit, still in remarkable condition, together with its heavy brass helmet.

In the same room, a short film about the history of the port is shown every hour, and it's well worth twenty minutes of your time.

Subtitles are available, and a transcript can be borrowed from the information desk. The film begins five minutes past the hour, so there is time to examine the diving equipment first.

When you're ready for a break, our café is located just beside the garden at the rear of the building, where you can sit outside in fine weather.

One final reminder: for the safety of the exhibits, please leave any large bags in the cloakroom near the entrance before you go upstairs.

Small lockers are free, but they are limited in number. Food and drink should remain in the café area, and children must stay with an adult on the upper floor.

Enjoy your visit, and press the green button whenever you'd like me to continue.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO things at the museum are free of charge for all visitors?',
          options: [
            { letter: 'A', text: 'the guided harbour tour' },
            { letter: 'B', text: 'entry to the main galleries' },
            { letter: 'C', text: 'the temporary exhibition' },
            { letter: 'D', text: 'the children\'s activity trail' },
            { letter: 'E', text: 'hire of the audio guide' },
          ],
          selectCount: 2,
          answers: ['B', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Label the museum plan and complete the visitor notes.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Harborough Maritime Museum — visitor plan',
          taskFamily: 'plan-map-diagram-labelling',
          imageUrl: '/images/ielts/harborough-maritime-museum-plan.svg',
          imageAlt: 'Schematic plan of Harborough Maritime Museum with numbered locations for Questions 14 to 20.',
          template: `• The museum is housed in a former {{13}}.
• Entrance hall: a ship's {{14}}, four hundred years old — the oldest object.
• First gallery: models of {{15}} built by local craftsmen.
• Map gallery: shows how the {{16}} has changed over the centuries.
• Most popular exhibit (upstairs): a Victorian {{17}}.
• A short {{18}} about the port is shown every hour.
• The café is located beside the {{19}}.
• Leave large bags in the {{20}} near the entrance.`,
          blanks: [
            { num: 13, answers: ['warehouse'], maxWords: 1 },
            { num: 14, answers: ['bell'], maxWords: 1 },
            { num: 15, answers: ['fishing boats', 'boats'], maxWords: 2 },
            { num: 16, answers: ['coastline'], maxWords: 1 },
            { num: 17, answers: ['diving suit'], maxWords: 2 },
            { num: 18, answers: ['film'], maxWords: 1 },
            { num: 19, answers: ['garden'], maxWords: 1 },
            { num: 20, answers: ['cloakroom'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-7.mp3',
      title: 'Listening — Section 3: Designing a Psychology Experiment',
      instructions: 'You will hear two psychology students discussing an experiment with their tutor. Listen and answer Questions 21–30.',
      transcript: `TUTOR: So, Megan, Ryan — you've settled on a topic for your psychology experiment. Talk me through it.

MEGAN: We want to test whether background music affects how well students concentrate on a reading task.

TUTOR: What made you choose that?

RYAN: We both revise with music on, and we kept arguing about whether it actually helps. We thought we'd find out properly.

TUTOR: A good motivation. So what will you change between your groups — your independent variable?

MEGAN: The type of music. One group reads in silence, one with instrumental music, and one with music that has lyrics.

TUTOR: And how will you measure concentration?

RYAN: We'll give a short comprehension test straight afterwards and count the correct answers.

TUTOR: Fine. Now, your participants — how are you recruiting them?

MEGAN: We were going to test our friends, but you warned us that would bias things, so we'll put up a notice and take whoever volunteers.

TUTOR: Much better. One thing I'd watch — if each person does all three conditions, they'll be more practised by the third one, and that practice effect could distort your data.

RYAN: Good point. Maybe we should use different people for each condition.

TUTOR: Cleaner. And your immediate next step?

MEGAN: We need to write the comprehension questions and get them checked before we start.

TUTOR: Right. A few final details. Where will you run the tests?

RYAN: Before that, should we match participants by reading ability?

TUTOR: With a small volunteer sample, elaborate matching may create more problems than it solves. Collect a brief baseline measure, allocate participants to conditions using a genuinely random procedure, and report any imbalance. Also decide the sample size before seeing results. Stopping when a difference appears would inflate the chance of a misleading finding.

MEGAN: Should the music be equally loud in both music conditions?

TUTOR: Yes, measure it at the participant's seat. Keep the device and headphones identical too. Lyrics versus no lyrics should be the intended difference, not sound quality or volume.

RYAN: And we should ask whether anyone already knows the reading text.

TUTOR: Exactly. A pilot with people outside the final sample can reveal whether the passage is too easy, the questions are ambiguous or the procedure takes longer than expected. Do not use pilot scores in the final analysis.

RYAN: In a quiet room in the library, away from any noise.

TUTOR: Good. Make sure every passage is the same length, or that becomes another variable. And don't improvise the instructions — read them from a fixed script every time, so each group hears the same thing.

MEGAN: And for the report, we'll show the scores in a bar graph comparing the three groups.

TUTOR: Perfect. Store the anonymous scores separately from names and contact details, and agree who can access each file. One absolute rule: before anyone takes part, you must obtain their written consent. Ethics approval depends on it.

RYAN: The forms are ready.

TUTOR: Then you're in good shape. Add a short debrief explaining the purpose after participation, and remind volunteers that withdrawing will not affect their course. Before collecting data, write down your predicted comparison and analysis rule. That prevents you from quietly changing the hypothesis after seeing the scores.

MEGAN: We'll add those to the protocol and keep a dated copy.

TUTOR: Good. Send me the questions by Friday, and I will check the wording without seeing any results.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'Megan and Ryan chose their topic mainly because',
          options: [
            'they had read a study that surprised them',
            'they disagreed about a personal habit',
            'their tutor suggested it to them',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'The independent variable in their experiment will be',
          options: [
            'the type of music played',
            'the volume of the music',
            'the length of the reading task',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'To recruit participants, they have finally decided to',
          options: [
            'test their own friends',
            'select students at random from a class list',
            'invite volunteers through a notice',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'The tutor is mainly concerned that',
          options: [
            'the groups will be too small',
            'participants may improve through practice',
            'the music may be played too loudly',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What do the students agree to do next?',
          options: [
            'prepare and test their questions',
            'run a small pilot study',
            'book a quiet room',
          ],
          answer: 0,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `• The tests will take place in a quiet {{26}} in the library.
• Every reading passage will be the same {{27}}.
• Instructions will be read aloud from a fixed {{28}}.
• The scores will be presented in a bar {{29}}.
• Written {{30}} must be obtained from every participant.`,
          blanks: [
            { num: 26, answers: ['room'], maxWords: 1 },
            { num: 27, answers: ['length'], maxWords: 1 },
            { num: 28, answers: ['script'], maxWords: 1 },
            { num: 29, answers: ['graph'], maxWords: 1 },
            { num: 30, answers: ['consent'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-7.mp3',
      title: 'Listening — Section 4: The Science of Sleep',
      instructions: 'You will hear a lecture about the science of sleep. Listen and answer Questions 31–40.',
      transcript: `Good afternoon. Today's lecture is about sleep — something we all do, yet still don't fully understand. We spend roughly a third of our lives asleep, and yet its exact purpose remains one of biology's great puzzles.

Let's begin with what controls sleep. As night falls, the brain releases a hormone called melatonin, which makes us feel drowsy and prepares the body for rest.

Melatonin is governed by our internal body clock, which follows a roughly twenty-four-hour cycle known as the circadian rhythm. This rhythm is reset each day mainly by our exposure to daylight.

Once asleep, we cycle through two broad states: REM sleep and non-REM sleep. Non-REM itself contains stages, from lighter sleep to deep slow-wave sleep. Vivid dreams are often reported after REM awakenings, but dreaming is not exclusive to REM. Across a typical night, the balance changes: deep non-REM is concentrated earlier, while REM periods tend to lengthen towards morning.

These stages overlap in function rather than performing completely separate jobs. During deep non-REM sleep, processes associated with physical restoration are prominent: the body rebuilds muscle and pulses of growth hormone are released. That does not mean repair stops in every other stage.

REM sleep contributes to brain function, but it should not be described as the only stage important for learning. Experiments indicate that both REM and non-REM processes contribute to consolidating memory, with effects depending on the type of information and timing of sleep. Sleep also helps regulate attention, so a tired participant may struggle to encode new material before consolidation even begins.

The consequences of not sleeping enough can be serious. Controlled studies show changes in immune signalling, and chronic short sleep is associated with poorer health. Association does not establish every causal pathway, but sleep can weaken normal immune system responses and reduce resistance to infection.

Sleep loss also affects mood, making emotional reactions harder to regulate. The relationship runs both ways: anxiety or depression can disturb sleep, while disturbed sleep can worsen symptoms. This feedback is one reason clinicians ask about both duration and quality.

Different age groups have different needs. Teenagers generally require more sleep than adults, while biological timing also shifts later during adolescence. Early school or work schedules can therefore conflict with when a teenager naturally becomes sleepy, even when the person intends to rest.

Some people struggle to sleep at all. The most common sleep disorder is insomnia, the persistent inability to fall or stay asleep.

Finally, some practical advice. A regular schedule and morning daylight can reinforce circadian timing. Experts also recommend avoiding caffeine in the evening, as its effects can persist for many hours. Alcohol may make someone feel drowsy but can fragment sleep later, and bright light near bedtime can delay the body clock.

If difficulty persists and impairs daytime life, general advice is not a substitute for assessment. Clinicians consider medication, breathing disorders, pain, mental health and working patterns before deciding on treatment.

Naps illustrate the importance of context. A brief early-afternoon nap may improve alertness, but a long or late nap can reduce sleep pressure and make bedtime harder. Shift workers face different constraints and may need a planned combination of light, darkness and sleep opportunities rather than advice designed for a daytime schedule.

That concludes our overview; next week we'll look at sleep in the animal kingdom.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE SCIENCE OF SLEEP',
          template: `What controls sleep

• At night, the brain releases a hormone called {{31}}.
• The body clock follows a 24-hour cycle called the circadian {{32}}.

Types of sleep

• There are two broad states: REM sleep and {{33}} sleep.
• During deep sleep, the body rebuilds {{34}} and releases growth hormone.
• Both REM and non-REM processes contribute to consolidating {{35}}.

Effects of poor sleep

• A lack of sleep can weaken the immune {{36}}.
• Sleep loss also has a strong effect on {{37}}.
• In adolescence, biological {{38}} shifts later.

Advice

• The most common sleep disorder is {{39}}.
• Experts advise avoiding {{40}} in the evening.`,
          blanks: [
            { num: 31, answers: ['melatonin'], maxWords: 1 },
            { num: 32, answers: ['rhythm'], maxWords: 1 },
            { num: 33, answers: ['non-REM'], maxWords: 1 },
            { num: 34, answers: ['muscle'], maxWords: 1 },
            { num: 35, answers: ['memory'], maxWords: 1 },
            { num: 36, answers: ['system'], maxWords: 1 },
            { num: 37, answers: ['mood'], maxWords: 1 },
            { num: 38, answers: ['timing'], maxWords: 1 },
            { num: 39, answers: ['insomnia'], maxWords: 1 },
            { num: 40, answers: ['caffeine'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5, skill: 'reading',
      title: 'Reading — Passage 1: Biomimicry in Design',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Biomimicry in Design

An engineer looking at a leaf may see neither decoration nor a ready-made blueprint, but a physical strategy that can be tested. Biomimicry is the practice of studying biological forms, processes or systems for ideas relevant to human design. Evolution has produced structures that are light yet strong and surfaces that manage heat or water, but it has not worked towards human objectives. The useful step is therefore translation: identify a function, model the mechanism, build an analogue and measure whether it performs in the intended setting.

The term was popularised by biologist Janine Benyus in her 1997 book Biomimicry: Innovation Inspired by Nature. Benyus argued that rather than merely extracting resources from the natural world, designers and engineers should treat nature as a mentor, learning from the elegance and efficiency of biological systems. The concept was not new—inventors had always drawn inspiration from nature—but Benyus provided a systematic framework for doing so, and her work catalysed a new field of research and practice.

Architecture supplies a famous but frequently simplified case. Mick Pearce's Eastgate Centre in Harare was discussed in relation to termite mounds and uses the building's thermal mass, controlled ventilation and cool night air rather than a conventional sealed air-conditioning model. Popular accounts often describe a mound as a fixed chimney in which hot air simply rises. Research on termite nests instead shows several ventilation patterns that depend on species, wind and daily temperature change. Eastgate remains a valuable low-energy design, but a precise claim such as “ninety percent less energy” is meaningless unless the comparison states which buildings, climate loads and services are included.

Materials science shows why the biological observation must also be checked. A 2001 report on a Stenocara beetle proposed that hydrophilic tips on bumps collect fog droplets while surrounding hydrophobic slopes help water move. The mechanism inspired artificial patterned surfaces. Later behavioural work found that the two Namib beetles observed fog-basking belonged to the genus Onymacris; the bumpy Stenocara gracilipes tested in that study was not observed performing the behaviour in nature. Engineers can still test alternating wettability as a useful design. What they should not do is turn one laboratory model into a confident story about the behaviour of a named species.

Transport provides other testable analogies. Humpback-whale flippers inspired tubercle technology, in which bumps on a leading edge can alter flow and delay stall under some conditions. “Can” is important: performance depends on geometry and operating range. Japan's 500-series Shinkansen is reported to have used the kingfisher's beak as one source of inspiration when engineers reduced tunnel pressure waves. The resulting train was quieter and a 15 percent reduction in energy use was reported, but the final nose emerged from engineering models and trials rather than directly copying a bird.

Critics note that natural selection does not produce universal optima. A bat's wing reflects evolutionary history, available materials, development, reproduction and survival—not a specification for the most efficient aircraft. Biological systems may also solve several conflicting problems at once, while an industrial design needs only one function or must obey safety, repair and manufacturing constraints absent from nature.

For that reason, strong biomimicry is a method of generating hypotheses, not an appeal to nature as authority. A conventional design should be tested alongside the bioinspired one, using declared measures and realistic conditions. Failure is informative: it may reveal that researchers copied a visible shape while missing behaviour, scale or material properties. The same discipline applies to bioinspired computing. Ant-colony optimisation and neural learning borrow abstract relationships rather than literal insects or brains. Their value comes from performance and validation, not from the prestige of the biological metaphor.

Scale creates a recurring trap. A microscopic texture may direct a droplet on a small clean sample but clog, wear or cost too much across a roof. A flexible fin in seawater operates at different speeds and forces from a rigid turbine blade. Engineers use dimensionless ratios, prototypes and accelerated ageing tests to determine which relationships survive translation.

Environmental claims need a life-cycle comparison as well. A surface that saves water during use may require rare materials or frequent replacement; a passive building can still consume substantial energy through lighting and equipment. Biomimicry becomes more credible when the biological analogy is documented, alternative explanations are considered and the finished product is assessed from manufacture to disposal.`,
      questions: [
        {
          type: 'formgroup', id: 'r1-tfng', part: 5, qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Janine Benyus coined the word "biomimicry" in a scientific journal article.\n2. {{2}}: Eastgate uses thermal mass and controlled ventilation instead of a conventional sealed cooling model.\n3. {{3}}: A percentage saving for a building is meaningful without defining the comparison baseline.\n4. {{4}}: Later field research observed Stenocara gracilipes performing fog-basking behaviour.\n5. {{5}}: Tubercle technology was first applied to wind turbines before aircraft wings.\n6. {{6}}: The Shinkansen redesign reportedly drew inspiration from the kingfisher's beak.\n7. {{7}}: Natural selection produces solutions to a human engineering specification.`,
          blanks: [
            { num: 1, answers: ['FALSE'] }, { num: 2, answers: ['TRUE'] }, { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['FALSE'] }, { num: 5, answers: ['NOT GIVEN'] }, { num: 6, answers: ['TRUE'] }, { num: 7, answers: ['FALSE'] },
          ],
        },
        {
          type: 'formgroup', id: 'r1-sent', part: 5, qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `8. The proposed beetle model described {{8}} tips that collect fog droplets.\n9. The surrounding {{9}} slopes were proposed to help water move.\n10. Leading-edge bumps inspired by whale flippers are called {{10}} technology.\n11. The Shinkansen redesign reportedly reduced energy use by {{11}} percent.\n12. Natural designs reflect evolutionary {{12}} as well as present conditions.\n13. Ant-colony algorithms are an example of {{13}} computing.`,
          blanks: [
            { num: 8, answers: ['hydrophilic'] }, { num: 9, answers: ['hydrophobic'] },
            { num: 10, answers: ['tubercle'] }, { num: 11, answers: ['15'] },
            { num: 12, answers: ['history'] }, { num: 13, answers: ['bioinspired'] },
          ],
        },
      ],
    },

    {
      part: 6, skill: 'reading',
      title: 'Reading — Passage 2: Blue Zones — The Science of Longevity',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Blue Zones — The Science of Longevity

A. “Blue Zone” began as a demographic label for an area of Sardinia marked on a map while researchers investigated unusually high male longevity. Journalist Dan Buettner later popularised a five-region framework: parts of Sardinia, Okinawa, the Nicoya Peninsula and Ikaria, plus the Seventh-day Adventist community around Loma Linda, California. These places differ in boundaries, historical records and the outcome being measured. The branded list is therefore not one controlled experiment. It combines demographic research with a popular attempt to identify habits that might contribute to long and healthy lives.

B. One recurring observation is physical activity embedded in daily routine rather than only scheduled exercise: walking to shops, tending gardens or working on hilly terrain. Such descriptions are plausible and consistent with wider evidence that movement benefits health. They are not precise exposure measurements, however. A shepherd who reached old age may differ from someone who left the occupation in income, diet, genetics or access to care. Researchers must also avoid selecting a picturesque habit after knowing the outcome and then treating it as the explanation.

C. The popular framework describes largely plant-rich diets in which legumes—beans, lentils or soya—are common, while patterns of meat, fish and dairy vary. Okinawa is associated with the phrase hara hachi bu, interpreted as stopping before complete fullness. Historical diet cannot be reconstructed accurately from a modern menu or the memory of a few residents, and food systems change across generations. Alcohol illustrates the danger of inference: observing wine in one population does not prove that alcohol caused longevity or justify recommending it to someone who does not drink.

D. Social connection is another proposed feature. The Okinawan term moai can refer to mutual-support groups, while intergenerational contact is emphasised in accounts of Sardinian communities. Social epidemiology independently finds associations between isolation and mortality, but popular statements that loneliness is “equivalent to smoking fifteen cigarettes a day” compress different studies and outcomes into a memorable comparison. An association across groups cannot tell an individual exactly how many years a friendship adds, and illness itself can reduce a person's ability to remain socially active.

E. Accounts also group several ideas under “purpose” and stress reduction. Ikigai in Japanese has a wider range of everyday meanings than the English slogan “the reason for getting up in the morning”, and plan de vida is used in descriptions of Nicoya. Loma Linda's Adventist community observes a weekly Sabbath, while family and religious routines may structure rest and contact. These practices deserve study, but translating a local concept into a universal prescription can remove its social and historical context. Purpose may affect behaviour and wellbeing, while health and security may also make purpose easier to sustain.

F. The underlying demography is actively debated. Critics argue that errors in birth, death or migration records can create false concentrations of extreme ages. Researchers associated with Blue Zone validation respond that candidate regions are checked against multiple independent records and age-specific population counts. Both positions highlight why a centenarian's document and a regional longevity rate are different claims. Even if an unusual concentration is valid, confounding variables—genetics, geography, migration, cohort history and selection of boundaries—prevent a list of shared habits from isolating causation.

The sensible conclusion is neither that the five regions reveal a formula nor that familiar health behaviours are worthless. Movement, nutritious food and social support can be evaluated through broader evidence without using a trademarked geography as proof. A rigorous intervention would define the population and outcome in advance, compare an appropriate group, record adherence and adverse effects, and distinguish longer life from healthier life. Blue Zones are best treated as sources of questions whose individual claims still require independent testing.

Survivorship can distort the story in another way. Interviews with exceptionally old residents describe people who lived long enough to be interviewed, not peers who followed similar routines but died earlier. Memories of diet decades ago may also be reconstructed through present identity. Prospective cohort studies reduce some of these problems by recording exposure before the outcome, although they still face confounding and loss to follow-up.

Finally, a change in the number of centenarians can reflect both mortality and population structure. A large birth cohort produces more potential centenarians even if each person's chance is unchanged, while migration changes the denominator. Researchers therefore compare age-specific rates and verify residence histories rather than merely counting birthday celebrations.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of a cultural practice that limits food intake at mealtimes', answer: 'C' },
            { num: 15, stem: 'A warning that the longevity data may be unreliable in some regions', answer: 'F' },
            { num: 16, stem: 'Details of a social support structure used in Japan', answer: 'D' },
            { num: 17, stem: 'An explanation of how occupation naturally provides physical activity', answer: 'B' },
            { num: 18, stem: 'A reference to the cultural concept of having a sense of life purpose', answer: 'E' },
            { num: 19, stem: 'The origin of the term "Blue Zone" and the five regions identified', answer: 'A' },
            { num: 20, stem: 'A warning about converting a population association into a memorable individual comparison', answer: 'D' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' }, { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' }, { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' }, { letter: 'F', text: 'Paragraph F' },
          ],
        },
        {
          type: 'formgroup', id: 'r2-table', part: 6, qRange: [21, 26],
          groupLabel: 'Complete the table below. Choose NO MORE THAN THREE WORDS from the passage.',
          title: 'Blue Zones — Key Features',
          template: `21. Physical activity: Embedded in daily routine; not {{21}} exercise.\n22. Plant-rich diets: Beans, lentils and soya are examples of {{22}}.\n23. Okinawan eating principle: {{23}} is interpreted as stopping before complete fullness.\n24. Okinawan social group: Mutual-support groups called {{24}}.\n25. Okinawan life purpose: {{25}} has a wider meaning than a popular English slogan.\n26. Research limitation: {{26}} variables such as genetics make causation hard to isolate.`,
          blanks: [
            { num: 21, answers: ['scheduled'] },
            { num: 22, answers: ['Legumes'] },
            { num: 23, answers: ['hara hachi bu'] },
            { num: 24, answers: ['moai'] },
            { num: 25, answers: ['ikigai'] },
            { num: 26, answers: ['Confounding'] },
          ],
        },
      ],
    },

    {
      part: 7, skill: 'reading',
      title: 'Reading — Passage 3: Linguistic Relativity',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Linguistic Relativity

Does a language change thought, or does it merely reveal distinctions its speakers already need? Linguistic relativity names a family of hypotheses about relationships between language and cognition. The convenient label “Sapir-Whorf hypothesis” was attached later; Sapir and Whorf did not publish one jointly specified experiment. A strong claim that grammar determines what a person can think has little support. Narrower claims ask whether routinely naming or encoding a distinction changes attention, memory or speed on a particular task. Those claims can be tested, but they do not all rise or fall together.

Colour provides a narrow example. Russian uses a separate common term for lighter blue, goluboy, and darker blue, siniy, whereas English normally places both within “blue”. In a speeded discrimination experiment, Russian speakers responded faster when two shades crossed that lexical boundary than when both belonged to the same category; English speakers did not show the same boundary advantage. The Russian effect became smaller under a verbal-interference task, supporting a role for language during the decision rather than a permanently altered eye. Replication, display calibration and the exact range of shades still matter before generalising beyond the task.

Spatial frames offer another domain. Kuuk Thaayorre, spoken at Pormpuraaw in Australia, frequently uses absolute directions rather than relying on left and right. In one study, bilingual speakers arranged picture cards showing a temporal sequence along an east-to-west axis even when their own facing direction changed, while local English monolinguals tended to arrange them left to right. The result aligns spatial language with a non-linguistic time task. It does not by itself isolate whether language, environmental orientation, teaching or other cultural practice caused the difference.

Grammatical gender illustrates why famous demonstrations require replication. A widely repeated report said German and Spanish speakers chose different adjectives for objects such as a bridge, in line with each noun's grammatical gender. The original work appeared with limited methodological detail and small samples. A later preregistered study used the original materials with much larger samples and failed to replicate the central cross-language effect. This does not prove that grammatical gender can never affect any cognitive task; it shows that one memorable result cannot carry that broad conclusion.

Across the field, effects are often small and sensitive to instructions. Translation can change a task; bilingual experience can blur group boundaries; experimenters may select unusually convenient languages after learning their structure. The causal arrow is difficult to establish because culture may shape both language and cognition. Publication bias creates another risk when positive findings appear while null results remain unseen. Preregistration, adequate samples, shared materials and direct replication make a claim more trustworthy, especially when a surprising example has already become popular outside research.

Task design is central because a “non-linguistic” response may still invite silent naming. A colour decision made in a fraction of a second differs from remembering colours after a delay. Researchers can add verbal interference, compare category boundaries and use continuous measures rather than asking participants to explain their choices. Each method removes some interpretations and introduces others; no single task measures “thought” as a whole.

Bilingualism complicates group labels. Age of acquisition, proficiency, current language context and frequency of switching may all affect which categories are active. Treating every speaker of a named language as equivalent hides this variation. A strong design measures individual experience and avoids selecting only one community per language, because community and language would otherwise be inseparable.

A failed replication also needs careful interpretation. It lowers confidence in the exact original effect under those conditions; it does not demonstrate a universal absence. Conversely, finding a statistically reliable difference does not reveal its practical size or mechanism. Confidence grows when independent teams predict the same result in advance, share materials and observe it across reasonable variations of the task.

Practical implications should match that evidence. A language teacher can explicitly contrast a distinction learners routinely overlook, but should not assume a student's grammar sets a cognitive limit. In cross-cultural communication, asking how another speaker divided a category may clarify a misunderstanding; attributing disagreement to an entire language may instead create a stereotype. Linguistic relativity is most useful as a programme of precise comparisons between tasks, speakers and contexts—not as a claim that languages imprison their users in different worlds.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'What does the passage say about the strong version of the Sapir-Whorf hypothesis?',
          options: [
            'It has been confirmed by multiple empirical studies.',
            'It is largely rejected, although weaker claims have support.',
            'It is still debated but has not been tested experimentally.',
            'It applies only to colour perception and spatial cognition.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'What did the colour perception experiments described in the passage find?',
          options: [
            'Speakers of all languages discriminate colours at the same speed.',
            'Only languages with no colour terms showed differences in colour perception.',
            'Russian speakers were faster across the light–dark blue boundary, but verbal interference weakened it.',
            'Colour perception is entirely determined by the number of colour terms in a language.',
          ],
          answer: 2,
        },
        {
          type: 'mcq', id: 'r3-q29', part: 7,
          text: 'What did the study of Kuuk Thaayorre bilinguals find?',
          options: [
            'They always described time using the words for past and future.',
            'They arranged time east to west despite turning around.',
            'They performed every navigation task more accurately than English speakers.',
            'They changed from absolute to body-centred directions when tested in English.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q30', part: 7,
          text: 'Why does the passage discuss research on grammatical gender?',
          options: [
            'To prove that grammatical gender never affects cognition.',
            'To show why an influential result requires successful independent replication.',
            'To demonstrate that English nouns also have grammatical gender.',
            'To establish that small studies are more accurate than preregistered studies.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup', id: 'r3-ynng', part: 7, qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The strong version of linguistic relativity says grammar determines what a person can think.\n32. {{32}}: Verbal interference reduced the Russian light–dark blue category effect.\n33. {{33}}: The Kuuk Thaayorre study definitively isolated language as the cause of the result.\n34. {{34}}: A preregistered grammatical-gender study reproduced the famous cross-language effect.\n35. {{35}}: Publication bias can make positive findings more visible than null results.\n36. {{36}}: The writer recommends asking about another speaker's categories rather than stereotyping a whole language.`,
          blanks: [
            { num: 31, answers: ['YES'] }, { num: 32, answers: ['YES'] }, { num: 33, answers: ['NO'] },
            { num: 34, answers: ['NO'] }, { num: 35, answers: ['YES'] }, { num: 36, answers: ['YES'] },
          ],
        },
        {
          type: 'formgroup', id: 'r3-sent', part: 7, qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Linguistic relativity is also conveniently labelled the {{37}} hypothesis.\n38. Russian uses a separate common {{38}} for lighter and darker blue.\n39. The registered grammatical-gender study failed to {{39}} the central effect.\n40. Declaring a study plan in advance is known as {{40}}.`,
          blanks: [
            { num: 37, answers: ['Sapir-Whorf'] }, { num: 38, answers: ['term'] },
            { num: 39, answers: ['replicate'] }, { num: 40, answers: ['preregistration'] },
          ],
        },
      ],
    },

    {
      part: 8, skill: 'writing', title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [{
        type: 'write', id: 'w1', part: 8, taskNumber: 1,
        imageUrl: '/assets/ielts/charts/set7-task1.svg',
        imageAlt: 'Two stacked horizontal bars comparing food, paper and card, plastic, glass and other household waste in Alderwick and Brenton in 2025',
        stimulus: 'The stacked bar charts below show the percentage composition, by collected weight, of household waste in the towns of Alderwick and Brenton in 2025.',
        text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'Some universities require every student to complete at least one course taught in a language other than the main language of instruction. To what extent do you agree or disagree with this requirement?',
        text: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
      }],
    },
    {
      part: 10, skill: 'speaking', title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak', id: 'sp1', part: 10, partNumber: 1,
          text: 'Part 1 — Personal questions about language learning',
          followUp: [
            'How many languages do you speak? How did you learn them?',
            'Do you think you are a natural language learner?',
            'What methods have you found most helpful when learning a new language?',
            'Are there any languages you would like to learn in the future? Why?',
            'When do you feel most confident speaking another language?',
            'Do you prefer learning from a teacher or studying independently?',
            'Is pronunciation important to you when you learn a language?',
            'Have online tools changed the way you practise languages?',
          ],
        },
        {
          type: 'speak', id: 'sp2', part: 10, partNumber: 2,
          text: 'Part 2 — Individual long turn (3–4 minutes). Prepare for 1 minute, then speak for 1–2 minutes.',
          cueCard: `Describe an experience you have had communicating with someone who speaks a different language from you.\n\nYou should say:\n• who the person was and where you met\n• what language or other methods you used\n• what challenge or misunderstanding arose\n• how you resolved or managed it\n\nand explain what you learned from the experience.`,
        },
        {
          type: 'speak', id: 'sp3', part: 10, partNumber: 3,
          text: 'Part 3 — Discussion: Language and global communication',
          followUp: [
            'Do you think English will continue to be the world\'s dominant language of communication?',
            'What are the consequences of having a world lingua franca for speakers of minority languages?',
            'Should governments invest more in foreign language education? Why or why not?',
            'How does losing a language affect a culture?',
            'When is translation technology helpful, and when can it create problems?',
            'Should universities teach academic subjects through a second language?',
          ],
        },
      ],
    },
  ],
};

export default mock;
