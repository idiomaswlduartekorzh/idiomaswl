import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-6',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 6',
  subtitle: 'Paper · Rewilding Europe · The Gig Economy',
  timeMinutes: 120,
  sections: [
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
      title: 'Reading — Passage 1: The History of Paper',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The History of Paper

Paper is so fundamental to modern civilisation that it is easy to forget how relatively recent its invention is and how dramatically it transformed the world. Before paper, civilisations stored and transmitted knowledge on materials that were expensive, heavy, and difficult to produce: clay tablets in Mesopotamia, papyrus along the Nile, and silk or bamboo strips in ancient China. Each of these materials limited the spread of literacy and knowledge to small elites.

The invention of paper is attributed to Cai Lun, a court official in the Han Dynasty of China, around 105 CE. Cai Lun developed a technique for creating sheets from macerated plant fibres—including bark, hemp, rags, and fishing nets—suspended in water, drained through a mesh screen, and dried. This process produced a material that was lighter, cheaper, and more versatile than any existing writing surface. Although archaeological evidence suggests that earlier, cruder forms of paper existed in China before Cai Lun, his refinement of the technique is credited with making paper practical for widespread use.

For several centuries, the Chinese guarded the papermaking process with great secrecy, recognising its strategic and commercial value. However, following the Battle of Talas in 751 CE—a conflict between the Tang Dynasty and the Abbasid Caliphate—Chinese prisoners of war reportedly shared papermaking knowledge with their captors. The Abbasid court at Baghdad quickly established paper mills, and the technology spread westward with remarkable speed. By the tenth century, Egypt had largely abandoned papyrus in favour of paper; by the twelfth century, the craft had reached Europe through Islamic Spain.

In Europe, paper initially coexisted with parchment—made from animal skin—which remained preferred for important documents because of its durability. The pivotal moment came with Johannes Gutenberg's invention of the movable-type printing press around 1440. The printing press demanded paper in quantities that parchment could never supply, and the two technologies together created a self-reinforcing revolution. Books that had previously taken months to copy by hand could now be produced in days. The cost of books dropped dramatically, literacy rates climbed, and the rapid dissemination of ideas enabled by cheap printing has been credited with accelerating the Protestant Reformation, the Scientific Revolution, and the Enlightenment.

Modern paper production bears little resemblance to its ancient origins. The industrial revolution introduced mechanised papermaking in the early nineteenth century, and wood pulp—derived from trees—replaced rags as the primary raw material. Today, global paper production exceeds 400 million tonnes per year, with the industry consuming approximately four billion trees annually. Environmental concerns have shaped the sector profoundly: deforestation, water pollution from pulp mills, and the energy intensity of production have all come under scrutiny. In response, many manufacturers have adopted closed-loop water recycling systems, sourced timber from certified sustainable forests, and expanded the use of recycled fibre, which now accounts for more than half of paper production in developed countries.

Despite predictions that digital technology would render paper obsolete—the so-called "paperless office" of the 1970s and 1980s—global paper consumption continued to rise until the mid-2010s, when it began to plateau and then slowly decline in certain categories. Office paper use has fallen significantly, but packaging paper and cardboard have surged alongside the growth of e-commerce. Paper, it seems, remains as adaptable as ever, finding new roles even as old ones disappear.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Before paper, writing materials were generally expensive and difficult to make.\n2. {{2}}: Archaeological evidence confirms that Cai Lun was the sole inventor of paper.\n3. {{3}}: Chinese authorities deliberately prevented papermaking knowledge from leaving the country.\n4. {{4}}: The Battle of Talas resulted in a Chinese military victory.\n5. {{5}}: Parchment was considered more durable than paper in medieval Europe.\n6. {{6}}: The movable-type printing press reduced the cost of producing books.\n7. {{7}}: Recycled fibre now accounts for over fifty percent of paper production in developed countries.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['NOT GIVEN'] },
            { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['TRUE'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-table',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the table below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          title: 'History of Paper — Key Events',
          template: `8. 105 CE — Cai Lun's paper: Paper made from macerated {{8}} and other materials.\n9. 751 CE — Battle of Talas: Knowledge passed to the {{9}} court at Baghdad.\n10. ~1440 — Gutenberg's press: Created demand for paper that {{10}} could not supply.\n11. 19th century: {{11}} replaced rags as the primary raw material.\n12. Modern era — Environmental response: Adoption of {{12}} recycling in mills.\n13. Mid-2010s to present: {{13}} demand surged due to e-commerce growth.`,
          blanks: [
            { num: 8,  answers: ['plant fibres'] },
            { num: 9,  answers: ['Abbasid', 'Abbasid Caliphate'] },
            { num: 10, answers: ['parchment'] },
            { num: 11, answers: ['Wood pulp'] },
            { num: 12, answers: ['closed-loop', 'closed-loop water'] },
            { num: 13, answers: ['Packaging', 'Packaging paper'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Rewilding Europe',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Rewilding Europe

A. Across the continent of Europe, a quiet revolution in conservation is under way. For much of the twentieth century, the dominant approach to protecting nature involved designating reserves, managing habitats carefully, and excluding or strictly controlling human activity. This model has produced important results, but ecologists increasingly argue that it is insufficient: it preserves fragments of damaged ecosystems rather than restoring their capacity to function. A growing movement known as rewilding proposes a more ambitious alternative—allowing, and in some cases actively promoting, the return of nature on a large scale.

B. Rewilding is founded on the concept of trophic cascades: the idea that predators at the top of a food chain exert powerful, often indirect effects on ecosystems far below them. The most celebrated example is the reintroduction of grey wolves to Yellowstone National Park in the United States in 1995. Within a few years, wolf predation had dramatically reduced the number of elk, which had been overgrazing riverbanks and valley floors. Vegetation recovered, rivers stabilised as root systems held soil in place, and populations of beavers, songbirds, and fish rebounded. Ecologists describe this sequence of events as a "trophic cascade," and it provided compelling evidence for the ecological value of apex predators.

C. In Europe, advocates of rewilding point to several large carnivores that were once native to the continent but were hunted to extinction or near-extinction over centuries of agricultural expansion: wolves, bears, lynx, and—most ambitiously—the wisent, or European bison. Some recovery has already occurred naturally. Wolf populations have expanded from remnant populations in Italy and the Iberian Peninsula, colonising France, Germany, and the Netherlands without human assistance, aided by legal protections introduced under the European Union's Habitats Directive. Lynx have been successfully reintroduced in Switzerland, the Czech Republic, and Germany.

D. The rewilding of rivers is equally compelling. Beavers, extinct in Britain for approximately four hundred years, were reintroduced to Scotland in 2009 as part of a pilot project. The results have been striking. Beaver dams create wetland habitats, slow the flow of water, reduce downstream flooding, and improve water quality. A river system in Devon, where beavers were reintroduced in 2011, showed a 30 percent reduction in peak water flow during storm events—a finding with significant implications for flood management in a country increasingly vulnerable to extreme rainfall.

E. Critics of rewilding raise legitimate concerns. Farmers and landowners are understandably anxious about the return of large predators that may attack livestock. The economic impact can be severe for individual producers, even if the overall ecological and economic benefits are positive. In some regions of Europe, compensation schemes for livestock losses to wolves and bears have helped reduce conflict, but enforcement and adequacy of payments remain contentious. There are also concerns about whether rewilded landscapes can be maintained at sufficient scale: wildlife needs vast corridors of connected habitat to thrive, and much of Europe is densely settled and intensively farmed.

F. Perhaps the most significant challenge is cultural. The idealised European landscape—neatly farmed fields, managed forests, picturesque villages—reflects centuries of human shaping of the land. For many rural communities, the arrival of wolves or the flooding caused by beavers represents not a restoration of nature but an unwelcome disruption of their way of life. Successful rewilding programmes have found that community involvement, transparent communication, and genuine local benefit-sharing are as important as ecological science.

G. Despite these obstacles, the ambition of rewilding's proponents is considerable. Rewilding Europe, a non-governmental organisation founded in 2011, aims to facilitate the rewilding of one million hectares across the continent by 2030. Projects are under way in the Danube delta, the Carpathian mountains, the Atlantic coast of Spain, and several other regions. Supporters argue that rewilding is not merely an ecological project but an economic one: functioning ecosystems generate income through wildlife tourism, sustainable fishing, and reduced costs for flood management and water purification. The wolf, it turns out, may have a measurable value measured in euros as well as in biodiversity.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'An example of a carnivore species recovering in Europe without direct human intervention', answer: 'C' },
            { num: 15, stem: 'A description of how top predators can change the behaviour of rivers', answer: 'B' },
            { num: 16, stem: 'Evidence that returning a specific animal reduced the risk of flooding', answer: 'D' },
            { num: 17, stem: 'A reference to the cultural significance of traditional agricultural landscapes', answer: 'F' },
            { num: 18, stem: 'A statement of the limitations of traditional conservation approaches', answer: 'A' },
            { num: 19, stem: 'Details of financial targets set by a rewilding organisation', answer: 'G' },
            { num: 20, stem: 'An explanation of difficulties in compensating farmers for losses', answer: 'E' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' }, { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' }, { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' }, { letter: 'F', text: 'Paragraph F' },
            { letter: 'G', text: 'Paragraph G' },
          ],
        },
        {
          type: 'formgroup',
          id: 'r2-sent',
          part: 6,
          qRange: [21, 26],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `21. The concept that predators indirectly affect all levels of an ecosystem is known as a {{21}}.\n22. The legal protection of wolves in Europe is partly due to the EU's {{22}}.\n23. The reintroduction of beavers to Devon resulted in a 30 percent reduction in {{23}} during storms.\n24. Financial {{24}} for livestock losses have been introduced in some regions to reduce conflict with farmers.\n25. Rewilding advocates argue that functioning ecosystems can generate income through {{25}} tourism.\n26. Rewilding Europe aims to restore {{26}} of land across the continent by 2030.`,
          blanks: [
            { num: 21, answers: ['trophic cascade'] },
            { num: 22, answers: ['Habitats Directive'] },
            { num: 23, answers: ['peak water flow'] },
            { num: 24, answers: ['compensation schemes', 'compensation'] },
            { num: 25, answers: ['wildlife'] },
            { num: 26, answers: ['one million hectares', 'a million hectares'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The Gig Economy',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Gig Economy

The term "gig economy" describes a labour market characterised by short-term contracts, freelance work, and on-demand services, in contrast to the permanent employment that dominated the post-war economic era. The rise of digital platforms—from ride-hailing services to freelance marketplaces and food delivery apps—has accelerated this shift dramatically over the past decade. For some, the gig economy represents liberation from the constraints of traditional employment; for others, it represents the erosion of labour protections built up over a century of industrial relations.

Advocates of platform-based work stress its flexibility. Many gig workers report that the ability to set their own hours, work from home, and supplement other income streams makes gig work highly attractive. For students, parents caring for young children, or retirees seeking additional earnings, the gig model offers genuine autonomy that conventional employment cannot match. A 2019 survey by the McKinsey Global Institute found that the majority of independent workers—across countries and skill levels—chose their work status voluntarily and reported being satisfied with it.

Critics, however, focus on the substantial minority who rely on gig work as a primary income source, often involuntarily. For these workers, the flexibility argument rings hollow: without guaranteed hours, they cannot budget reliably; without employment status, they receive no sick pay, no holiday entitlement, and no employer pension contributions. Research across the United Kingdom, United States, and Australia consistently finds that median hourly earnings for gig workers, once expenses and unpaid time are accounted for, fall below the minimum wage applicable to employed workers in the same jurisdictions. The apparent freedom of gig work thus conceals significant financial insecurity.

Legal classification has emerged as a central battleground. In most legal systems, workers fall into one of three categories: employees (with full protections), independent contractors (with minimal protections), or—in some jurisdictions—a middle category of "worker" with intermediate rights. Platform companies have typically classified their workers as independent contractors, arguing that they operate as independent businesses using the platform as a tool. In 2021, the UK Supreme Court rejected this classification in the case of Uber BV v Aslam, ruling that Uber drivers were "workers" entitled to minimum wage guarantees and holiday pay when logged in and available to accept rides. Similar decisions have followed in France, Spain, and the Netherlands.

The regulatory response is evolving rapidly but unevenly. The European Union proposed a Platform Work Directive in 2021, which would establish a legal presumption that platform workers are employees unless the platform can demonstrate otherwise—a reversal of the current burden of proof. California's Proposition 22 (2020) moved in the opposite direction, classifying rideshare and delivery drivers as independent contractors but mandating a range of minimum earnings guarantees and benefits. The result is a patchwork of rules that varies not just between countries but sometimes between regions within the same country, creating significant uncertainty for both platforms and workers.

Academic perspectives on the gig economy's overall impact diverge significantly. Some economists argue that platform work, by reducing transaction costs and matching supply to demand more efficiently, ultimately increases total employment and economic output. Others contend that the growth of precarious work shifts risk from capital to labour, compresses wages across the economy, and undermines the tax base that funds social protection systems. The debate is further complicated by measurement difficulties: official labour statistics, designed to capture traditional employment relationships, systematically undercount gig workers, making it difficult to assess the scale and trajectory of the phenomenon with precision.

What appears clear is that the gig economy is not a temporary aberration but a structural feature of modern labour markets, shaped by technology, globalisation, and shifting expectations about work and employment. Whether it ultimately expands or contracts human freedom depends substantially on regulatory choices that are still being contested in legislatures, courts, and corporate boardrooms around the world.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'Which of the following best describes the McKinsey 2019 survey findings?',
          options: [
            'The majority of gig workers had been forced into independent work by redundancy.',
            'Most independent workers chose gig work voluntarily and expressed satisfaction with it.',
            'Gig workers in developing countries reported higher satisfaction than those in developed countries.',
            'The survey found that most gig workers wished to transition to traditional employment.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What did research across the UK, US, and Australia consistently find about gig worker earnings?',
          options: [
            'Gig workers earned more than equivalent permanent employees on an hourly basis.',
            'Median gig earnings exceeded minimum wage in most jurisdictions.',
            'When expenses and unpaid time were included, median gig earnings fell below minimum wage.',
            'Earnings varied so widely that no consistent pattern could be established.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What was the significance of the UK Supreme Court ruling in Uber BV v Aslam?',
          options: [
            'It classified Uber drivers as independent contractors with enhanced rights.',
            'It established that drivers were employees with full employment protections.',
            'It ruled that drivers qualified as "workers" and were entitled to minimum wage and holiday pay.',
            'It prevented Uber from operating in the United Kingdom.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'According to the passage, what is a consequence of California\'s Proposition 22?',
          options: [
            'Rideshare drivers were reclassified as employees with full benefits.',
            'Drivers were confirmed as independent contractors with some minimum guarantees.',
            'The proposition was rejected by the courts as unconstitutional.',
            'Platforms were required to offer pension contributions to all drivers.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The gig economy has grown primarily because digital platforms have reduced the need for labour.\n32. {{32}}: Platform companies have generally preferred to classify workers as independent contractors.\n33. {{33}}: The EU Platform Work Directive was fully approved and implemented by 2022.\n34. {{34}}: Some economists argue that platform work improves total employment and economic output.\n35. {{35}}: Official labour statistics reliably capture the full extent of gig work.\n36. {{36}}: The writer suggests that the future of the gig economy depends partly on regulatory decisions.`,
          blanks: [
            { num: 31, answers: ['NOT GIVEN'] },
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
          template: `37. Workers who have full employment protections are classified as {{37}} in most legal systems.\n38. The EU directive proposes a {{38}} that platform workers are employees unless proven otherwise.\n39. The difficulty of measuring the gig economy is partly due to its undercount in {{39}} statistics.\n40. The passage describes the gig economy as a {{40}} feature of modern labour markets, not a temporary trend.`,
          blanks: [
            { num: 37, answers: ['employees'] },
            { num: 38, answers: ['legal presumption'] },
            { num: 39, answers: ['official labour', 'official'] },
            { num: 40, answers: ['structural'] },
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
          imageUrl: '/assets/ielts/charts/set6-task1.svg',
          imageAlt: 'Line graph showing internet usage rates in five world regions from 2000 to 2022',
          stimulus: 'The line graph below shows the percentage of the population using the internet in five world regions between 2000 and 2022.',
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
          stimulus: 'Some people think that parents should limit the amount of screen time their children have, while others believe that technology is an important part of modern life and children should be free to use it as much as they wish.',
          text: 'Discuss both views and give your own opinion.',
          minWords: 250,
        },
      ],
    },

    // ─── SPEAKING ────────────────────────────────────────────────────────────

    {
      part: 10,
      skill: 'speaking',
      title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak',
          id: 'sp1',
          part: 10,
          partNumber: 1,
          text: 'Part 1 — Personal questions about technology use',
          followUp: [
            'How much time do you spend on your phone or computer each day?',
            'What do you mainly use the internet for?',
            'Have your technology habits changed in the last few years? How?',
            'Do you think you spend too much time on screens?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a piece of technology that has had a big impact on your life.\n\nYou should say:\n• what the technology is\n• when and how you started using it\n• how it has changed your daily routine\n• and explain whether you think its overall impact has been positive or negative`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Technology and society',
          followUp: [
            'Do you think technology is making people more or less connected to each other?',
            'What risks do you see in children having unrestricted access to the internet?',
            'How should schools adapt their teaching methods to reflect the digital age?',
            'Do you think there will ever be technology that fundamentally changes how humans communicate?',
          ],
        },
      ],
    },
  ],
};

export default mock;
