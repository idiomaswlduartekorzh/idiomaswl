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

AGENT: Excellent choice. Before I confirm it, may I ask when guests will arrive?

CUSTOMER: The invitation says six thirty, though we won't serve food until seven fifteen.

AGENT: Then our team would arrive at five to set up. We bring hot cabinets and use the hall kitchen mainly for plating. Please make sure the caretaker unlocks the side entrance; the front steps are too narrow for our equipment.

CUSTOMER: I'll speak to him. Do you provide the tables and chairs?

AGENT: The hall does. We supply white tablecloths, plates and cutlery as part of either menu. Flowers are not included. If you want arrangements, we can recommend a florist, but you would book and pay them directly.

CUSTOMER: Fine. One guest has a serious nut allergy as well as the vegetarians I mentioned.

AGENT: I'll record that separately. We can prepare a nut-free meal, although our kitchen handles nuts, so the written confirmation will explain that we cannot guarantee a completely allergen-free environment. We need the guest's name and final dietary details seven days before the party.

CUSTOMER: Understood. What happens to leftovers?

AGENT: Food that has remained under temperature control can be boxed for you. Anything left on the buffet for more than two hours must be discarded for safety. Our staff clear the serving area, but the venue's hire agreement covers cleaning the hall itself.

CUSTOMER: And is service included in the thirty-five pounds?

AGENT: Two staff members and delivery within town are included. Because Maple Hall is local, there is no travel charge. The price excludes drinks other than tap water, so customers usually buy those themselves.

CUSTOMER: That's clear. How much is the deposit?

AGENT: Twenty percent when you accept the quotation. The remaining amount is due five working days before the event. I'll email a written confirmation and provisional quotation shortly; please check the date, guest number and spelling before paying anything.`,
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

Finally, a couple of practical points. For a full and up-to-date list of every club, please check the noticeboard outside the union office rather than relying on last year's leaflet. And do remember to bring your student card to every session, as you'll need it to sign in.

Let me add a little more about choosing well. A club marked “available” may still limit numbers for a particular trip or production. For example, the debating society can accept new members throughout term, but only six students represent the university at each competition. The chess club welcomes complete beginners; you do not need a ranking or your own board. The drama audition is not designed to exclude people with no acting experience. It helps the director allocate performance and backstage roles.

At each stall today, ask about the weekly commitment. Some groups meet for one hour, while outdoor clubs may use a whole weekend. The fifteen-pound union fee allows you to register, but a club can charge an additional amount for specialist costs. Mountaineering hires safety equipment and transport, whereas debating has no regular extra charge. Read the club page before paying because the union fee itself is not refundable after the second week.

Taster sessions are intended for trying an activity safely. You still have to reserve a place if the room is small, and you must tell the leader about any access or medical requirement. A free taster does not automatically make you a member; join only after you have attended and decided the club suits you.

For quiz night, teams contain no more than six people. You can book as a team or ask to be placed with others. The event is in the main hall rather than the student bar because ticket demand has grown. Doors open at seven, and the first round starts at seven thirty. Details of cancellations, room changes and newly opened club places will appear on the noticeboard and the union website.`,
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
            { num: 19, answers: ['noticeboard'], maxWords: 2 },
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

JAMES: We start the pilot next week.

TUTOR: Excellent. Send me the draft questions first. Avoid asking “Do you do a lot of homework?”, because “a lot” means different things to different students. Ask for hours and minutes during the previous seven days, and define whether reading and revision count.

PRIYA: Should we ask for a total or list each subject?

TUTOR: Use broad subject categories. Include zero; do not force a positive number.

JAMES: We thought of emailing everyone in Year 9 and analysing whoever replies.

TUTOR: That is convenient, but volunteers may differ from non-respondents. Ask the school to give every Year 9 student the same opportunity during tutor time. Record the response rate and describe the participants accurately. A hundred and twenty invitations do not guarantee a sample of a hundred and twenty.

PRIYA: Can we compare homework time with grades?

TUTOR: Not in this project. That would require access to personal academic records and a stronger consent process. Keep the anonymous survey focused on time, subject and perhaps whether homework was completed alone or with help. Do not collect names, email addresses or exact dates of birth.

JAMES: When we code the answers, should we remove values that look too high?

TUTOR: Never delete one simply because it surprises you. Set a transparent rule before looking at results, check whether a value could reflect exam preparation, and report any exclusion. You can present the median as well as the mean if a few high values distort the average.

PRIYA: And our conclusion?

TUTOR: Say what the data support. An anonymous survey of one year group at one school cannot establish that homework causes achievement or represent every student. Include that limitation when you present the conclusions to the class.

JAMES: Understood. We'll revise the draft today and send it before running the pilot.`,
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
            { num: 28, answers: ['patterns'], maxWords: 1 },
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

There is, however, hope. Around the world, scientists are growing young corals in underwater nurseries and replanting them on damaged reefs. Restoration can assist particular sites, but it cannot by itself remove the heat stress affecting reefs across entire ocean basins.

Scientists measure that stress relative to local conditions rather than using one global temperature. NOAA's Coral Reef Watch defines a bleaching threshold at roughly one degree Celsius above a reef's usual warmest-month average. Duration matters as well as intensity. Its “Degree Heating Week” index accumulates heat over twelve weeks: one week at two degrees above the threshold and two weeks at one degree produce the same value of two degree-weeks. At four degree-weeks, significant bleaching becomes likely; higher accumulated values increase the risk of mortality in heat-sensitive corals.

Bleaching severity also varies among species and locations. Some corals tolerate a warmer baseline, and previous exposure can influence a colony's response. This does not mean that reefs simply adapt without cost. Repeated events leave less time for growth and reproduction between disturbances, while disease, poor water quality and destructive fishing can reduce recovery capacity.

The scale of the recent event illustrates the challenge. NOAA confirmed a fourth global mass bleaching event in April 2024. Its 2026 assessment concluded that the event likely ended in mid-2025, after bleaching-level heat stress had affected about eighty-four percent of the world's reef area from early 2023. That figure describes exposure to heat stress, not the percentage of coral that died; field observations are needed to measure ecological damage.

Management therefore operates at several scales. Locally, reducing sewage, sediment and physical damage can improve resilience, and nurseries can help restore selected populations. Monitoring gives managers earlier warning and allows them to protect vulnerable sites during extreme heat. Globally, however, limiting the frequency and intensity of marine heatwaves requires reducing the greenhouse-gas emissions driving ocean warming.`,
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
            { num: 33, answers: ['colour'], maxWords: 1 },
            { num: 34, answers: ['temperature'], maxWords: 1 },
            { num: 35, answers: ['weeks', 'week'], maxWords: 1 },
            { num: 36, answers: ['white'], maxWords: 1 },
            { num: 37, answers: ['stress'], maxWords: 1 },
            { num: 38, answers: ['acidity'], maxWords: 1 },
            { num: 39, answers: ['coastlines'], maxWords: 1 },
            { num: 40, answers: ['nurseries'], maxWords: 1 },
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

Human sleep is structured in repeated cycles, commonly lasting about 80–100 minutes in adults rather than exactly ninety minutes every time. Each cycle includes stages of non-rapid eye movement (NREM) sleep and rapid eye movement (REM) sleep. The deepest NREM stage is called slow-wave sleep because of a characteristic pattern in measurements of brain activity; more of it usually occurs early in the night. REM periods generally become longer later in the night. Brain activity during REM resembles waking activity, vivid dreams are often recalled after REM, and the muscles normally lose tone. Different stages contribute to learning and restoration, so it is misleading to assign every physical function to deep sleep and every kind of memory to REM alone.

The relationship between sleep and memory consolidation is one of the most compelling findings in contemporary neuroscience. Studies show that sleep after learning can strengthen retention, while sleep before learning prepares the brain to form new memories. Researchers use the term consolidation for several processes through which a fragile memory becomes more stable and connected to prior knowledge. A common account describes dialogue between the hippocampus and cortex during sleep, but memories are not simply files moved once from one container to another. Sleep deficiency can impair attention, reaction time and judgement as well as memory formation. Comparisons with blood-alcohol levels are sometimes used to communicate performance risk, but they depend on the task and study design and should not be treated as a clinical conversion formula.

Sleep also plays a role in emotional regulation. Experimental sleep loss can alter activity in the amygdala and its interaction with prefrontal regions, while people may experience greater irritability and difficulty controlling emotion. Observational research links chronic sleep insufficiency with anxiety and depression, but association does not by itself prove that insufficient sleep caused a particular disorder. Mental-health conditions can also disrupt sleep, medication and working patterns may affect both, and the relationship can be bidirectional.

Insufficient or poor-quality sleep is associated with important health risks. Public-health guidance often recommends that most adults obtain at least seven hours regularly, but need varies with age and individual circumstances, and time in bed is not identical to restorative sleep. Ongoing deficiency is linked with obesity, type 2 diabetes, cardiovascular disease and impaired immune function. Proposed pathways include changes in appetite regulation, inflammation, glucose metabolism and blood pressure. Ghrelin and leptin are frequently discussed as hunger- and satiety-related hormones, yet appetite is controlled by a wider system and findings are not captured by a single rule that one always rises while the other always falls.

Sleep timing is governed partly by circadian rhythms, while pressure to sleep builds with time awake. Light is an important signal to the body clock, but the effect of evening devices depends on brightness, duration, content and what activity the screen replaces. Long or irregular working hours, caring duties, noise, housing conditions and sleep disorders can also reduce sleep; advice aimed only at personal discipline misses these constraints.

Public-health authorities promote sleep hygiene—the behavioural and environmental practices that support sleep. Examples include a consistent schedule, a dark and quiet room, appropriate timing of caffeine and limiting stimulating activities before bed. Such practices can help, but persistent insomnia, loud snoring or severe daytime sleepiness may require clinical assessment rather than a longer checklist. Structural measures are also studied. Later school start times can increase adolescents' opportunity to sleep, although results depend on transport, family schedules and whether bedtime also shifts. Sleep science therefore combines general evidence with careful attention to age, context, timing, duration and quality.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Sleep was historically understood to be a complex, active biological process.\n2. {{2}}: Every adult sleep cycle lasts exactly ninety minutes.\n3. {{3}}: Sleep both before and after learning can support memory processes.\n4. {{4}}: The passage treats hours awake as a precise clinical conversion to blood-alcohol concentration.\n5. {{5}}: Sleep loss can alter activity involving the amygdala.\n6. {{6}}: Spending seven hours in bed always guarantees restorative sleep.\n7. {{7}}: Personal sleep-hygiene advice addresses every cause of insufficient sleep.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] },
            { num: 5, answers: ['TRUE'] },
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
          template: `8. Adult sleep cycles commonly last about {{8}} minutes.\n9. One account of memory consolidation describes communication between the {{9}} and the cortex.\n10. Experimental sleep loss can alter activity in the {{10}}.\n11. The passage names {{11}} as one hormone associated with hunger.\n12. Pressure to sleep increases with the amount of time a person has been {{12}}.\n13. Behavioural and environmental practices intended to support sleep are called {{13}}.`,
          blanks: [
            { num: 8, answers: ['80–100'] },
            { num: 9, answers: ['hippocampus'] },
            { num: 10, answers: ['amygdala'] },
            { num: 11, answers: ['ghrelin'] },
            { num: 12, answers: ['awake'] },
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

A. Asia's settlement pattern has changed at enormous scale, but headline urbanisation rates must be read with care. Countries have historically used different definitions of “urban”, and an administrative boundary does not always match a continuous built-up area. The definition used can therefore change the reported percentage substantially. The United Nations' World Urbanization Prospects 2025 applies a harmonised Degree of Urbanization that distinguishes cities, towns and rural areas. Under that method, Eastern and South-Eastern Asia and Oceania in 2025 had about 47 percent of its population in cities, 36 percent in towns and 17 percent in rural areas. Central and Southern Asia followed a different pattern, with towns still slightly more common than cities. A single claim that half of “Asia” lives in cities can therefore hide both regional variation and classification choices.

B. The drivers are multiple and interconnected. Manufacturing and service jobs may attract workers, but migration also responds to education, family networks, land policy and uneven public investment. In China, hundreds of millions of people moved or worked away from their registered home area during the reform era. The hukou household-registration system linked access to some public services and welfare entitlements to place of registration. Reforms have eased some restrictions, especially in smaller cities, without removing every difference between residents with local registration and migrants. Government policy has therefore both enabled urban economic growth and shaped who receives its benefits; it cannot be described simply as opening or closing one migration gate.

C. Urban forms are diverse. The UN conventionally uses “megacity” for an urban agglomeration with at least ten million inhabitants, not twenty million, and population totals vary according to whether a source measures a municipality, a continuous urban area or a wider metropolitan region. Tokyo, Delhi and Shanghai are very large by any of these approaches, while rankings for other places shift with the boundary. Small and medium-sized settlements also absorb substantial growth but often receive less international attention. Comparing them requires more than population size: local revenue, land governance, housing supply and connection to regional labour markets influence their capacity to serve new residents.

D. The social consequences are profound and uneven. A city can offer higher wages, education, healthcare and wider social networks, while also imposing high rents, insecure employment and long journeys. Migrants are not a uniform group, and evidence on subjective wellbeing depends on the comparison population, legal status, gender, income and time since moving. Generalising that migrants are consistently happier than rural non-migrants would exceed that evidence. Visible inequality is nevertheless common: well-served business districts may stand near informal settlements where tenure is insecure and water, sanitation or transport is inadequate. Upgrading with residents can improve safety without destroying livelihoods; forced clearance may simply move risk elsewhere.

E. Infrastructure deficits are among the most pressing practical challenges. Population and land development may outpace systems for housing, water, sanitation, transport and electricity, but a dramatic city ranking or travel-time estimate can change with the survey method and geographic boundary. Congestion should therefore be measured consistently using travel speed, reliability, access and time, rather than one unsupported league table. Water stress has similarly varied causes: population and industrial demand interact with leakage, weak drainage, pollution, climate variability and, in some cities, excessive groundwater extraction. Networks also need maintenance; building a new pipe or railway does not guarantee an affordable and reliable service.

F. Environmental impacts extend beyond city boundaries. Expansion can consume agricultural land and habitat, while hard surfaces reduce infiltration and increase runoff unless drainage and green space are planned. Air pollution arises from transport, industry, power generation, construction, household fuels and, in some regions, seasonal burning. Density can support environmental efficiency because homes, jobs and services are closer and public transport can carry more passengers. Density alone is not sufficient: an overcrowded district without transit, trees or safe walking routes may combine low living standards with high exposure to pollution and heat.

G. Future outcomes will be shaped by repeated decisions rather than a one-time choice between “planned” and “unplanned” growth. Authorities decide where transit runs, which neighbourhoods receive drainage, how land value gains are shared and whether informal settlements are upgraded with their residents. Public investment that prioritises equitable access can connect people to services and opportunity; investment concentrated in already advantaged districts may deepen spatial exclusion. Participation matters because a technically efficient design can still displace households or make daily journeys unaffordable. The central test is not whether a city copies a famous model, but whether institutions adapt evidence to local conditions and remain accountable as those conditions change.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A warning that city population rankings depend on the boundary used', answer: 'C' },
            { num: 15, stem: 'An explanation of why one congestion league table may be unreliable', answer: 'E' },
            { num: 16, stem: 'An argument that high-density urban living can reduce carbon emissions per person', answer: 'F' },
            { num: 17, stem: 'A caution against assuming that all migrants experience urban life in the same way', answer: 'D' },
            { num: 18, stem: 'An explanation of how a registration policy affects access to urban benefits', answer: 'B' },
            { num: 19, stem: 'A reason to involve residents when infrastructure and neighbourhoods are changed', answer: 'G' },
            { num: 20, stem: 'A method that separates cities, towns and rural areas for comparison', answer: 'A' },
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
          template: `Urban statistics depend partly on the {{21}} used for an urban area. In China, the hukou system links some entitlements to a person's place of {{22}}. Urban opportunity is uneven, and residents of {{23}} settlements may lack secure tenure and basic services. {{24}} deficits involve both new construction and maintenance. Compact development can support lower-impact travel when effective {{25}} is available. The passage argues that public investment should prioritise {{26}} access rather than deepen spatial exclusion.`,
          blanks: [
            { num: 21, answers: ['definition'] },
            { num: 22, answers: ['registration'] },
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

Food security exists when all people, at all times, have physical, social and economic access to sufficient, safe and nutritious food that meets their dietary needs and preferences for an active and healthy life. It includes availability, access, use and stability over time; a national surplus does not ensure that every household can obtain a healthy diet. The 2025 edition of the UN's State of Food Security and Nutrition in the World estimated that about 673 million people experienced hunger in 2024. That global estimate was lower than in 2023, but the improvement was uneven: hunger continued to rise in most subregions of Africa and western Asia. A global total can therefore improve while particular populations become less secure. The estimate also represents chronic undernourishment, which is not identical to every measure of moderate or severe food insecurity. Definitions, uncertainty ranges and reference years matter when figures are compared.

Hunger often reflects distribution, access and poverty rather than only aggregate production. Food may be physically present in a market yet economically inaccessible after prices rise or income collapses. Conflict can block roads, displace producers and make delivery dangerous; discrimination and insecure land rights can limit who controls resources. Quality matters too. Enough staple calories do not necessarily provide a diverse diet with adequate micronutrients. Describing the problem as “the world already produces enough” is therefore only a starting point: it does not identify where food is, what is lost, whether it is nutritious or who has the purchasing power to obtain it.

Climate change is one major long-term risk among interacting pressures. Heat can reduce yields when crops exceed their tolerance during sensitive growth stages, while drought, flood, shifting pests and marine change affect farms and fisheries differently by location. The impact on food security is mediated by irrigation, crop choice, insurance, trade, storage and household income. Regions with high exposure and limited capacity to adapt face greater harm, but it is too absolute to name one threat as universally the most significant for every place and time. Conflict or a sudden price shock may dominate a household's immediate experience even while climate change raises underlying risk.

Food systems also contribute to climate change. Estimates vary with the boundary: farm production alone, agriculture plus land-use change, or the full chain including processing, refrigeration, transport, retail, cooking and waste produce different percentages. Livestock emit methane and use land and feed, but no defensible global summary makes cattle the single source of all agricultural impacts. Fertiliser releases nitrous oxide, flooded rice produces methane, land conversion releases carbon dioxide and energy is used throughout supply chains. Responses must consider nutrition, livelihoods and local production systems as well as emissions. A change that is effective for one commodity or region cannot automatically be applied everywhere.

Measurement distinguishes food loss before retail from food waste at retail, food service and household level. FAO estimated that 13.3 percent was lost globally after harvest and before retail in 2023. UNEP estimated that 1.05 billion tonnes—19 percent of food available to consumers—was wasted in 2022, including inedible parts under its method. The two figures should not be casually added as if they shared one denominator. Their causes also differ: inadequate cold storage or transport may require infrastructure, while oversized portions, confusing date labels and poor inventory practices require other interventions. Prevention saves the land, water, energy and money embodied in food, but surplus recovered safely for redistribution does not substitute for income, social protection or resilient supply.

Responses operate at multiple levels. The World Food Programme delivers emergency assistance where conflict or disaster disrupts access, while humanitarian action must avoid replacing longer-term institutions. Agricultural research can develop heat-, drought- or disease-tolerant varieties, but seed also needs suitable soil, water, extension services and farmer choice. Better forecasts and precision tools may help target inputs, yet cost, connectivity, data rights and training determine who benefits. Investment in rural roads, storage and markets can reduce loss and improve producer income. Social protection programmes can maintain purchasing power during a shock, and school meals can support nutrition and attendance. No isolated technology solves food insecurity: durable strategies combine accountable institutions, peace, climate adaptation, functioning markets, public health and measures that reach people who would otherwise be excluded.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What is the main point made about national or global food supply?',
          options: [
            'A surplus automatically gives every household access to a healthy diet.',
            'Aggregate supply alone does not show who can obtain nutritious food.',
            'The location of food matters, but household income does not.',
            'Staple calories and a nutritionally diverse diet are equivalent.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'Why does the writer avoid naming climate change as the single greatest threat everywhere?',
          options: [
            'Climate has no measurable effect on farming or fisheries.',
            'Only irrigation determines whether a household has enough food.',
            'Risks interact, and immediate threats differ by place and time.',
            'Food prices are unaffected by conflict or climate conditions.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'Why can estimates of food-system emissions differ?',
          options: [
            'Researchers use different boundaries for which activities are included.',
            'Methane is the only greenhouse gas counted in agriculture.',
            'Transport is always excluded from every food-system estimate.',
            'All commodities have identical impacts in every region.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'Which limitation of precision tools is mentioned?',
          options: [
            'They cannot use weather or farm data.',
            'Their benefits depend partly on cost, connectivity and training.',
            'They always increase fertiliser and water use.',
            'They replace the need for functioning markets.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: A decline in the global hunger estimate can occur while hunger rises in some regions.\n32. {{32}}: The effect of climate hazards on food security is influenced by income and adaptation.\n33. {{33}}: The passage states the proportion of food-system emissions produced specifically by transport.\n34. {{34}}: FAO and UNEP figures measure different stages of food loss and waste.\n35. {{35}}: A tolerant crop variety can ensure food security without any supporting services.\n36. {{36}}: The writer regards one new technology as sufficient to solve food insecurity.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NOT GIVEN'] },
            { num: 34, answers: ['YES'] },
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
          template: `37. The definition of food security includes physical, social and {{37}} access.\n38. UNEP estimated that {{38}} percent of food available to consumers was wasted in 2022.\n39. The {{39}} Programme provides emergency assistance where access is disrupted.\n40. During a shock, {{40}} programmes can help households maintain purchasing power.`,
          blanks: [
            { num: 37, answers: ['economic'] },
            { num: 38, answers: ['19'] },
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
          imageAlt: 'Two 2022 electricity-generation pie charts: the United Kingdom used gas 38.5%, wind and solar 28.9%, nuclear 14.6%, other renewables 12.8%, and coal, oil and other fuels 5.2%; Australia used coal 47%, renewables 32%, gas 19%, and oil 2%',
          stimulus: 'The two pie charts below compare the percentage shares of total domestic electricity generation supplied by different sources in the United Kingdom and Australia in 2022.',
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
          stimulus: 'Some governments require large supermarkets to offer edible unsold food to charities before the food may be discarded. Supporters say this reduces waste and helps people in need, while critics say it creates extra costs and does not address poverty itself.',
          text: 'Do the advantages of this policy outweigh the disadvantages? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
            'Did you learn to cook anything when you were a child?',
            'Is there a food that you disliked in the past but enjoy now?',
            'How often do you eat with friends or relatives?',
            'Would you like to learn how to prepare food from another country?',
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
            'Why do some neighbourhoods have much better access to fresh food than others?',
            'Should governments place more responsibility for food waste on businesses or on consumers?',
          ],
        },
      ],
    },
  ],
};

export default mock;
