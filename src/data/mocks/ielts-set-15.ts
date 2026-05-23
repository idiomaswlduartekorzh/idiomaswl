import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-15',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 15',
  subtitle: 'The Science of Sleep · Urbanisation in Asia · Global Food Security',
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
