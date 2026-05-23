import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-5',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 5',
  subtitle: 'Coffee · Light Pollution · The Paradox of Choice',
  timeMinutes: 120,
  sections: [

    // ─── LISTENING — EN CONSTRUCCIÓN ─────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      comingSoon: true,
      title: 'Listening — En Construcción',
      instructions: 'Esta sección estará disponible próximamente con audio real.',
      questions: [],
    },

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: The Origins of Coffee',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Origins of Coffee

Few beverages have shaped human society as profoundly as coffee. Originating in the highlands of Ethiopia, the story of coffee's journey from a wild forest shrub to a global commodity spans more than a thousand years and touches virtually every corner of the world.

According to popular legend, coffee was discovered in the ninth century by an Ethiopian goat herder named Kaldi, who observed that his animals became unusually energetic after eating berries from a particular tree. Though this tale cannot be verified, historians agree that coffee plants were indeed growing wild in Ethiopia for centuries before humans began consuming them deliberately. The first credible evidence of coffee drinking appears in fifteenth-century Yemen, where Sufi monks brewed the berries into a drink they called qahwa to help them remain alert during long nights of prayer.

From Yemen, coffee spread rapidly across the Arab world. By the sixteenth century, coffeehouses—known as qahveh khaneh—had become central institutions in cities like Constantinople, Cairo, and Mecca. These establishments served not merely as places to consume the beverage but as vibrant hubs for intellectual exchange, political debate, and social interaction. So significant was their cultural role that they earned the epithet "schools of the wise." However, their popularity also attracted suspicion: coffee was banned in Mecca in 1511 by a local governor who feared that the stimulating beverage would encourage seditious gatherings. The ban was short-lived, but it reflected an anxiety about coffee's social power that would resurface repeatedly in later centuries.

Coffee reached Europe in the seventeenth century, initially through Venetian merchants, and quickly generated enormous interest as well as controversy. In 1674, a pamphlet titled The Women's Petition Against Coffee argued that the drink was rendering English men idle and impotent. Conversely, coffee's proponents praised it for promoting sobriety and mental clarity—virtues particularly valued in an era when ale and wine were consumed throughout the day. By 1700, London alone had more than two thousand coffeehouses, which had become inseparable from the era's intellectual and commercial life. Lloyd's of London, the famous insurance market, began as a coffeehouse frequented by merchants and maritime underwriters.

The economics of coffee production drove one of the earliest examples of global commodity trade. In the seventeenth century, the Ottoman Empire attempted to maintain a monopoly on coffee cultivation by prohibiting the export of fertile seeds. This restriction was eventually circumvented when Dutch traders smuggled living plants to Java in the 1690s, establishing the first major coffee plantation outside the Arab world. The Dutch later brought plants to South America, where conditions proved extraordinarily favourable for cultivation. By the nineteenth century, Brazil had emerged as the world's dominant coffee producer, a position it retains today.

The ecological impact of coffee's spread was considerable. In many regions, rainforest was cleared to make way for plantations, altering local biodiversity and contributing to soil erosion. Modern cultivation practices have shifted significantly: shade-grown coffee, which involves planting coffee beneath the canopy of native trees, has gained favour as an approach that preserves habitat for migratory birds and other wildlife while often improving the complexity of the bean's flavour.

Today, coffee is the second most traded commodity in the world by volume, surpassed only by petroleum. Approximately two billion cups are consumed daily, and the industry employs around 125 million people worldwide, the majority of them in developing countries. Despite this scale, serious concerns persist about equity in the supply chain: a typical coffee farmer receives only a small fraction of the retail price paid by the end consumer, a disparity that has inspired the growth of fair-trade certification schemes and direct-trade models.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Kaldi was a historical figure whose existence has been confirmed by archaeologists.\n2. {{2}}: Sufi monks in Yemen were among the first people to brew coffee as a drink.\n3. {{3}}: Qahveh khaneh in Constantinople served food as well as coffee.\n4. {{4}}: The 1511 ban on coffee in Mecca lasted for several decades.\n5. {{5}}: The Women's Petition Against Coffee was written by a medical doctor.\n6. {{6}}: Lloyd's of London has its origins in a coffeehouse.\n7. {{7}}: The Ottoman Empire successfully prevented coffee plants from leaving its territory.`,
          blanks: [
            { num: 1, answers: ['NOT GIVEN'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['NOT GIVEN'] },
            { num: 4, answers: ['FALSE'] },
            { num: 5, answers: ['NOT GIVEN'] },
            { num: 6, answers: ['TRUE'] },
            { num: 7, answers: ['FALSE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `8. Coffeehouses in the Arab world were sometimes described as "{{8}} of the wise" because of their role in intellectual life.\n9. When coffee arrived in Europe, it was initially praised for encouraging {{9}} and clear thinking.\n10. Dutch traders broke the Ottoman monopoly by smuggling {{10}} coffee plants to Java.\n11. The practice of {{11}} coffee has been promoted as an environmentally friendly cultivation method.\n12. Coffee is the world's second most traded commodity after {{12}}.\n13. Fair-trade {{13}} have been developed to address inequalities in the coffee supply chain.`,
          blanks: [
            { num: 8, answers: ['schools'] },
            { num: 9, answers: ['sobriety'] },
            { num: 10, answers: ['living'] },
            { num: 11, answers: ['shade-grown'] },
            { num: 12, answers: ['petroleum'] },
            { num: 13, answers: ['certification schemes', 'certification'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Light Pollution and Wildlife',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Light Pollution and Wildlife

A. For most of human history, darkness was an inescapable fact of life. Today, however, electric lighting has transformed the night, and the consequences for wildlife are proving far-reaching and often devastating. Light pollution—the excessive or misdirected artificial light that illuminates the night sky and surrounding landscape—now affects almost every habitat on Earth, from remote ocean shores to mountain forests. Scientists are only beginning to understand the depth of the problem.

B. Many animals rely on darkness as a fundamental cue for behaviour. Nocturnal species evolved over millions of years to exploit the opportunities offered by night: reduced competition, cooler temperatures, and safety from daytime predators. Artificial light disrupts these adaptations at a neurological level. Studies have shown that exposure to artificial light at night suppresses the production of melatonin, a hormone that regulates sleep-wake cycles in vertebrates and also plays roles in immune function, reproduction, and migration timing. Even relatively dim light can interfere with these biological processes.

C. Perhaps the most dramatic examples of light pollution's effects involve sea turtles. Female turtles have nested on the same beaches for millions of years, emerging from the sea under cover of darkness to lay their eggs in the sand. When hatchlings emerge, they orient themselves towards the brightest horizon—in natural conditions, the open sea, which reflects starlight and moonlight. On beaches adjacent to developed coastlines, however, the glow from hotels, streetlights, and parking lots draws hatchlings inland, where they become disorientated, dehydrated, and eventually die. In Florida, it is estimated that hundreds of thousands of hatchlings are lost this way each year, contributing to the threatened status of several turtle species.

D. Birds are equally vulnerable. Approximately three billion birds migrate annually across North America alone, and many make these journeys at night, navigating partly by the stars. Artificial light, particularly from illuminated buildings and communication towers, confuses their navigational systems. Birds become attracted to and trapped in lit areas, circling endlessly in a phenomenon known as "fatal light attraction." The problem is concentrated around large cities during peak migration periods: in a single night in 2020, an estimated one thousand birds were killed after colliding with a single illuminated building in Chicago. Across the continent, bird-window collisions kill between 365 million and one billion birds annually in the United States, with night lighting a significant contributing factor.

E. Insects, which form the foundation of many food webs, are acutely sensitive to artificial light. Moths and beetles are drawn irresistibly to artificial light sources in a process called positive phototaxis, and around a third of insects that approach a light source do not survive until morning. Beyond the direct mortality, light pollution disrupts insect mating, foraging, and reproduction. The pollination services provided by nocturnal insects—particularly moths—are impaired when these creatures are lured away from flowers toward lamps. Research published in 2021 found that hedgerows illuminated by streetlights had significantly fewer pollinators visiting flowers compared to unlit hedgerows, with potential knock-on effects for plant reproduction.

F. The good news is that light pollution is one of the most reversible forms of environmental harm. Unlike chemical contamination or habitat loss, the effects of artificial light cease almost immediately when the source is extinguished. Conservationists and city planners have collaborated to develop dark-sky ordinances—local regulations that require shielded lighting fixtures, restrict upward-directed light, and mandate lighting curfews in sensitive areas. Coastal communities in Florida and elsewhere have adopted turtle-friendly amber LED lights, which emit wavelengths that are less disorienting to hatchlings. Evidence suggests that these measures work: in some locations, turtle nesting success has improved markedly following the implementation of appropriate lighting protocols.

G. The International Dark-Sky Association campaigns globally for better lighting practices and designates certified dark-sky parks and communities where light pollution is strictly controlled. As of 2024, over two hundred such protected areas exist worldwide. However, the pace of progress remains slow relative to the expansion of global light pollution, which has been growing at approximately two percent per year. Greater public awareness, stronger regulation, and innovation in lighting technology will all be necessary if the night sky—and the wildlife that depends on it—is to be preserved.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of a government body that certifies areas with low light pollution', answer: 'G' },
            { num: 15, stem: 'An explanation of why hatchling sea turtles instinctively move towards light', answer: 'C' },
            { num: 16, stem: 'Details of how light affects a specific chemical produced in animals', answer: 'B' },
            { num: 17, stem: 'Statistical data on the collision deaths of migratory birds', answer: 'D' },
            { num: 18, stem: 'Evidence that reducing light pollution can rapidly benefit wildlife', answer: 'F' },
            { num: 19, stem: 'A reference to the effect of artificial light on plant reproduction', answer: 'E' },
            { num: 20, stem: 'A statement about how long animals have evolved to exploit night conditions', answer: 'B' },
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
          title: 'The Impact of Light Pollution on Wildlife',
          template: `Artificial light disrupts the production of {{21}}, a hormone that governs sleep cycles and reproduction. Sea turtles are severely affected because hatchlings are drawn towards {{22}} areas rather than the sea. In birds, the problem of {{23}} occurs when they circle lit buildings during migration. Insects are attracted to light in a process called positive {{24}}, and many do not survive. Studies show that illuminated {{25}} have fewer nocturnal pollinators than unlit ones. Despite the severity of the problem, light pollution is considered highly {{26}} because its effects stop almost immediately once lights are turned off.`,
          blanks: [
            { num: 21, answers: ['melatonin'] },
            { num: 22, answers: ['lit', 'illuminated', 'developed'] },
            { num: 23, answers: ['fatal light attraction'] },
            { num: 24, answers: ['phototaxis'] },
            { num: 25, answers: ['hedgerows'] },
            { num: 26, answers: ['reversible'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The Paradox of Choice',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Paradox of Choice

Western consumer culture has long celebrated freedom of choice as an unqualified good. The prevailing assumption is that more options lead to greater satisfaction: the more we can choose from, the better positioned we are to find exactly what we want. This assumption, however, is increasingly challenged by research in psychology and behavioural economics, which suggests that abundant choice can be not merely unhelpful but actively harmful to wellbeing.

The psychologist Barry Schwartz, in his influential 2004 book The Paradox of Choice, drew on laboratory research to argue that excessive choice generates anxiety rather than liberation. When people face too many options, they experience what Schwartz calls "decision fatigue"—a depletion of cognitive resources that impairs subsequent decision-making. A study by Iyengar and Lepper, conducted in a supermarket, found that customers who encountered a display of twenty-four varieties of jam were significantly less likely to make a purchase than those offered only six. When choice exceeded a certain threshold, it became paralysing.

Beyond indecision, over-choice produces what researchers call "anticipated regret": the foreknowledge that, whatever one chooses, alternatives will linger as what might have been. Schwartz distinguishes between two types of decision-makers: "maximisers," who feel compelled to evaluate every possible option before choosing, and "satisficers," who select the first option that meets an acceptable standard. Paradoxically, maximisers—who by definition make more thorough decisions—report lower satisfaction with their choices than satisficers, precisely because they are more keenly aware of what they sacrificed.

There is also a social dimension to the paradox. In an era of abundant choice, poor outcomes are increasingly attributed to individual failure rather than systemic constraint. If hundreds of career paths, hundreds of potential partners, and hundreds of possible lifestyles are theoretically available, then unhappiness becomes a personal indictment: you had every option, so you must have chosen wrong. This attribution of responsibility for outcomes to individual agency—rather than to structural factors such as economics or opportunity—has been linked by some researchers to rising rates of depression and anxiety in affluent societies.

Not all psychologists accept Schwartz's thesis uncritically. Subsequent research has complicated the picture. A meta-analysis by Scheibehenne, Greifeneder, and Todd in 2010, examining fifty experiments, found inconsistent evidence for the "choice overload" effect: in some studies, more choice actually enhanced satisfaction. The discrepancy may depend on context. When choosers are knowledgeable about a domain—experts selecting wine, for instance—additional options are more manageable and often welcome. Overload appears to be most damaging when options are complex, when choosers lack expertise, and when the decision has high personal stakes.

Cross-cultural comparisons reveal further nuance. Research by Iyengar and colleagues found that choice preferences differ significantly between individualist and collectivist cultures. Participants from the United States, where autonomy and self-determination are central values, expressed stronger preferences for personal choice and derived greater pleasure from having made their own selections. Participants from collectivist cultures such as Japan or India showed less preference for individual choice and, in some experiments, performed better and more happily when choices were made for them by trusted others. These findings challenge the universality of choice as a value and suggest that its psychological effects are mediated by cultural context.

The implications for policy and design are significant. Behavioural economists have proposed that "choice architecture"—the structure within which options are presented—can guide people toward better outcomes without removing freedom. Default settings, opt-out rather than opt-in arrangements, and the strategic reduction of trivial decisions (a phenomenon sometimes described as "decision minimalism") all represent attempts to preserve meaningful autonomy while reducing the cognitive burden of choice. Several governments have adopted such approaches in areas from organ donation to retirement savings, with measurable improvements in outcomes. The paradox of choice, it turns out, is not an argument against freedom but a call for more thoughtful design of the environments in which freedom is exercised.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What is the main argument presented in the first two paragraphs of the passage?',
          options: [
            'Consumer culture has always recognised the dangers of excessive choice.',
            'Research suggests that having more options can reduce rather than increase satisfaction.',
            'Psychologists agree that decision fatigue is the central problem facing consumers.',
            'Supermarket experiments have proven that fewer products lead to more sales.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'According to the passage, how do "maximisers" differ from "satisficers"?',
          options: [
            'Maximisers make decisions more quickly but are less thorough.',
            'Satisficers report higher satisfaction despite evaluating fewer options.',
            'Maximisers generally report greater happiness with their final decisions.',
            'Satisficers are more likely to experience anticipated regret.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What does the passage suggest is a social consequence of abundant choice?',
          options: [
            'People are more likely to make collaborative decisions.',
            'Unhappiness becomes attributed to individual failure rather than structural factors.',
            'Career opportunities are more equally distributed across society.',
            'People from affluent societies show lower rates of depression.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'According to the 2010 meta-analysis by Scheibehenne et al., what was found about the "choice overload" effect?',
          options: [
            'It was confirmed as a universal and consistent phenomenon.',
            'It only occurs when people choose luxury products.',
            'Its effects were inconsistent across different studies.',
            'It is more pronounced in collectivist cultures than individualist ones.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The Iyengar and Lepper jam study was conducted in a laboratory setting.\n32. {{32}}: People with expertise in a domain cope better with a large number of options.\n33. {{33}}: Schwartz's research was based entirely on studies conducted outside the United States.\n34. {{34}}: Participants from collectivist cultures sometimes performed better when choices were made by others.\n35. {{35}}: Behavioural economists have shown that restricting choice completely leads to the best outcomes.\n36. {{36}}: Organ donation rates have improved in some countries through the use of choice architecture.`,
          blanks: [
            { num: 31, answers: ['NO'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NOT GIVEN'] },
            { num: 34, answers: ['YES'] },
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
          template: `37. Decision-makers who select the first acceptable option are called {{37}}.\n38. Cross-cultural research suggests that participants from the United States place particular value on {{38}} and self-determination.\n39. The term used for reducing the number of everyday decisions is {{39}}.\n40. The passage concludes that excessive choice is not an argument against freedom but a call for more thoughtful {{40}}.`,
          blanks: [
            { num: 37, answers: ['satisficers'] },
            { num: 38, answers: ['autonomy'] },
            { num: 39, answers: ['decision minimalism'] },
            { num: 40, answers: ['design'] },
          ],
        },
      ],
    },

    // ─── WRITING ──────────────────────────────────────────────────────────────

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
          imageUrl: '/assets/ielts/charts/set5-task1.svg',
          imageAlt: 'Bar chart comparing CO₂ emissions by sector in Germany and the UK in 2000 and 2020',
          stimulus: 'The bar chart below shows CO₂ emissions (in metric tons per capita) in Germany and the United Kingdom across four sectors in 2000 and 2020.',
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
          stimulus: 'In many countries, increasing numbers of people are choosing to live alone rather than with family or a partner.',
          text: 'Is this a positive or negative development? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
          minWords: 250,
        },
      ],
    },

    // ─── SPEAKING ────────────────────────────────────────────────────────────

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
          text: 'Part 1 — Personal questions about home and daily life',
          followUp: [
            'Can you describe where you currently live?',
            'Do you prefer living in a city or in the countryside? Why?',
            'How much time do you spend at home each day?',
            'Do you like your neighbourhood? What do you like or dislike about it?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a time when you lived somewhere new or different from your usual home.\n\nYou should say:\n• where this place was\n• why you moved or stayed there\n• what your daily routine was like there\n• and explain how this experience affected you`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Living arrangements and society',
          followUp: [
            'Why do you think more people are choosing to live alone in modern societies?',
            'What are the advantages and disadvantages for society when more people live independently?',
            'Do you think governments should do anything to encourage people to live together, for example, to reduce loneliness?',
            'How might living arrangements change further in the next twenty years?',
          ],
        },
      ],
    },
  ],
};

export default mock;
