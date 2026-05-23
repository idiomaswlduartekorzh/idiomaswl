import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-11',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 11',
  subtitle: 'Rome\'s Water System · Urban Heat Islands · Cognitive Biases',
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
      title: 'Reading — Passage 1: Engineering Water in Ancient Rome',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Engineering Water in Ancient Rome

The Roman Empire's capacity to supply clean water to its cities was, by ancient standards, an extraordinary feat of engineering. At its peak, Rome's water system delivered an estimated one million cubic metres of water daily to a city of around one million inhabitants—a figure that rivals the per capita supply of many modern cities. This achievement rested on an interlocking network of aqueducts, pipes, cisterns, and fountains whose construction and maintenance demanded both technical expertise and substantial political will.

The earliest Roman aqueduct, the Aqua Appia, was built in 312 BCE during the censorship of Appius Claudius Caecus. It ran almost entirely underground, a precaution against both enemy attack and evaporation. Over the following five centuries, ten further aqueducts were constructed, eventually supplying water from sources up to ninety kilometres away. The most celebrated, the Aqua Claudia and the Anio Novus, were completed under the Emperor Claudius in 52 CE. These structures stretched for over sixty kilometres and carried water across dramatic valleys on soaring arcaded bridges, many of which still stand today.

Roman engineers achieved the movement of water through a sophisticated application of gravity. Aqueducts were built with a precisely calculated continuous downward gradient—typically around one in two hundred—ensuring a steady flow without mechanical pumping. Maintaining this gradient over long and varied terrain required skill in surveying and the use of instruments such as the groma and the chorobates, a type of water level. Where valleys interrupted the route, engineers had two options: carry the water across on stone arches, or allow it to descend underground and rise on the far side using an inverted siphon, exploiting the principle that water seeks its own level.

At their destinations, the aqueducts discharged into distribution tanks called castella aquae. From these, lead and terracotta pipes carried water to the city's three principal consumers: public fountains and baths, which had the highest priority; private houses; and finally the emperor's palace. Poorer citizens collected water from the fountains, which ran continuously—the overflow from upper-level basins cascading into lower ones before flowing into the sewers. Wealthier households paid for a direct connection, and the government occasionally granted private access as a political favour.

The city's engineers were also responsible for waste removal. The Cloaca Maxima, one of the world's earliest large-scale sewage systems, was originally constructed in the sixth century BCE to drain the marshy valley between Rome's hills. It was later extended and enclosed, channelling sewage from the public latrines and baths directly into the Tiber. Roman latrines were communal, multi-seater facilities supplied with running water; personal privacy was not a cultural expectation. The entire water infrastructure was overseen by a dedicated official known as the curator aquarum, a post created by Augustus in 11 BCE and held at various times by notable figures including the author Sextus Julius Frontinus, who wrote an invaluable technical treatise on the system.

The eventual decline of Rome's water supply was less a story of engineering failure than of political collapse. As central authority weakened during the third and fourth centuries CE, maintenance became increasingly difficult. Invading armies cut or damaged aqueducts deliberately, knowing that disrupting water supply would hasten surrender. By the sixth century, only a fraction of the aqueducts remained operational, and Rome's population had fallen to perhaps thirty thousand. The infrastructure was not meaningfully restored until the Renaissance, when popes began rebuilding aqueducts to supply the growing city and, less nobly, to power the elaborate fountain displays that became symbols of papal prestige.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The Aqua Appia was built above ground for most of its length.\n2. {{2}}: The Aqua Claudia and Anio Novus were built during the reign of Emperor Claudius.\n3. {{3}}: Roman aqueducts used mechanical pumps to maintain water flow.\n4. {{4}}: The castella aquae supplied water to public fountains before private homes.\n5. {{5}}: All Roman citizens, regardless of wealth, had access to private water connections.\n6. {{6}}: The Cloaca Maxima was originally designed to drain marshland.\n7. {{7}}: The post of curator aquarum was created during the reign of Augustus.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
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
          template: `8. Roman engineers used instruments such as the groma and the {{8}} to survey terrain accurately.\n9. An {{9}} allowed water to descend into a valley and rise on the other side using water pressure.\n10. Public fountains had the {{10}} priority in the distribution of Rome's water supply.\n11. The {{11}} was one of the world's earliest large-scale sewage systems.\n12. The curator aquarum was an official responsible for overseeing Rome's entire {{12}}.\n13. Rome's aqueducts were deliberately damaged by {{13}} who understood that cutting the water supply would weaken the city.`,
          blanks: [
            { num: 8, answers: ['chorobates'] },
            { num: 9, answers: ['inverted siphon'] },
            { num: 10, answers: ['highest'] },
            { num: 11, answers: ['Cloaca Maxima'] },
            { num: 12, answers: ['water infrastructure'] },
            { num: 13, answers: ['invading armies'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: The Urban Heat Island Effect',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `The Urban Heat Island Effect

A. Cities are measurably warmer than the rural areas that surround them. This phenomenon, known as the urban heat island (UHI) effect, was first documented systematically by the English chemist Luke Howard in the early nineteenth century, who observed that London's city centre was consistently warmer than the countryside around it. Today, the temperature difference between a large city and its rural surroundings can exceed ten degrees Celsius on calm, clear nights, with profound consequences for public health, energy consumption, and environmental quality.

B. The UHI effect is driven by a combination of factors, most of which are direct consequences of urbanisation itself. Buildings, roads, and other impervious surfaces absorb solar radiation during the day and release it as heat at night, whereas vegetation—which is scarce in most city centres—reflects sunlight and cools surfaces through evapotranspiration. Concrete and asphalt have a significantly higher heat capacity and lower albedo than the soil and plant matter they replace. In addition, cities produce enormous quantities of "waste heat" from vehicles, air conditioning units, industrial processes, and human bodies.

C. The health consequences of elevated urban temperatures are well established. During heat waves, cities experience disproportionately high mortality rates relative to rural areas. The European heat wave of 2003 killed an estimated seventy thousand people across the continent, with the elderly and those without access to air conditioning at greatest risk. Urban heat is also associated with increased levels of ground-level ozone, which forms when sunlight reacts with pollutants—a process accelerated by higher temperatures. Ozone causes respiratory irritation and is linked to long-term lung damage and increased rates of asthma, particularly in children.

D. The economic costs are equally significant. Higher temperatures drive up demand for air conditioning, increasing electricity consumption and placing strain on power grids during peak periods. A study in Los Angeles found that each additional degree Celsius of urban warming increased peak electricity demand by approximately two percent. This cycle reinforces the UHI effect itself: as buildings consume more energy to cool their interiors, they discharge more heat into the surrounding streets. The additional burden on power infrastructure also raises the risk of blackouts during extreme heat events.

E. Urban planners and researchers have identified several strategies to reduce the UHI effect. Increasing the proportion of green space—through parks, street trees, and green roofs—can lower surface temperatures significantly. Trees are particularly effective: a mature street tree can reduce the ambient temperature of its immediate surroundings by several degrees through shading and evapotranspiration. Studies in cities from Singapore to Phoenix have demonstrated that well-designed parks create measurable "cool islands" that extend beyond their physical boundaries. Cool pavements and reflective roofing materials, which reflect rather than absorb solar radiation, offer additional benefits.

F. Water features also play a role that is frequently underestimated. Fountains, ponds, and water channels cool the air through evaporation, and several cities—including Medellín in Colombia and Seville in Spain—have incorporated water-based cooling into their heat mitigation strategies. Seville has experimented with deploying misting systems in pedestrian areas during summer months, generating local temperature reductions of up to eight degrees in public spaces. These interventions, while effective, are costly and require ongoing maintenance and water supply, which may be scarce in the drier climates most vulnerable to heat stress.

G. At a systemic level, the most durable solutions involve rethinking the materials and geometry of urban design. Orienting streets to allow prevailing winds to penetrate the city fabric can improve ventilation significantly. Limiting the height and density of buildings in key corridors can reduce the "canyon effect," in which tall buildings trap heat radiating from the street. Long-term, the integration of urban heat island mitigation into planning regulations and building codes represents the most powerful tool available to cities facing a warming future—one in which climate change is expected to intensify the UHI effect by raising baseline temperatures across the globe.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of how building orientation can improve airflow through a city', answer: 'G' },
            { num: 15, stem: 'An example of a city using water spray to cool outdoor public spaces', answer: 'F' },
            { num: 16, stem: 'An explanation of why vegetation reduces surface temperatures', answer: 'B' },
            { num: 17, stem: 'Data showing how a rise in temperature affects electricity demand', answer: 'D' },
            { num: 18, stem: 'A reference to the first scientific documentation of the UHI effect', answer: 'A' },
            { num: 19, stem: 'Evidence that the cooling effect of parks extends beyond their edges', answer: 'E' },
            { num: 20, stem: 'A link between high urban temperatures and a specific respiratory condition', answer: 'C' },
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
          title: 'The Urban Heat Island Effect',
          template: `The urban heat island effect occurs because urban surfaces have lower {{21}} than natural vegetation, causing them to absorb and retain more heat. Cities also generate waste heat through vehicles, industrial processes, and {{22}} units. During heat waves, mortality in cities is disproportionately high compared to {{23}} areas. Economically, rising urban temperatures increase demand for {{24}}, putting pressure on power systems. Green strategies include planting street {{25}}, which cool the air through shading and evapotranspiration. Structurally, limiting the {{26}} of buildings in key corridors helps prevent heat from becoming trapped between them.`,
          blanks: [
            { num: 21, answers: ['albedo'] },
            { num: 22, answers: ['air conditioning'] },
            { num: 23, answers: ['rural'] },
            { num: 24, answers: ['air conditioning'] },
            { num: 25, answers: ['trees'] },
            { num: 26, answers: ['height and density', 'height'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Cognitive Biases and Decision-Making',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Cognitive Biases and Decision-Making

Human beings like to think of themselves as rational agents: creatures who weigh evidence, consider alternatives, and reach conclusions through careful deliberation. Research in cognitive psychology and behavioural economics over the past half-century has painted a considerably more complicated picture. Our thinking is shaped, often without our awareness, by a range of systematic errors known as cognitive biases—predictable patterns of deviation from logical reasoning that affect individuals across cultures and educational levels.

The concept of cognitive bias was brought to prominence by the Israeli psychologists Daniel Kahneman and Amos Tversky, whose series of experiments in the 1970s and 1980s demonstrated that human judgement is reliably distorted in ways that can be mapped and predicted. Their work laid the foundation for what Kahneman later called the dual-process theory of mind: the idea that human cognition operates through two parallel systems. System 1 is fast, intuitive, and automatic—it processes information rapidly and generates feelings, impressions, and gut reactions. System 2 is slow, deliberate, and analytical—it handles complex calculations, evaluates arguments, and applies rules. The problem is that System 2 is cognitively expensive, and we default to System 1 far more often than we realise.

One of the most widely studied biases is confirmation bias: the tendency to search for, interpret, and recall information in a way that confirms one's pre-existing beliefs. Studies consistently show that people evaluate identical evidence more favourably when it supports their views and more critically when it contradicts them. This asymmetry has significant consequences in contexts ranging from medical diagnosis—where clinicians may too readily accept initial assessments—to political belief, where exposure to contradictory information can, paradoxically, entrench rather than revise opinion.

The anchoring effect describes the tendency for an initial piece of information to disproportionately influence subsequent judgements. In one famous experiment, subjects were asked to spin a wheel that was rigged to stop at either ten or sixty-five, then estimate what percentage of African countries belonged to the United Nations. Those who spun a high number gave systematically higher estimates than those who had spun a low number—despite the complete irrelevance of the spin. Anchoring influences price negotiations, legal sentences, and medical prognoses, often with substantial real-world consequences.

A third bias—availability heuristic—leads people to judge the likelihood of events based on how easily examples come to mind. Events that are dramatic, recent, or frequently covered in media are perceived as more probable than quieter, more common events. After a well-publicised plane crash, fear of flying spikes even as driving—statistically more dangerous—does not attract comparable anxiety. Conversely, slow-developing risks such as poor diet or sedentary behaviour, which cause the majority of premature deaths, may be chronically underestimated precisely because they generate no memorable events.

Not all researchers accept that biases are as universal or as harmful as the standard account implies. Gerd Gigerenzer, a German psychologist, has argued that many so-called biases are actually ecological rationality in action: heuristics that perform well in the environments in which they evolved. A doctor who relies on a simple decision rule—such as admitting all patients with two or more risk factors—may outperform a statistical algorithm that weighs hundreds of variables, precisely because the simpler rule avoids overfitting to noisy data. Gigerenzer's view is that the bias literature too often tests human reasoning against an inappropriate standard of formal logic and ignores the practical value of fast and frugal thinking.

The applied implications of cognitive bias research have been extensive. In public policy, the concept of "nudging"—designing the context of choice to encourage better decisions without restricting options—draws directly on bias research. Automatic enrolment in pension schemes, calorie labelling on menus, and the placement of healthier foods at eye level in canteens all exploit known biases to promote desired outcomes. In medicine, checklists and structured protocols are designed partly to reduce the impact of availability and confirmation biases on clinical judgement. In law, courts in several jurisdictions have begun considering research on eyewitness reliability and the conditions under which false memories are likely to form. The recognition that human reason is imperfect need not lead to pessimism; rather, it opens the door to the deliberate design of environments that account for—and to some extent compensate for—our cognitive limitations.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'According to the passage, what is the main difference between System 1 and System 2 thinking?',
          options: [
            'System 1 is used mainly for mathematical calculations, while System 2 handles emotional responses.',
            'System 1 is rapid and automatic, while System 2 is slower and more deliberate.',
            'System 2 is faster but less accurate than System 1.',
            'System 1 is the dominant system used in complex, high-stakes decisions.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What does the anchoring experiment with the spinning wheel demonstrate?',
          options: [
            'People are unable to estimate statistical information accurately.',
            'An irrelevant initial number can significantly distort later numerical judgements.',
            'High numbers always produce more accurate estimates than low numbers.',
            'Anchoring bias only applies to tasks involving geography.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'How does the availability heuristic explain people\'s responses to aeroplane crashes?',
          options: [
            'People accurately reassess the risk of flying after hearing of a crash.',
            'The drama of crashes makes flying seem more dangerous than driving, despite the statistics.',
            'People increase their fear of driving after hearing about aviation accidents.',
            'The heuristic causes people to underestimate all forms of transport risk.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What is Gigerenzer\'s main argument about cognitive biases?',
          options: [
            'Biases are entirely harmful and should always be corrected.',
            'Simple rules can sometimes be more effective than complex analytical approaches.',
            'The dual-process theory of mind is scientifically invalid.',
            'Biases only affect people without formal education.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Kahneman and Tversky conducted their key experiments in the United States.\n32. {{32}}: Confirmation bias can cause people to become more entrenched in their beliefs when exposed to opposing evidence.\n33. {{33}}: Cognitive biases are more common in people with lower levels of formal education.\n34. {{34}}: Gigerenzer argues that simple decision rules can outperform complex statistical models in some situations.\n35. {{35}}: The nudging approach to policy design has been proven to eliminate cognitive biases.\n36. {{36}}: Research on cognitive bias has influenced legal proceedings in some countries.`,
          blanks: [
            { num: 31, answers: ['NOT GIVEN'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NO'] },
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
          template: `37. The tendency to interpret evidence in favour of existing beliefs is known as {{37}} bias.\n38. Gigerenzer uses the phrase {{38}} to describe efficient, practical thinking adapted to real-world conditions.\n39. "{{39}}" is a policy design approach that uses knowledge of biases to encourage beneficial choices.\n40. In hospitals, the use of {{40}} and structured protocols helps reduce the influence of biases on clinical decisions.`,
          blanks: [
            { num: 37, answers: ['confirmation'] },
            { num: 38, answers: ['ecological rationality'] },
            { num: 39, answers: ['nudging'] },
            { num: 40, answers: ['checklists'] },
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
          imageUrl: '/assets/ielts/charts/set11-task1.svg',
          imageAlt: 'Bar chart comparing average daily water consumption per capita in four cities in 2010 and 2023',
          stimulus: 'The bar chart below shows the average daily water consumption per capita (in litres) in four cities in 2010 and 2023.',
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
          stimulus: 'Many cities around the world are experiencing the effects of rapid urbanisation, including traffic congestion, air pollution, and lack of green space.',
          text: 'What measures can city governments take to make urban areas more sustainable and liveable? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
          minWords: 250,
        },
      ],
    },

    // ─── SPEAKING ─────────────────────────────────────────────────────────────

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
          text: 'Part 1 — Personal questions about your city or town',
          followUp: [
            'Describe the town or city where you grew up or currently live.',
            'What do you like most about living there?',
            'How has your city or neighbourhood changed in recent years?',
            'Do you think cities today are becoming better or worse places to live? Why?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a decision you made that turned out to be a mistake.\n\nYou should say:\n• what the decision was\n• why you made it at the time\n• what happened as a result\n• and explain what you learned from the experience`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Urban planning and human behaviour',
          followUp: [
            'Do you think people who live in large cities are more stressed than those in rural areas? Why?',
            'How can urban design influence the behaviour and wellbeing of residents?',
            'Should governments have more control over how cities develop, or should market forces decide?',
            'What role can technology play in making cities more efficient and sustainable?',
          ],
        },
      ],
    },
  ],
};

export default mock;
