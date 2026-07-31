import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-15',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 15',
  subtitle: 'The Science of Sleep · Urbanisation in Asia · Global Food Security',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-15.mp3',
      title: 'Listening — Section 1: Ordering from a Catering Firm',
      instructions: 'You will hear a telephone conversation between a customer and an agent at a catering firm. Listen and answer Questions 1–10.',
      transcript: `AGENT: Good afternoon, Greenfield Catering. How can I help you?

CUSTOMER: Hello. I'd like to arrange catering for an event I'm organising. My first name's Rebecca.

AGENT: Of course. Could I take your surname as well?

CUSTOMER: Yes, it's Hartley — that's H-A-R-T-L-E-Y.

AGENT: Thank you, Ms Hartley. And a contact number in case we need to reach you on the day?

CUSTOMER: It's 07946 218530.

AGENT: Let me read that back to you — 07946 218530.

CUSTOMER: That's exactly right.

AGENT: Now, what sort of event is it? A wedding, perhaps?

CUSTOMER: No, nothing like that. It's a retirement party for my father — he's finishing work after forty years.

AGENT: How lovely. And when is the event taking place?

CUSTOMER: It's on Saturday the fourteenth of September.

AGENT: September — got it. And roughly how many guests are you expecting?

CUSTOMER: Well, I first thought around 50, but a few people can't come now, so let's say 45.

AGENT: 45 it is. And do you have a venue booked already?

CUSTOMER: Yes, we've hired the Maple Hall on the high street.

AGENT: I know it well. Are there any special dietary requirements?

CUSTOMER: Yes — several of the guests don't eat meat, so we'll need some vegetarian options.

AGENT: No problem; we cater for that regularly. Now, let me describe our menus. Our Classic menu offers 3 dishes per person and costs £22 a head, and it includes freshly brewed coffee at the end of the meal.

CUSTOMER: That sounds reasonable. What's the other option?

AGENT: The Deluxe menu has 5 dishes and works out at £35 per person. With that one, we also provide a celebration cake, which would suit a retirement party nicely.

CUSTOMER: Oh, the cake would be perfect. I think we'll choose the Deluxe.

AGENT: Excellent choice. I'll email a written confirmation to you shortly.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Catering order',
          example: 'First name:  Rebecca',
          template: `Surname: {{1}}
Contact number: 07946 218530
Type of event: {{2}} party
Date: Saturday 14 {{3}}
Number of guests: {{4}}
Venue: the {{5}} Hall
Dietary requirement: some {{6}} options needed`,
          blanks: [
            { num: 1, answers: ['Hartley'], maxWords: 1 },
            { num: 2, answers: ['retirement'], maxWords: 1 },
            { num: 3, answers: ['September'], maxWords: 1 },
            { num: 4, answers: ['45'], maxWords: 1 },
            { num: 5, answers: ['Maple'], maxWords: 1 },
            { num: 6, answers: ['vegetarian'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Menu', 'Dishes per person', 'Price per person', 'Also includes'],
          rows: [
            [
              'Classic',
              { num: 7, answers: ['3'], maxWords: 1 },
              '£22',
              { num: 8, answers: ['coffee'], maxWords: 1 },
            ],
            [
              'Deluxe',
              '5 dishes',
              { num: 9, answers: ['35', '£35'], maxWords: 1 },
              { num: 10, answers: ['cake'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-15.mp3',
      title: 'Listening — Section 2: University Clubs Fair',
      instructions: 'You will hear a talk given at a university clubs fair. Listen and answer Questions 11–20.',
      transcript: `Good morning, everyone, and a warm welcome to this year's university clubs fair. My name's Daniel, and I'm the student union's activities officer. Over the next hour I'll take you through what's on offer and how to get involved.

We currently run more than sixty clubs, and I'll highlight a few of the most popular. The debating society is one of our largest, and I'm pleased to say it still has plenty of places available, so you can sign up today. The photography club, sadly, filled up within a week, so it's closed for now. If mountaineering appeals to you, do put your name down, but be aware there's a waiting list at the moment. The chess club, on the other hand, has spaces free and would love more beginners. And the drama society is thriving, though you'll need to attend an audition before you can join.

Now, how do you actually join? For most clubs, you simply add your name to the sheet at the registration desk, which is just behind me near the entrance. Membership isn't expensive — the annual fee used to be £20, but this year we've reduced it to £15. Once you've paid, every new member receives a free welcome pack containing a diary, a badge, and some vouchers.

If you're not sure which club suits you, don't worry. Taster sessions are completely free for the first two weeks of term, so you can try several before committing.

I should also mention our biggest social event. Each year we hold a quiz night, which is enormous fun and open to all members. This year it takes place in the main hall, and tickets go quickly, so book early.

Finally, a couple of practical points. For a full and up-to-date list of every club, please check the noticeboard outside the union office rather than relying on last year's leaflet. And do remember to bring your student card to every session, as you'll need it to sign in.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO clubs currently have places available to join immediately?',
          options: [
            { letter: 'A', text: 'the debating society' },
            { letter: 'B', text: 'the photography club' },
            { letter: 'C', text: 'the mountaineering club' },
            { letter: 'D', text: 'the chess club' },
            { letter: 'E', text: 'the drama society' },
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
          title: 'University clubs fair',
          template: `Joining a club
• Add your name to the sheet at the {{13}} desk.
• The annual membership fee is now £{{14}}.
• Every new member is given a free {{15}}.

Trying clubs out
• Taster sessions are free for the first {{16}}.

Social events
• The main social event of the year is the {{17}}.
• This year it is held in the {{18}}.

Practical points
• Check the {{19}} for a full list of clubs.
• Bring your {{20}} to every session.`,
          blanks: [
            { num: 13, answers: ['registration'], maxWords: 2 },
            { num: 14, answers: ['15', '£15'], maxWords: 2 },
            { num: 15, answers: ['welcome pack', 'pack'], maxWords: 2 },
            { num: 16, answers: ['two weeks', '2 weeks'], maxWords: 2 },
            { num: 17, answers: ['quiz night'], maxWords: 2 },
            { num: 18, answers: ['main hall', 'hall'], maxWords: 2 },
            { num: 19, answers: ['noticeboard', 'notice board'], maxWords: 2 },
            { num: 20, answers: ['student card', 'card'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-15.mp3',
      title: 'Listening — Section 3: Education Survey Design',
      instructions: 'You will hear a tutor and two students discussing the design of an education survey. Listen and answer Questions 21–30.',
      transcript: `TUTOR: So, James, Priya — let's talk about the education survey you're designing. Remind me what you're hoping to find out.

PRIYA: Well, originally we wanted to compare different teaching methods, but that felt too broad. So we've narrowed it down to finding out how much time students spend on homework each week.

TUTOR: That's a much more manageable focus. And who are you planning to survey?

JAMES: We considered surveying the whole school, but that's over a thousand students. So we've decided to concentrate on Year 9 only — that's a single year group of about a hundred and twenty.

TUTOR: Sensible. A focused sample is easier to analyse. Now, how will you actually collect the data? Paper questionnaires?

PRIYA: We debated that. Paper is simple, but entering all the responses by hand would take ages. So we're going to use an online form instead — the results come in already digitised.

TUTOR: Good thinking. What worries you most about the design?

JAMES: Honestly, our biggest concern is that students might exaggerate. When you ask people about homework, they tend to overstate how much they do, so the figures may not be reliable.

TUTOR: That's a very real risk with self-reported data. One way to reduce it is to keep the questionnaire anonymous, so students feel no pressure to impress. I'd strongly recommend that.

PRIYA: We hadn't thought of making it anonymous. That's a great idea.

TUTOR: Now, let me suggest a clear process. First, before you send it to everyone, run a small pilot with just a few students to check the questions make sense. Second, once you've collected the responses, you'll need to code the data so it can be analysed statistically. Then look for patterns — for instance, whether older students report more homework. After that, write up your findings, and finally, present your conclusions to the class.

JAMES: That's really helpful. We'll start with the pilot next week.

TUTOR: Excellent. Send me the draft questions first.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'The students have decided that the aim of their survey is to find out',
          options: [
            'how different teaching methods compare',
            'how much time students spend on homework',
            'which subjects students find most difficult',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'They have decided to survey',
          options: [
            'the whole school',
            'Year 9 only',
            'a mixture of year groups',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'They will collect the data using',
          options: [
            'paper questionnaires',
            'face-to-face interviews',
            'an online form',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: "James's main concern about the design is that students may",
          options: [
            'exaggerate how much homework they do',
            'refuse to take part',
            'misunderstand the questions',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'The tutor recommends that the questionnaire should be',
          options: [
            'short',
            'anonymous',
            'completed in class',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `Steps in the survey process
• First, run a small {{26}} with a few students.
• Then {{27}} the data so it can be analysed statistically.
• Look for {{28}} in the responses.
• Write up the {{29}}.
• Finally, {{30}} the conclusions to the class.`,
          blanks: [
            { num: 26, answers: ['pilot'], maxWords: 1 },
            { num: 27, answers: ['code'], maxWords: 1 },
            { num: 28, answers: ['patterns', 'pattern'], maxWords: 1 },
            { num: 29, answers: ['findings'], maxWords: 1 },
            { num: 30, answers: ['present'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-15.mp3',
      title: 'Listening — Section 4: Coral Bleaching',
      instructions: 'You will hear a lecture about coral bleaching. Listen and answer Questions 31–40.',
      transcript: `Today I'd like to talk about one of the most striking phenomena in marine biology: coral bleaching. To understand it, we first need to understand what coral actually is.

Although a coral reef looks like rock, it is in fact built by colonies of tiny animals called polyps. Each polyp secretes a hard skeleton of calcium carbonate, and over thousands of years these skeletons accumulate to form the vast structures we call reefs.

What makes coral so remarkable is a partnership. Living inside the tissues of each polyp are microscopic algae. Through photosynthesis, these algae provide the coral with food — in fact, up to ninety percent of the coral's energy comes from them. In return, the coral offers the algae shelter. The algae also give the coral its brilliant colour; the reds, greens and browns we associate with healthy reefs come almost entirely from them.

So what is bleaching? Bleaching occurs when the coral becomes stressed and expels the algae living within it. The most common trigger is a rise in sea temperature. Corals are surprisingly sensitive: an increase of just one or two degrees, if it persists for several weeks, is enough to break down the partnership. When the algae are gone, the coral loses its colour and turns a ghostly white — hence the term "bleaching".

It's important to understand that a bleached coral is not yet dead. It is simply under severe stress, and if conditions improve quickly, the algae can return and the coral may recover. But if the stress continues, the coral will starve and die.

Warming water is not the only threat. Pollution from the land, and the rising acidity of the ocean as it absorbs carbon dioxide, both weaken corals further. This matters because reefs support a quarter of all marine species and protect vulnerable coastlines from storms and erosion.

There is, however, hope. Around the world, scientists are now growing young corals in underwater nurseries and replanting them on damaged reefs.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'CORAL BLEACHING',
          template: `What coral is
• A reef is built by colonies of tiny animals called {{31}}.
• Microscopic algae inside each polyp provide the coral with {{32}}.
• The algae also give the coral its bright {{33}}.

What bleaching is
• Bleaching is usually triggered by a rise in sea {{34}}.
• An increase of one or two degrees lasting several {{35}} can cause it.
• Without the algae, the coral turns {{36}}.
• A bleached coral is not dead but is under severe {{37}}.

Other threats and importance
• Pollution and the rising {{38}} of the ocean also harm corals.
• Reefs protect vulnerable {{39}} from storms and erosion.

Solutions
• Scientists grow young corals in underwater {{40}} and replant them.`,
          blanks: [
            { num: 31, answers: ['polyps', 'polyp'], maxWords: 1 },
            { num: 32, answers: ['food'], maxWords: 1 },
            { num: 33, answers: ['colour', 'color'], maxWords: 1 },
            { num: 34, answers: ['temperature'], maxWords: 1 },
            { num: 35, answers: ['weeks', 'week'], maxWords: 1 },
            { num: 36, answers: ['white'], maxWords: 1 },
            { num: 37, answers: ['stress'], maxWords: 1 },
            { num: 38, answers: ['acidity'], maxWords: 1 },
            { num: 39, answers: ['coastlines', 'coastline'], maxWords: 1 },
            { num: 40, answers: ['nurseries', 'nursery'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Science of Sleep',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Science of Sleep

For much of human history, sleep was regarded as a passive state—a nightly suspension of consciousness in which the body rested and the mind went quiet. Modern neuroscience has fundamentally revised this view. Sleep is now understood to be an active, highly organised biological process essential for physical restoration, emotional regulation, memory consolidation, and immune function. The consequences of insufficient sleep extend far beyond daytime drowsiness, touching virtually every organ system and significantly increasing the risk of a range of serious conditions.

Human sleep is structured in repeated cycles lasting approximately ninety minutes, each comprising distinct stages. The lighter stages of non-rapid eye movement (NREM) sleep are followed by deeper slow-wave sleep, during which the brain emits characteristic low-frequency electrical rhythms. This is the period most important for physical restoration: growth hormone is released, tissues are repaired, and the immune system is reinforced. This deep sleep is followed by rapid eye movement (REM) sleep, during which the brain is nearly as active as when awake. REM sleep is the stage most closely associated with dreaming and plays a crucial role in emotional processing and the consolidation of procedural and emotional memories.

The relationship between sleep and memory consolidation is one of the most compelling findings in contemporary neuroscience. Studies have demonstrated that sleep after learning significantly improves the retention of new information compared with an equivalent period of wakefulness. During sleep, the brain appears to replay and strengthen newly acquired information, transferring it from short-term storage in the hippocampus to more stable long-term storage in the cortex. Conversely, sleep deprivation severely impairs the ability to form new memories: after approximately seventeen hours without sleep, cognitive performance declines to a level equivalent to a blood alcohol concentration of 0.05 percent—above the legal driving limit in many countries.

Sleep also plays a central role in emotional regulation. The amygdala—the brain region most involved in processing emotional reactions—becomes significantly more reactive during sleep deprivation, while prefrontal modulation of these reactions is impaired. This combination produces heightened emotional sensitivity, reduced impulse control, and an impaired ability to regulate negative affect. Longitudinal research has established strong links between chronic sleep insufficiency and the development of anxiety disorders and depression, though the direction of causation is complex: mental health conditions also commonly disrupt sleep, creating a bidirectional relationship.

The health consequences of insufficient sleep are broad and well established. Chronic sleep restriction—defined as regularly obtaining fewer than seven hours per night—is associated with significantly elevated risks of obesity, type 2 diabetes, cardiovascular disease, and certain cancers. A large meta-analysis published in 2010 found that sleeping fewer than six hours per night was associated with a forty-eight percent increase in the risk of developing or dying from coronary heart disease. The mechanisms include dysregulation of appetite hormones—with sleep loss increasing ghrelin, the hunger hormone, and reducing leptin, the satiety hormone—elevated inflammatory markers, impaired glucose metabolism, and increased blood pressure.

Contemporary society is characterised by what some researchers describe as a "sleep epidemic": widespread, chronic sleep insufficiency driven by long working hours, evening exposure to blue-spectrum light from screens, social and entertainment demands, and cultural attitudes that equate sleep reduction with productivity and ambition. Public health authorities have increasingly responded by promoting sleep hygiene—the set of behavioural practices known to support good sleep, including maintaining consistent sleep and wake times, limiting caffeine and alcohol, creating a dark and cool sleeping environment, and avoiding screens in the hour before bed. Researchers and some policymakers have also called for structural changes, including delayed school start times, which have been shown in several studies to improve academic performance, mental health, and safety among adolescents.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Sleep was historically understood to be a complex, active biological process.\n2. {{2}}: Growth hormone is released primarily during REM sleep.\n3. {{3}}: Studies show that sleeping after learning improves retention of new information.\n4. {{4}}: Seventeen hours without sleep produces cognitive impairment comparable to being over the legal alcohol limit in many countries.\n5. {{5}}: The amygdala becomes less reactive when a person is sleep deprived.\n6. {{6}}: Sleeping fewer than six hours per night is linked to a significantly higher risk of coronary heart disease.\n7. {{7}}: Delayed school start times have been shown to improve academic performance and mental health in adolescents.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['FALSE'] },
            { num: 6, answers: ['TRUE'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. Each sleep cycle lasts approximately {{8}} minutes and includes both NREM and REM stages.\n9. During deep sleep, newly acquired information is moved from the {{9}} to more stable long-term storage in the cortex.\n10. Sleep deprivation makes the brain's {{10}} region more reactive to emotional stimuli.\n11. Sleep loss disrupts appetite hormones by increasing {{11}}, the hunger hormone, and reducing leptin.\n12. Widespread chronic sleep insufficiency in modern society has been described by some researchers as a sleep {{12}}.\n13. The set of behavioural practices that support healthy sleep is collectively referred to as {{13}}.`,
          blanks: [
            { num: 8, answers: ['ninety'] },
            { num: 9, answers: ['hippocampus'] },
            { num: 10, answers: ['amygdala'] },
            { num: 11, answers: ['ghrelin'] },
            { num: 12, answers: ['epidemic'] },
            { num: 13, answers: ['sleep hygiene'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Urbanisation in Asia',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Urbanisation in Asia

A. Asia is undergoing the largest and fastest wave of urbanisation in human history. In 1950, fewer than twenty percent of Asians lived in cities. By 2020, that figure had risen to approximately fifty percent, and projections suggest it will exceed sixty percent by 2050—representing the movement of hundreds of millions of people from rural to urban environments within a single century. This transformation is reshaping the physical landscape, the economic geography, and the social fabric of the world's most populous continent.

B. The drivers of Asian urbanisation are multiple and interconnected. Economic development creates manufacturing and service sector jobs concentrated in cities, drawing workers from low-productivity agricultural areas. China's spectacular economic growth between 1980 and 2010 was inseparable from the movement of an estimated 280 million rural workers to urban centres—the largest peacetime migration in history. Government policy has also played a direct role in shaping urbanisation: China's "hukou" system, which historically tied social benefits to place of registration, has been progressively reformed to facilitate rural-to-urban migration, while large-scale infrastructure investment has opened previously remote areas to urban economic integration.

C. Asia's urbanisation has generated a remarkable diversity of urban forms. At one end of the spectrum are the global megacities—Tokyo, Shanghai, Delhi, Mumbai, Jakarta—whose populations exceed twenty million and whose economic gravity shapes regional and sometimes global markets. At the other end are the thousands of small and medium-sized cities that are absorbing the majority of new urban migrants, often with limited infrastructure, weak municipal governance, and uncertain economic bases. Between these extremes, a number of Asian cities—Singapore, Seoul, and Shenzhen among them—have achieved rapid and relatively well-managed transitions to high-income status, providing models of urban development that other cities seek to emulate.

D. The social consequences of rapid urbanisation are profound and uneven. For many migrants, the city offers genuine economic opportunity: higher wages, access to better healthcare and education, and the freedom to construct identities independent of traditional community constraints. Studies across Asia consistently find that urban migrants, despite often living in substandard housing and working in the informal economy, report higher subjective wellbeing and life satisfaction than comparable non-migrants in rural areas. Yet the gains are unevenly distributed, and urban areas in many Asian countries are characterised by stark inequalities: the gleaming towers of central business districts coexist with dense informal settlements in which basic services are absent or precarious.

E. Infrastructure deficits are among the most pressing practical challenges. Rapid population growth outpaces the capacity of city administrations to provide housing, water, sanitation, transportation, and electricity. In the densely populated megacities of South and Southeast Asia, traffic congestion has reached crisis levels: a 2023 study estimated that commuters in Manila spend an average of ninety-eight minutes per day in traffic—one of the highest figures in the world—resulting in significant productivity losses and air quality damage. Water stress is acute in many cities, driven by rapid population growth, industrial demand, and in some cases aquifer depletion caused by excessive groundwater extraction.

F. Environmental impacts extend beyond cities themselves. Urban expansion consumes agricultural land and natural habitats; the rapid hardening of formerly permeable land surfaces disrupts hydrological systems and increases flooding risk. Air pollution in Asian megacities is among the worst in the world, driven by vehicle emissions, industrial activity, and in some regions the burning of agricultural waste. However, dense urban living also offers environmental efficiencies: compact cities with effective public transport systems can achieve significantly lower per-capita carbon emissions than sprawling, car-dependent equivalents.

G. The future of Asian urbanisation will be shaped by decisions made in the coming decade. Whether cities grow in planned or unplanned ways, whether informal settlements are upgraded or demolished, and whether public investment prioritises equitable access to services or concentrates benefits in already-advantaged areas will determine whether urbanisation continues to be a vehicle of broad-based development or primarily generates inequality and environmental stress. The scale and pace of Asia's urban transition leaves little room for experimentation: the decisions made now will define the continent's cities for generations.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A comparison of very large Asian cities with those that have achieved orderly growth', answer: 'C' },
            { num: 15, stem: 'Statistical data on the time Asian city residents spend in daily traffic', answer: 'E' },
            { num: 16, stem: 'An argument that high-density urban living can reduce carbon emissions per person', answer: 'F' },
            { num: 17, stem: 'Evidence that migrants often report greater satisfaction with life than rural non-migrants', answer: 'D' },
            { num: 18, stem: 'An explanation of how Chinese government policy shaped rural-to-urban movement', answer: 'B' },
            { num: 19, stem: 'A description of the long-term consequences of current urbanisation decisions', answer: 'G' },
            { num: 20, stem: 'Statistics about the proportion of Asians living in cities in 1950 compared with today', answer: 'A' },
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
          title: 'Urbanisation in Asia: Opportunities and Challenges',
          template: `Between 1950 and 2020, the share of Asians living in cities rose from twenty percent to approximately {{21}} percent. China's economic growth was closely tied to the migration of an estimated 280 million workers, making it the largest {{22}} migration in history. While cities offer higher wages and better services, large inequalities exist, with towers in central districts often adjoining {{23}} settlements where basic services are lacking. {{24}} deficits remain a pressing challenge as populations grow faster than city governments can provide services. Despite environmental costs such as air pollution, compact cities with good {{25}} can achieve lower carbon emissions per capita. Future outcomes will depend on whether investment prioritises {{26}} access to services for all urban residents.`,
          blanks: [
            { num: 21, answers: ['fifty'] },
            { num: 22, answers: ['peacetime'] },
            { num: 23, answers: ['informal'] },
            { num: 24, answers: ['infrastructure'] },
            { num: 25, answers: ['public transport'] },
            { num: 26, answers: ['equitable'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Global Food Security',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Global Food Security

Food security is defined by the United Nations as a condition in which all people, at all times, have physical, social, and economic access to sufficient, safe, and nutritious food that meets their dietary needs and food preferences for an active and healthy life. Despite the fact that global food production today generates more than enough calories to feed the entire world's population, approximately 733 million people were estimated to be chronically undernourished in 2023—a figure that has risen since the disruptions of the COVID-19 pandemic and intensified by ongoing conflicts and climate shocks.

The apparent paradox of hunger in a food-abundant world reflects the fact that food insecurity is primarily a problem of distribution, access, and poverty rather than of absolute production capacity. Food is produced in surplus in some regions of the world while being critically scarce in others; within countries, access to adequate nutrition is powerfully shaped by income, geography, gender, and political marginalisation. A subsistence farmer in sub-Saharan Africa who loses a harvest to drought may live within a hundred kilometres of a warehouse full of food that is economically inaccessible to her.

Climate change represents the most significant long-term threat to global food security. Rising temperatures reduce crop yields for staple grains including wheat, maize, and rice when they exceed optimal growth thresholds—an effect projected to worsen as warming continues. More frequent and intense droughts, floods, and extreme weather events disrupt agricultural systems and increase year-to-year variability in production, making it harder for farmers and food systems to plan and absorb shocks. Regions already vulnerable to food insecurity—particularly sub-Saharan Africa and South Asia—face the greatest agricultural impacts from climate change, compounding existing inequalities.

The food system's contribution to climate change creates a further tension. Agriculture is responsible for approximately twenty-three percent of global greenhouse gas emissions, with livestock—particularly cattle—being the largest single source due to methane production, land use change, and the energy demands of feed production. This creates a dilemma: feeding a growing global population requires maintaining or increasing agricultural production, yet doing so sustainably requires significantly reducing the emissions intensity of food systems. Diets high in animal products are both the most resource-intensive to produce and the most prevalent in high-income countries, making dietary change a politically sensitive but ecologically important frontier.

Food waste adds another dimension to the problem. Approximately one third of all food produced globally is lost or wasted at various points along the supply chain—from post-harvest losses during storage and transport in lower-income countries to consumer waste in higher-income ones. This wasted food represents not only a humanitarian failure—given the scale of hunger—but also a substantial and avoidable source of greenhouse gas emissions, as organic matter decomposes in landfills. Reducing food waste by even a modest amount could meaningfully improve the balance between supply and demand without requiring additional land or inputs.

Responses to food insecurity operate at multiple levels. At the international level, the World Food Programme delivers emergency food assistance in crisis zones. Agricultural research—particularly the development of drought-resistant, heat-tolerant crop varieties—offers a technical pathway to maintaining yields under changing climatic conditions. Digital technologies, including precision agriculture tools that optimise the use of water, fertiliser, and pesticides, are increasingly accessible to farmers in lower-income countries through mobile platforms. At the policy level, investment in rural infrastructure, access to credit and markets for smallholder farmers, and social protection programmes that maintain purchasing power among the most vulnerable are all considered essential components of sustainable food security strategies.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What does the passage identify as the primary cause of food insecurity globally?',
          options: [
            'The world does not produce enough food to feed its total population.',
            'Problems of distribution, access, and poverty rather than total production capacity.',
            'Climate change has already reduced global food production below safe levels.',
            'Population growth is outpacing all efforts to increase agricultural output.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'According to the passage, which regions face the greatest agricultural impacts from climate change?',
          options: [
            'North America and Europe, where industrial farming systems are most vulnerable.',
            'East Asia and Australia, where high temperatures already reduce yields significantly.',
            'Sub-Saharan Africa and South Asia, which are already vulnerable to food insecurity.',
            'South America and Southeast Asia, due to intense rainfall and flooding.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What does the passage say about the relationship between food systems and climate change?',
          options: [
            'Agriculture is the sole driver of greenhouse gas emissions globally.',
            'Only livestock farming creates a significant carbon footprint.',
            'Feeding the global population and reducing agricultural emissions is a genuine dilemma.',
            'High-income countries have successfully decarbonised their food systems.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'Which of the following is mentioned as an approach to improving food security in lower-income countries?',
          options: [
            'Encouraging consumers in high-income countries to stop eating animal products.',
            'Reducing landfill capacity to prevent the disposal of wasted food.',
            'Mobile platforms giving farmers access to precision agriculture tools.',
            'Relocating food production from vulnerable regions to stable ones.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The writer argues that food insecurity is primarily a distribution and access problem rather than a production problem.\n32. {{32}}: Rising temperatures are projected to reduce yields of wheat, maize, and rice as warming continues.\n33. {{33}}: The passage claims that livestock produce more greenhouse gases than the entire transport sector.\n34. {{34}}: Approximately one third of all food produced globally is lost or wasted before it is consumed.\n35. {{35}}: The development of drought-resistant crop varieties is presented as one technical solution to food insecurity.\n36. {{36}}: The passage argues that dietary change is a straightforward policy solution that most governments have already implemented.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NOT GIVEN'] },
            { num: 34, answers: ['YES'] },
            { num: 35, answers: ['YES'] },
            { num: 36, answers: ['NO'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r3-sent',
          part: 7,
          qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. The UN definition of food security includes physical, social, and {{37}} access to sufficient food.\n38. The most significant long-term threat to global food security identified in the passage is {{38}}.\n39. The {{39}} Programme delivers emergency food assistance in areas affected by crisis.\n40. {{40}} programmes that protect purchasing power among the poor are described as an essential part of food security strategies.`,
          blanks: [
            { num: 37, answers: ['economic'] },
            { num: 38, answers: ['climate change'] },
            { num: 39, answers: ['World Food'] },
            { num: 40, answers: ['social protection'] },
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
          imageUrl: '/assets/ielts/charts/set15-task1.svg',
          imageAlt: 'Two pie charts comparing sources of electricity generation in the UK and Australia in 2022',
          stimulus: 'The two pie charts below show the sources of electricity generation in the United Kingdom and Australia in 2022.',
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
          stimulus: 'Hunger and malnutrition remain serious global problems despite the fact that the world produces more than enough food for everyone.',
          text: 'Why does this problem persist, and what can be done to address it? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about food and eating habits',
          followUp: [
            'What kinds of food do you most enjoy eating?',
            'Do you cook at home often, or do you prefer eating out? Why?',
            'Have your eating habits changed at all in recent years?',
            'Do you think people in your country eat healthily overall?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a city or place you have visited that made a strong impression on you.\n\nYou should say:\n• where this place was and when you visited\n• what you did there\n• what was special or striking about it\n• and explain why it made such a strong impression on you`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Urban life and global food challenges',
          followUp: [
            'What do you think are the biggest challenges facing cities that are growing very rapidly?',
            'Do you think urban farming or growing food in cities could help address food security issues?',
            'To what extent do you think individuals have a responsibility to change their diet for environmental reasons?',
            'What role should international organisations play in tackling global hunger?',
          ],
        },
      ],
    },
  ],
};

export default mock;
