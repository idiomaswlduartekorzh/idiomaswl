import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-4',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 4',
  subtitle: 'The Origins of Agriculture · Sleep and Memory · Electric Vehicles',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-4.mp3',
      title: 'Listening — Section 1: Student Housing Inquiry',
      instructions: 'You will hear a student calling a university housing office. Listen and answer Questions 1–10.',
      transcript: `OFFICER: Good morning, Greenfield University Housing Office. How can I help you?

STUDENT: Hi, yes. I'm a new postgraduate student and I'm looking for accommodation on campus. Could you help me?

OFFICER: Of course. Can I take your name and student number?

STUDENT: Sure. My name's Paulo Ferreira — F-E-R-R-E-I-R-A — and my student number is PG 4471 dash 8.

OFFICER: Thank you, Mr Ferreira. And what faculty are you in?

STUDENT: Environmental Science.

OFFICER: Great. And are you looking for a single room or a shared flat?

STUDENT: I'd prefer a single room, but I'm happy to share a kitchen and bathroom with others.

OFFICER: That would be a cluster flat then. We have two options available from 1st September. The first is Maple Court — it's a ten-minute walk from the main campus. Each room has a desk, wardrobe, and single bed. The shared kitchen is fully equipped. The monthly rent is four hundred and twenty pounds.

STUDENT: And the second option?

OFFICER: The second is Cedar Hall — it's actually on campus, so very convenient. Monthly rent is four hundred and seventy-five pounds. The rooms are slightly larger and each has its own bathroom.

STUDENT: Oh, having my own bathroom would be great. Cedar Hall sounds more appealing.

OFFICER: Let me check availability. Cedar Hall has rooms available in both Block A and Block B. Block A faces the library and tends to be quieter. Block B is closer to the sports centre.

STUDENT: I'll be studying a lot, so quiet would suit me better. Block A please.

OFFICER: Perfect. Now, for the application, I'll need a copy of your acceptance letter, your passport, and one recent bank statement.

STUDENT: I have all of those. Can I send them by email?

OFFICER: Yes. Send them to housing@greenfield.ac.uk. Once we receive your documents, we'll confirm your room within three working days and send you a contract to sign.

STUDENT: And is there a deposit?

OFFICER: Yes. The deposit is equivalent to one month's rent. It's fully refundable at the end of your stay provided the room is left in good condition.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Student Housing Inquiry — Greenfield University',
          example: 'Student name: Paulo Ferreira',
          template: `Student number: PG 4471-{{1}}
Faculty: {{2}}

Accommodation type requested: cluster flat (single room with shared facilities)

Option A — Maple Court:
• Distance from campus: {{3}} minutes' walk
• Monthly rent: £420

Option B — Cedar Hall:
• Location: on {{4}}
• Monthly rent: £475
• Each room has its own {{5}}
• Student prefers Block A (quieter, faces the {{6}})`,
          blanks: [
            { num: 1, answers: ['8'], maxWords: 1 },
            { num: 2, answers: ['Environmental Science', 'Environmental'], maxWords: 2 },
            { num: 3, answers: ['10', 'ten'], maxWords: 1 },
            { num: 4, answers: ['campus'], maxWords: 1 },
            { num: 5, answers: ['bathroom'], maxWords: 1 },
            { num: 6, answers: ['library'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Requirement', 'Detail'],
          rows: [
            ['Documents needed', { num: 7, answers: ['acceptance letter', 'letter'], maxWords: 2 } ],
            ['Also needed', 'passport and bank statement'],
            ['Send to', { num: 8, answers: ['housing@greenfield.ac.uk', 'email'], maxWords: 1 }],
            ['Processing time', { num: 9, answers: ['three', '3'], maxWords: 1 } ],
            ['Deposit amount', { num: 10, answers: ['one month', "one month's rent"], maxWords: 3 }],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-4.mp3',
      title: 'Listening — Section 2: Natural History Museum Audio Guide',
      instructions: 'You will hear an audio guide for a natural history museum. Listen and answer Questions 11–20.',
      transcript: `Welcome to the National Natural History Museum. This audio guide will introduce you to our main galleries and help you make the most of your visit.

You are currently in the Grand Hall, our main entrance. From here, you can access all four of our permanent galleries. Please note that the café on your left is open until six o'clock, and the gift shop on your right closes at five-thirty.

Gallery One is dedicated to Earth's geological history, covering the formation of continents, volcanic activity, and earthquakes. This gallery is particularly popular with school groups. You'll find interactive panels where visitors can simulate small earthquakes and examine real rock samples dating back over three billion years.

Gallery Two focuses on evolution and biodiversity. The centrepiece is our famous blue whale skeleton, which is 26 metres in length and took two years to reassemble following restoration work. You'll also find over two thousand specimens of insects, birds, and mammals on display. Many visitors are surprised to learn that less than 10% of the world's known species are preserved here — it gives a sense of how vast the natural world truly is.

Gallery Three is our newest addition, opened just last year. It explores the relationship between humans and the environment through the centuries. Highlights include an ancient canoe discovered in a peat bog in Ireland, believed to be around 4,000 years old, and a collection of tools used by early farming communities in the Middle East.

Gallery Four is currently undergoing partial renovation, but the dinosaur fossil section remains open. Our most prized exhibit is the Tyrannosaurus rex skeleton in the far corner, which was discovered in Montana in 1987.

Finally, we offer guided tours at ten-thirty, one o'clock, and three-thirty. All tours are free and last approximately forty-five minutes. Please meet your guide at the information desk in the Grand Hall.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO features does the speaker mention about Gallery One?',
          options: [
            { letter: 'A', text: 'interactive earthquake simulation panels' },
            { letter: 'B', text: 'a display of preserved insects and birds' },
            { letter: 'C', text: 'rock samples over three billion years old' },
            { letter: 'D', text: 'a famous blue whale skeleton' },
            { letter: 'E', text: 'guided school tours only' },
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
          title: 'Museum Gallery Notes',
          template: `Gallery Two:
• Blue whale skeleton: {{13}} metres in length
• Took {{14}} years to reassemble after restoration
• Less than {{15}}% of known species on display

Gallery Three:
• Opened {{16}} year
• Features an ancient canoe from a {{17}} bog in Ireland
• Canoe estimated to be around {{18}} years old

Gallery Four:
• Partially under {{19}}
• Most prized exhibit: T-rex skeleton discovered in {{20}}`,
          blanks: [
            { num: 13, answers: ['26', 'twenty-six'], maxWords: 1 },
            { num: 14, answers: ['two', '2'], maxWords: 1 },
            { num: 15, answers: ['10', 'ten'], maxWords: 1 },
            { num: 16, answers: ['last'], maxWords: 1 },
            { num: 17, answers: ['peat'], maxWords: 1 },
            { num: 18, answers: ['4,000', '4000', 'four thousand'], maxWords: 2 },
            { num: 19, answers: ['renovation'], maxWords: 1 },
            { num: 20, answers: ['Montana'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-4.mp3',
      title: 'Listening — Section 3: Research Discussion — Social Media and Well-being',
      instructions: 'You will hear two students discussing a research project on social media and well-being. Listen and answer Questions 21–30.',
      transcript: `SOFIA: Hi, James. Did you finish reading the papers for our project on social media and well-being?

JAMES: Most of them. I thought the Valkenburg study was particularly convincing — it tracked the same group of teenagers over three years rather than just using a one-off questionnaire.

SOFIA: That's what made it stand out for me too. A longitudinal design gives you much more reliable data. Did you find the correlation between social media use and anxiety significant?

JAMES: It was statistically significant, but the effect size was quite small. I think the media has blown it out of proportion. The relationship is probably more nuanced than "more social media equals worse mental health."

SOFIA: I agree. Some studies show positive effects — like for teenagers who feel socially isolated, social media can actually improve their sense of connection and reduce loneliness.

JAMES: Right. And active use — posting, commenting, messaging — seems less harmful than passive use, like just scrolling through other people's highlights.

SOFIA: That makes sense. Passive use probably fuels social comparison more. For our literature review, should we focus on adolescents specifically or include adults?

JAMES: I think we should focus on adolescents. There's more research on that group, and the developmental stage makes it especially interesting from a psychological perspective.

SOFIA: Agreed. What about methodology for our own small study?

JAMES: I was thinking we could use a survey — it's practical given our time constraints. But we'd need to control for baseline mental health, pre-existing conditions, and offline social support.

SOFIA: What measurement tools would we use for well-being?

JAMES: The Warwick-Edinburgh scale is commonly used and well-validated. It covers both psychological and social well-being.

SOFIA: Perfect. Should we include screen time tracking data from participants' phones?

JAMES: That would be great for objective data rather than just self-reports, which tend to be unreliable — people consistently underestimate how long they spend on their phones.

SOFIA: Let's include both then. We'll ask them to share weekly screen time summaries from their phone settings.

JAMES: Good. To keep collection consistent, we'll request them every Monday. We should identify each participant with a code rather than a name, and keep all files on the university's secure server.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What makes the Valkenburg study different from others, according to James?',
          options: [
            'It used a much larger sample group.',
            'It tracked the same participants over three years.',
            'It focused exclusively on adults.',
            'It used brain imaging technology.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'What does James say about the correlation between social media use and anxiety?',
          options: [
            'It is very large and clearly significant.',
            'It does not exist in the data.',
            'It is statistically significant but the effect size is small.',
            'It only affects adults, not teenagers.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'According to Sofia, social media can benefit teenagers who:',
          options: [
            'Use it only for educational purposes.',
            'Feel socially isolated in their offline lives.',
            'Limit their use to thirty minutes per day.',
            'Share positive content with their followers.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'Which type of social media use do the students suggest is more harmful?',
          options: [
            'Active use such as posting and commenting.',
            'Passive use such as scrolling through content.',
            'Using social media for messaging only.',
            'Sharing academic content with peers.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'Why do the students choose to focus on adolescents for their literature review?',
          options: [
            'Because they are easier to recruit as research participants.',
            'Because adult studies are unavailable.',
            'Because there is more research on that age group and it is a significant developmental stage.',
            'Because social media use is much lower among adults.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l3q26',
          part: 3,
          text: 'What measurement tool do the students agree to use for well-being?',
          options: [
            'The Oxford Happiness Questionnaire.',
            'The Warwick-Edinburgh scale.',
            'Self-designed interview questions.',
            'The Beck Depression Inventory.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q27',
          part: 3,
          text: 'Why do the students want to include phone screen time data alongside self-reports?',
          options: [
            'Because self-reports are often biased and people underestimate phone use.',
            'Because screen time data is required by ethics approval.',
            'Because participants prefer not to complete questionnaires.',
            'Because it is cheaper than using psychological scales.',
          ],
          answer: 0,
        },
        {
          type: 'formgroup',
          id: 'l3-procedure',
          part: 3,
          qRange: [28, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'Study administration',
          template: `• Screen-time summaries collected every {{28}}
• Participants identified using a {{29}}, not a name
• Files stored on the university's secure {{30}}`,
          blanks: [
            { num: 28, answers: ['Monday'], maxWords: 1 },
            { num: 29, answers: ['code'], maxWords: 1 },
            { num: 30, answers: ['server'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-4.mp3',
      title: 'Listening — Section 4: Lecture on Bird Migration',
      instructions: 'You will hear a university lecture on bird migration patterns. Listen and answer Questions 31–40.',
      transcript: `Good afternoon, everyone. Today I want to talk about one of the most remarkable phenomena in the natural world: bird migration.

Each year, roughly half of all bird species on Earth undertake some form of seasonal movement — some travelling only a few hundred kilometres, others crossing entire hemispheres. But how do they do it? And why?

Let's start with the "why." Migration is fundamentally a response to seasonal changes in food availability. During summer in the northern hemisphere, insects, seeds, and fruits are abundant, and the long daylight hours allow birds to forage for long periods. But as winter approaches, food becomes scarce. Rather than staying and struggling, migrating birds travel to regions where conditions are more favourable.

Now, the "how" is even more fascinating. Birds use multiple navigational systems simultaneously. First and most importantly, many species navigate using Earth's magnetic field. Researchers have discovered that birds have magnetite crystals in their beaks — effectively biological compasses. A 2019 study confirmed that disrupting magnetic fields can disorient migrating birds even in clear conditions.

Second, birds use the position of the sun during the day and the stars at night. Young birds seem to have an innate star map — they learn the night sky during their first summer, before they have ever migrated, and use this knowledge later.

Third, birds rely on familiar landscape features — coastlines, rivers, and mountain ranges — as visual landmarks, particularly during the final stages of a journey.

Interestingly, many small songbirds migrate at night, when there is less wind turbulence and fewer predators. Larger birds like geese and swans travel during the day, often in V-formations which reduce wind resistance and conserve energy.

Climate change is now affecting migration. Many species are shifting their migration timing — arriving earlier in spring as temperatures rise. This sounds positive, but it can cause a mismatch: birds may arrive before their food sources — the insects they feed on — have become available. This is called a phenological mismatch, and it is emerging as one of the key threats to migratory bird populations worldwide.

Conservation efforts are focusing on protecting key stopover sites — the staging areas where birds rest and refuel mid-journey. Losing even one critical stopover site can have devastating effects on an entire species' population.

Thank you. We'll now move on to look at specific case studies.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-notes',
          part: 4,
          qRange: [31, 36],
          groupLabel: 'Complete the lecture notes.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Bird Migration — Lecture Notes',
          template: `How birds navigate (three methods):
1. Earth's {{31}} field — birds have magnetite crystals in their beaks (natural compasses)
   — Disrupting this field can {{32}} migrating birds
2. Position of the {{33}} (daytime) and stars (night-time)
   — Young birds learn the {{34}} sky in their first summer before migrating
3. Visual {{35}} — coastlines, rivers, mountain ranges (mainly at journey's end)

Flight timing:
• Small songbirds: migrate at {{36}} (less turbulence and fewer predators)`,
          blanks: [
            { num: 31, answers: ['magnetic'], maxWords: 1 },
            { num: 32, answers: ['disorient'], maxWords: 1 },
            { num: 33, answers: ['sun'], maxWords: 1 },
            { num: 34, answers: ['night', 'star'], maxWords: 1 },
            { num: 35, answers: ['landmarks', 'landmark'], maxWords: 1 },
            { num: 36, answers: ['night'], maxWords: 1 },
          ],
        },
        {
          type: 'mcq',
          id: 'l4q37',
          part: 4,
          text: 'Why do larger birds like geese fly in V-formations?',
          options: [
            'To stay warmer during cold weather.',
            'To reduce wind resistance and save energy.',
            'To avoid collision with smaller birds.',
            'To navigate more accurately using star maps.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l4q38',
          part: 4,
          text: 'What is a "phenological mismatch" as described in the lecture?',
          options: [
            'When birds migrate to a region with no water sources.',
            'When birds arrive at their destination before insects are available.',
            'When climate change causes birds to change their migration routes.',
            'When birds lose their magnetic navigation ability.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l4q39',
          part: 4,
          text: 'What does the lecturer say about the timing of migration due to climate change?',
          options: [
            'Most species are migrating later in the spring.',
            'Climate change has not yet affected migration timing.',
            'Many species are arriving earlier in spring as temperatures rise.',
            'Winter migration has completely stopped for several species.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'l4q40',
          part: 4,
          text: 'What do current conservation efforts focus on to protect migratory birds?',
          options: [
            'Reducing the number of migratory species through selective breeding.',
            'Building bird sanctuaries at final destinations.',
            'Eliminating predators along migration routes.',
            'Protecting key stopover sites where birds rest mid-journey.',
          ],
          answer: 3,
        },
      ],
    },

    // ─── READING ─────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading Passage 1: The Origins of Agriculture',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The shift from foraging to farming is widely regarded as the most significant transformation in human history. Approximately 10,000 years ago, in several independent locations across the globe, human societies began cultivating plants and domesticating animals rather than relying solely on hunting and gathering. This agricultural revolution, as it is commonly called, set the stage for the rise of settled civilisations, population growth, and ultimately the modern world.

For most of the 200,000-year history of anatomically modern humans, our ancestors were nomadic foragers, moving with the seasons in search of wild plants and animals. This lifestyle, often mischaracterised as primitive, was remarkably effective. Studies of modern forager societies suggest that hunter-gatherers typically worked fewer hours per day than subsistence farmers to meet their nutritional needs, and enjoyed a diverse and often highly nutritious diet. So why did people abandon this apparently successful lifestyle?

The answer is likely to be complex and context-dependent. In the Fertile Crescent — the arc of land stretching from modern-day Iraq and Syria through Jordan and Israel — domestication of wheat, barley, lentils, and other crops began around 10,500 BCE. Some archaeologists argue that climate change at the end of the last Ice Age created new environmental pressures: warming temperatures, the retreat of glaciers, and changing patterns of rainfall led to the expansion of grasslands rich in edible wild grains. This abundance may have encouraged more sedentary behaviour and experimentation with cultivation.

Others point to population pressure as the key driver. As human groups grew larger, a territory that once supported a small foraging band could no longer do so. Cultivation offered a way to produce more food from the same area of land, even if the labour involved was considerably greater.

The domestication of animals added another dimension to early agriculture. Dogs, domesticated from wolves at least 15,000 years ago, were used for herding and protection. Sheep, goats, and cattle were domesticated in the Near East between 9,000 and 7,000 BCE, providing not only meat but also milk, wool, and traction power for ploughs.

The consequences of agriculture were profound and not entirely positive. Settled communities became more vulnerable to infectious disease: living close to animals and in denser populations facilitated the spread of pathogens. Evidence from skeletal remains shows that early farmers were on average shorter, had more dental problems, and suffered from a narrower range of nutrients compared to their forager predecessors.

Nevertheless, agriculture enabled a dramatic increase in the carrying capacity of the land — the number of people it could support — and provided the surplus food that freed some individuals to specialise in crafts, trade, religion, and governance. These conditions gave rise to the first cities, written language, and complex political systems.

Today, scholars debate whether agriculture was genuinely "invented" at a single point in time, or whether it emerged gradually through a long process of environmental manipulation that is difficult to distinguish clearly from advanced foraging. What is certain is that once established, farming spread with remarkable speed, displacing or absorbing hunter-gatherer populations across most of the globe within a few thousand years.`,
      questions: [
        {
          type: 'mcq',
          id: 'r1q1',
          part: 5,
          text: 'According to the passage, studies of modern forager societies suggest that hunter-gatherers worked MORE hours per day than early farmers.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q2',
          part: 5,
          text: 'Agriculture began independently in multiple locations around the world.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r1q3',
          part: 5,
          text: 'The Fertile Crescent stretches from modern-day China through Central Asia.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q4',
          part: 5,
          text: 'Climate change at the end of the Ice Age may have encouraged experimentation with cultivation.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r1q5',
          part: 5,
          text: 'Early farmers were typically taller and healthier than their forager predecessors.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q6',
          part: 5,
          text: 'Dogs were the first animals to be domesticated, approximately 15,000 years ago.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'formgroup',
          id: 'r1-summary',
          part: 5,
          qRange: [7, 10],
          groupLabel: 'Complete the summary.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `The shift to agriculture enabled a dramatic increase in the {{7}} capacity of the land, allowing larger populations to be supported. Surplus food freed people to specialise in various roles, giving rise to the first cities and {{8}} language. However, settled communities became more {{9}} to infectious diseases because living close to animals in denser populations facilitated the spread of pathogens. Modern scholars debate whether farming was truly "invented" or emerged gradually through a long process of environmental {{10}}.`,
          blanks: [
            { num: 7, answers: ['carrying'], maxWords: 1 },
            { num: 8, answers: ['written'], maxWords: 1 },
            { num: 9, answers: ['vulnerable'], maxWords: 1 },
            { num: 10, answers: ['manipulation'], maxWords: 1 },
          ],
        },
        {
          type: 'mcq',
          id: 'r1q11',
          part: 5,
          text: 'What is the main argument of the passage?',
          options: [
            'Agriculture was clearly superior to foraging in every measurable way.',
            'The shift to agriculture was complex, significant, and had both positive and negative consequences.',
            'Foraging societies were unable to adapt to changing climates.',
            'Agriculture was invented in a single location and spread from there.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q12',
          part: 5,
          text: 'According to the passage, what role did cattle and sheep play beyond providing meat?',
          options: [
            'They were used only for religious ceremonies.',
            'They provided milk, wool, and traction power for ploughs.',
            'They were traded with neighbouring regions for tools.',
            'They were used exclusively for transportation.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r1q13',
          part: 5,
          text: 'The word "sedentary" in paragraph three most closely means:',
          options: ['Nomadic', 'Settled, staying in one place', 'Aggressive', 'Productive'],
          answer: 1,
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading Passage 2: Sleep and Memory',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `For much of the twentieth century, sleep was regarded as little more than a passive state of unconsciousness — a kind of biological standby mode. The brain, it was assumed, simply shut down and rested. The last three decades of neuroscience research have overturned this view entirely. Far from being inactive, the sleeping brain is engaged in a remarkably complex set of operations, many of which are central to learning and memory.

Memory consolidation — the process by which newly acquired information is stabilised and integrated into long-term storage — is now known to depend critically on sleep. The evidence comes from multiple directions. Behavioural studies consistently show that people who sleep after learning perform better on subsequent tests than those who remain awake. Brain imaging studies reveal that specific patterns of neural activity during sleep mirror those that occurred during initial learning, suggesting that the brain is literally replaying and reinforcing new memories.

Sleep architecture is not uniform. A full night's sleep consists of repeated cycles of different stages, broadly divided into non-rapid eye movement (NREM) sleep and rapid eye movement (REM) sleep. NREM sleep, particularly the deep slow-wave phase, appears to be especially important for consolidating declarative memories — those involving facts and events. REM sleep, which is characterised by vivid dreaming, seems to play a greater role in procedural memory (motor skills and habits) and emotional memory processing.

Research by Matthew Walker at the University of California, Berkeley, has demonstrated that sleep deprivation has dramatic effects on the brain's ability to form new memories. In one key experiment, sleep-deprived participants showed a 40% reduction in the ability to encode new information compared to those who had slept normally. This deficit was localised to the hippocampus — a structure central to memory formation — which showed significantly reduced activity in sleep-deprived individuals.

The relationship between sleep and memory is bidirectional. Not only does sleep promote memory consolidation, but learning and stress can in turn affect sleep quality. Students revising for exams often report disrupted sleep, which paradoxically undermines the very consolidation they are trying to achieve through late-night study.

There is also evidence that sleep plays a role in creative problem-solving. During REM sleep, the brain appears to form unusual associations between distantly related concepts — connections that may not be accessible during waking life. A classic demonstration is the "insight problem": people who were given a difficult mathematical task and allowed to sleep before attempting it were over twice as likely to discover the hidden rule than those who worked on it continuously while awake.

The practical implications of this research are significant. School start times, shift work patterns, and medical training programmes — all areas where sleep deprivation is common — may need to be rethought in light of evidence about the cognitive costs of inadequate sleep. A growing number of researchers argue that treating sleep as expendable is not a minor lifestyle choice, but a serious public health issue.`,
      questions: [
        {
          type: 'mcq',
          id: 'r2q14',
          part: 6,
          text: 'What was the traditional view of sleep in the twentieth century?',
          options: [
            'Sleep was considered essential for immune system function.',
            'The brain was thought to be largely inactive during sleep.',
            'Sleep was understood to play a key role in memory formation.',
            'Researchers believed dream activity drove learning.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q15',
          part: 6,
          text: 'According to the passage, which type of memory does NREM slow-wave sleep consolidate?',
          options: [
            'Procedural memory — motor skills and habits.',
            'Emotional memory — processing of fearful events.',
            'Declarative memory — facts and events.',
            'Working memory — short-term information.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r2q16',
          part: 6,
          text: 'In Walker\'s experiment, sleep-deprived participants encoded how much less new information compared to rested participants?',
          options: ['20%', '30%', '40%', '50%'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r2q17',
          part: 6,
          text: 'What does the passage say about the relationship between learning and sleep quality?',
          options: [
            'Learning always improves sleep quality by reducing anxiety.',
            'Learning and stress can disrupt sleep, which harms memory consolidation.',
            'People learn better when they sleep less because the brain is more alert.',
            'The relationship is one-directional: sleep affects learning but not vice versa.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q18',
          part: 6,
          text: 'What does the "insight problem" experiment demonstrate about sleep?',
          options: [
            'That people solve problems faster when they work continuously without breaks.',
            'That REM sleep helps the brain form unusual connections that aid creative problem-solving.',
            'That sleep deprivation has no effect on mathematical ability.',
            'That NREM sleep is more important for insight than REM sleep.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q19',
          part: 6,
          text: 'The word "bidirectional" in paragraph five means:',
          options: [
            'Working in one direction only.',
            'Operating in two directions, affecting each other mutually.',
            'Moving randomly without a clear pattern.',
            'Changing direction unpredictably.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r2q20',
          part: 6,
          text: 'Which brain region showed reduced activity in sleep-deprived participants in Walker\'s experiment?',
          options: [
            'The prefrontal cortex.',
            'The cerebellum.',
            'The hippocampus.',
            'The amygdala.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r2-summary',
          part: 6,
          qRange: [21, 26],
          groupLabel: 'Complete the summary.\nChoose ONE WORD ONLY from the passage for each answer.',
          template: `Sleep research has shown that the sleeping brain is engaged in {{21}} operations rather than resting passively. The process known as memory {{22}} depends critically on sleep, with studies showing that people who sleep after learning perform better on tests. Sleep consists of repeated cycles: NREM sleep helps consolidate {{23}} memories involving facts and events, while REM sleep — associated with vivid {{24}} — is linked to procedural memory and emotional processing. Sleep deprivation significantly reduces the brain's ability to {{25}} new information. Researchers argue that inadequate sleep should be treated as a serious {{26}} health issue.`,
          blanks: [
            { num: 21, answers: ['complex'], maxWords: 1 },
            { num: 22, answers: ['consolidation'], maxWords: 1 },
            { num: 23, answers: ['declarative'], maxWords: 1 },
            { num: 24, answers: ['dreaming'], maxWords: 1 },
            { num: 25, answers: ['encode'], maxWords: 1 },
            { num: 26, answers: ['public'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading Passage 3: The Future of Electric Vehicles',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The electric vehicle (EV) has moved rapidly from the margins of automotive technology to the centre of global transport policy. In 2023, global sales of battery electric and plug-in hybrid vehicles exceeded 14 million units — a figure that would have seemed fantastical just a decade ago. Yet despite this remarkable growth, the transition to an all-electric transport system faces substantial challenges that will define the sector for the remainder of the century.

The core case for EVs rests on their potential to decarbonise road transport, which accounts for approximately 16% of global greenhouse gas emissions. Because EVs produce no tailpipe emissions, they can significantly reduce urban air pollution. Life-cycle analyses — which account for emissions from manufacturing, electricity generation, and disposal — consistently show that EVs produce significantly fewer greenhouse gases than equivalent internal combustion engine vehicles, provided the electricity grid is not dominated by coal.

Battery technology is the central technical challenge. Lithium-ion batteries, which power most current EVs, have seen dramatic improvements in energy density and cost reduction since the early 2010s. However, they still have limitations: relatively long charging times compared to petrol refuelling, performance degradation in very cold temperatures, and concerns about the sourcing of raw materials such as lithium, cobalt, and nickel, which are subject to supply chain vulnerabilities and environmental extraction concerns.

Solid-state batteries, still largely in the research and development phase, promise to address several of these limitations. They use a solid electrolyte rather than a liquid one, which eliminates the fire risk associated with liquid electrolytes, increases energy density, and may reduce charging times to as little as ten minutes. Toyota, Samsung SDI, and several start-ups have announced plans for commercialisation in the late 2020s, though many industry analysts remain cautious about timelines.

The charging infrastructure gap remains a significant barrier to mass adoption, particularly in rural areas and developing economies. Urban consumers with access to home charging face few practical barriers, but those in apartments or without private driveways are dependent on public charging networks that, in many countries, remain insufficient. Governments in Europe, the United States, and China are investing billions in expanding charging networks, but the pace of expansion will determine whether EVs can achieve mass penetration before mid-century targets require it.

The second-life use of EV batteries is becoming an increasingly important area of research and commercial activity. When a battery degrades to roughly 70–80% of its original capacity, it is typically no longer suitable for vehicle use, but it retains considerable capacity for stationary storage applications — for example, storing energy from solar panels or providing backup power to buildings. Several automotive manufacturers have partnered with energy companies to deploy repurposed EV batteries in large-scale grid storage projects.

Critics of the EV transition point to the environmental impact of battery manufacturing and disposal. Mining lithium and cobalt is associated with habitat destruction, high water use, and in some regions, poor labour conditions. Recycling infrastructure for spent batteries is still developing, though significant progress is being made. In the European Union, new regulations require battery manufacturers to achieve minimum recycled content levels by 2030, signalling a move towards a circular economy approach.

Ultimately, the success of the electric vehicle transition will depend not only on technology and infrastructure, but on the speed of grid decarbonisation. An EV charged from a coal-powered grid produces more lifecycle emissions than a highly efficient petrol vehicle. As renewable energy expands and grids become cleaner, the environmental advantage of EVs will grow. The trajectory is clear, but the pace at which the world travels down it will determine whether the climate benefits arrive in time to matter.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3q27',
          part: 7,
          text: 'Global EV sales in 2023 exceeded 14 million units.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3q28',
          part: 7,
          text: 'Life-cycle analyses show that EVs always produce fewer emissions than petrol vehicles regardless of the energy source used.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q29',
          part: 7,
          text: 'Solid-state batteries are already in widespread commercial use in electric vehicles.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q30',
          part: 7,
          text: 'Solid-state batteries eliminate the fire risk associated with liquid electrolytes.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3q31',
          part: 7,
          text: 'Rural areas and developing economies face fewer barriers to EV adoption than urban areas.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q32',
          part: 7,
          text: 'The EU has introduced regulations requiring minimum recycled content levels for batteries by 2030.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'r3q33',
          part: 7,
          text: 'Road transport accounts for approximately what percentage of global greenhouse gas emissions?',
          options: ['8%', '12%', '16%', '24%'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3q34',
          part: 7,
          text: 'What happens to an EV battery when it degrades to 70–80% of its original capacity?',
          options: [
            'It is immediately recycled into new batteries.',
            'It can be repurposed for stationary energy storage.',
            'It must be disposed of due to fire risk.',
            'It is returned to the manufacturer for refurbishment.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3q35',
          part: 7,
          text: 'Which of the following is NOT mentioned as a limitation of current lithium-ion batteries?',
          options: [
            'Long charging times compared to petrol refuelling.',
            'Performance reduction in cold temperatures.',
            'Higher manufacturing cost than solid-state batteries.',
            'Supply chain concerns over raw material sourcing.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-summary',
          part: 7,
          qRange: [36, 40],
          groupLabel: 'Complete the summary.\nChoose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `The electric vehicle sector has grown rapidly, but the transition faces several challenges. Battery technology remains central: lithium-ion batteries have improved but still suffer from long {{36}} times and raw material concerns. Solid-state batteries promise higher {{37}} density and may reduce charging to ten minutes. The charging {{38}} gap is a major barrier, especially outside urban areas. Used EV batteries can be repurposed for {{39}} storage applications when they degrade. The long-term environmental benefit of EVs depends heavily on the pace of grid {{40}}.`,
          blanks: [
            { num: 36, answers: ['charging'], maxWords: 1 },
            { num: 37, answers: ['energy'], maxWords: 1 },
            { num: 38, answers: ['infrastructure'], maxWords: 1 },
            { num: 39, answers: ['stationary'], maxWords: 1 },
            { num: 40, answers: ['decarbonisation', 'decarbonization'], maxWords: 1 },
          ],
        },
      ],
    },

    // ─── WRITING ─────────────────────────────────────────────────────────────

    {
      part: 8,
      skill: 'writing',
      title: 'Writing Tasks',
      instructions: 'Complete both writing tasks.',
      questions: [
        {
          type: 'write',
          id: 'w1',
          part: 8,
          taskNumber: 1,
          stimulusLabel: 'The line graph below shows the consumption of 4 kinds of meat in a European country from 1979 to 2004.',
          stimulus: '',
          imageUrl: '/ielts/images/writing-set4-task1-meat.jpg',
          imageAlt: 'Line graph: consumption of chicken, beef, lamb and fish in grams per person per week, 1979–2004',
          text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
          minWords: 150,
        },
        {
          type: 'write',
          id: 'w2',
          part: 8,
          taskNumber: 2,
          stimulusLabel: 'Write about the following topic:',
          stimulus: 'The best way to solve traffic congestion in cities is to provide free public transport. To what extent do you agree or disagree?',
          text: 'Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
          minWords: 250,
        },
      ],
    },

    // ─── SPEAKING ────────────────────────────────────────────────────────────

    {
      part: 9,
      skill: 'speaking',
      title: 'Speaking Tasks',
      instructions: 'Complete all four speaking tasks.',
      questions: [
        {
          type: 'speak',
          id: 'sp1',
          part: 9,
          partNumber: 1,
          text: 'Tell me about where you grew up. What was the area like?',
          followUp: [
            'What did you like most about living there?',
            'Has that place changed much since you were a child?',
            'Would you like to live there again in the future? Why or why not?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 9,
          partNumber: 2,
          text: 'Describe a skill you have learned that has been very useful in your life.',
          cueCard: 'You should say:\n• what the skill is\n• when and how you learned it\n• why it has been useful to you\n\nAnd explain whether you would like to develop this skill further.',
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 9,
          partNumber: 3,
          text: 'Why do you think some skills are considered more valuable than others in modern society?',
          followUp: [
            'How has technology changed the skills that people need in the workplace?',
            'Some people believe that schools should focus more on practical skills rather than academic subjects. Do you agree?',
          ],
        },
        {
          type: 'speak',
          id: 'sp4',
          part: 9,
          partNumber: 3,
          text: 'What can governments do to help people develop new skills throughout their working lives?',
        },
      ],
    },

  ],
};

export default mock;
