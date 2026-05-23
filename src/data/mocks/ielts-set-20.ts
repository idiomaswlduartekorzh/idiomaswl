import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-20',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 20',
  subtitle: 'Antibiotic Resistance · Urban Gardening · The Future of Transport',
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
      title: 'Reading — Passage 1: The Crisis of Antibiotic Resistance',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Crisis of Antibiotic Resistance

Antibiotics—medicines that kill or inhibit bacteria—are among the most transformative discoveries in the history of medicine. Since Alexander Fleming observed the bacteria-killing properties of the Penicillium mould in 1928, antibiotics have saved hundreds of millions of lives by making previously fatal infections treatable and enabling surgical procedures, organ transplants, and cancer chemotherapy that would be impossibly dangerous without effective infection control. Today, that transformative capacity is under threat from a biological process that medicine cannot prevent but can only slow: antimicrobial resistance (AMR).

Resistance arises because antibiotics, while effective against most bacteria in a population, rarely kill every single bacterium. Those with natural genetic variations that allow them to survive drug exposure reproduce, passing on their resistant traits. This evolutionary dynamic is inevitable—but its pace is dramatically accelerated by overuse and misuse of antibiotics. In human medicine, antibiotics are frequently prescribed for viral infections such as colds and influenza against which they are entirely ineffective. In low-income countries, over-the-counter access without prescription enables self-medication with incorrect doses and durations. In agriculture, the use of antibiotics at sub-therapeutic levels to promote growth in livestock has been identified as a major driver of resistance genes entering environmental reservoirs.

The consequences of the AMR crisis are already severe. The World Health Organization estimated that in 2019, bacterial AMR was directly responsible for 1.27 million deaths globally and was a contributing factor in approximately 4.95 million further deaths. If current trends continue, projections suggest that AMR could cause ten million deaths annually by 2050—surpassing cancer as a leading cause of mortality. Particular concern surrounds a group of pathogens described by the WHO as "priority pathogens": bacteria including Klebsiella pneumoniae, Acinetobacter baumannii, and Enterococcus faecium that have developed resistance to multiple classes of antibiotics, including carbapenems, which are considered last-resort treatments.

The antibiotic pipeline—the process of developing new drugs—has been inadequate for decades. Antibiotics are commercially unattractive: they are taken for short periods, prescribed cautiously to preserve effectiveness, and often priced at modest levels inappropriate to recoup the enormous investment required for drug development. Many major pharmaceutical companies exited antibiotic research in the 1980s and 1990s. The few new antibiotics approved in recent decades have primarily been modifications of existing drug classes, rather than genuinely novel mechanisms of action capable of overcoming existing resistance.

Addressing AMR requires action on multiple fronts simultaneously. Stewardship programmes—initiatives to ensure antibiotics are prescribed only when needed and in appropriate doses and durations—have been shown to reduce unnecessary antibiotic use in hospitals without worsening patient outcomes. Rapid diagnostic tests that can distinguish bacterial from viral infections in minutes, rather than the hours or days required by conventional culture methods, are increasingly available and could significantly reduce inappropriate prescribing. In agriculture, the elimination of prophylactic and growth-promoting antibiotic use in livestock—already implemented in the European Union and some other jurisdictions—is a necessary step, though political resistance from farming industries has slowed progress in many countries.

International coordination is essential because resistance genes move across borders with the bacteria that carry them, through trade, travel, and environmental flows. The WHO's Global Action Plan on Antimicrobial Resistance, adopted in 2015, provides a framework, but implementation has been uneven and often underfunded. The COVID-19 pandemic, which dramatically increased antibiotic use in hospital settings and disrupted existing stewardship programmes, is estimated to have worsened global AMR trends significantly—a reminder of how interconnected and fragile the global systems that underpin public health really are.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Alexander Fleming discovered penicillin by observing the bacteria-killing properties of a mould in 1928.\n2. {{2}}: Antibiotic resistance arises because antibiotics completely eliminate all bacteria in a population.\n3. {{3}}: The use of antibiotics at sub-therapeutic levels to promote livestock growth has been linked to the spread of resistance genes.\n4. {{4}}: In 2019, AMR was directly responsible for 4.95 million deaths globally.\n5. {{5}}: Most major pharmaceutical companies have increased their investment in antibiotic research since the 1990s.\n6. {{6}}: Rapid diagnostic tests can currently distinguish bacterial from viral infections within minutes.\n7. {{7}}: The WHO Global Action Plan on AMR was adopted at an international summit in 2015.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] },
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
          template: `8. Antibiotic {{8}} programmes aim to ensure that drugs are prescribed only when necessary and in correct doses.\n9. Carbapenems are described in the passage as {{9}} treatments when other antibiotics have failed.\n10. The decline in pharmaceutical company investment in antibiotics since the 1980s has resulted in an inadequate antibiotic {{10}}.\n11. The COVID-19 pandemic is estimated to have {{11}} global AMR trends significantly.\n12. Resistance genes spread internationally through trade, travel, and {{12}} flows.\n13. Bacteria that have developed resistance to multiple antibiotic classes are grouped by the WHO as {{13}} pathogens.`,
          blanks: [
            { num: 8, answers: ['stewardship'] },
            { num: 9, answers: ['last-resort'] },
            { num: 10, answers: ['pipeline'] },
            { num: 11, answers: ['worsened'] },
            { num: 12, answers: ['environmental'] },
            { num: 13, answers: ['priority'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Urban Gardening and the Green City',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Urban Gardening and the Green City

A. Urban gardening—the cultivation of plants within city environments—has moved from a marginal activity associated with wartime food production and community allotments to a significant component of contemporary urban planning and sustainability strategy. From rooftop gardens and vertical farms to community vegetable patches and edible street planting, cities around the world are increasingly integrating growing spaces into the fabric of urban life. This shift reflects both practical motivations—food security, environmental benefits—and deeper cultural desires for connection to nature and community.

B. The history of urban food growing is long and cyclical. In both world wars, "victory gardens" were promoted by governments in the United Kingdom and United States as a patriotic response to food shortages, with public parks and private lawns converted to vegetable production. Cuba's "organoponico" movement, born of necessity after the collapse of Soviet subsidies in the early 1990s left the country without access to imported food and agricultural inputs, became one of the world's most celebrated examples of urban agriculture, with community gardens transforming abandoned lots across Havana into productive growing spaces that supplied a significant fraction of the city's fresh vegetables.

C. The environmental benefits of urban gardening are multiple, though their scale depends significantly on context and implementation. Urban green spaces reduce the heat island effect by providing shade and evapotranspiration, absorb carbon dioxide through photosynthesis, and support biodiversity by providing habitat for pollinators, birds, and invertebrates. In cities where stormwater management is a challenge, green roofs and garden spaces can absorb rainfall and reduce runoff, alleviating pressure on drainage systems. Research in European cities has found that urban green spaces also have measurable positive effects on air quality, particularly in relation to particulate matter.

D. The social and health benefits of urban gardening have attracted growing research interest. Contact with nature and gardening activity has been consistently associated with reduced levels of cortisol, lower rates of depression and anxiety, and improved subjective wellbeing. Community gardens, in particular, serve as sites of social interaction across demographic boundaries—age, ethnicity, socioeconomic status—that are rarely bridged in other urban spaces. Research in the United States and Europe has found that residents of neighbourhoods with community gardens report higher levels of social trust and community cohesion than comparable residents in areas without them.

E. The contribution of urban agriculture to food security is real but often overstated. Urban growing can supplement household food budgets, particularly for low-income families, and can provide access to fresh produce in areas described as "food deserts"—urban neighbourhoods where affordable, nutritious food is difficult to obtain. However, the physical constraints of urban environments—limited space, competition for land, soil contamination, and artificial light requirements for indoor growing—mean that cities are unlikely to achieve meaningful self-sufficiency in food production in the foreseeable future. The economic viability of urban farming at scale remains contested; many operations require significant public subsidy or premium pricing to remain financially sustainable.

F. Vertical farming—the cultivation of crops in stacked layers within controlled indoor environments, typically using artificial LED lighting, hydroponic nutrient systems, and precise climate control—has attracted enormous investor attention as a potential solution to the space constraints of urban agriculture. Proponents argue that vertical farms can produce dramatically higher yields per unit of land area than conventional agriculture and can be located anywhere, independent of climate and soil conditions. Critics point to the high capital and energy costs of these systems, and question whether the environmental benefits of local food production justify the carbon footprint of the artificial lighting and climate control that vertical farms require.

G. The future of urban gardening is likely to be shaped by policy choices about land use, planning regulations, and public investment, as well as by the values and priorities of urban communities themselves. Cities that integrate green infrastructure into planning from the outset—as Singapore, Copenhagen, and Melbourne are attempting to do—may achieve genuinely transformative outcomes. For most cities, however, the challenge is retrofitting green space into environments built for very different purposes, a process that requires both technical innovation and sustained political commitment to the idea that the quality of urban life is inseparable from access to nature.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of a country that developed large-scale urban farming in response to an economic crisis', answer: 'B' },
            { num: 15, stem: 'Evidence that gardens improve social trust among residents of a neighbourhood', answer: 'D' },
            { num: 16, stem: 'A caution that cities are unlikely to achieve significant food self-sufficiency through urban farming', answer: 'E' },
            { num: 17, stem: 'An overview of how urban gardening has become part of contemporary sustainability strategy', answer: 'A' },
            { num: 18, stem: 'A description of how vertical farms work and the debate about their environmental credentials', answer: 'F' },
            { num: 19, stem: 'An argument that the best outcomes require integrating green space into city planning from the beginning', answer: 'G' },
            { num: 20, stem: 'A mention of the role urban gardens can play in managing rainwater and reducing flooding risk', answer: 'C' },
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
          title: 'Urban Gardening: Benefits and Limitations',
          template: `Urban gardening has a long history, including wartime {{21}} gardens that converted parks and lawns to food production. In Cuba, the {{22}} movement transformed abandoned lots into community growing spaces after economic crisis. Urban green spaces provide environmental benefits including reducing the {{23}} effect, absorbing CO₂, and supporting biodiversity. Community gardens are associated with reduced {{24}} and improved social cohesion across demographic groups. However, soil {{25}} and space constraints mean cities are unlikely to achieve food self-sufficiency. Vertical farming uses hydroponic systems and artificial light, but its high {{26}} costs and energy demands have attracted criticism.`,
          blanks: [
            { num: 21, answers: ['victory'] },
            { num: 22, answers: ['organoponico'] },
            { num: 23, answers: ['heat island'] },
            { num: 24, answers: ['depression', 'anxiety', 'cortisol'] },
            { num: 25, answers: ['contamination'] },
            { num: 26, answers: ['capital'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The Future of Transport',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The Future of Transport

Transport systems are the circulatory infrastructure of modern economies, enabling the movement of people and goods at the scales and speeds that contemporary life requires. They are also among the most significant sources of greenhouse gas emissions, accounting for approximately twenty-three percent of global energy-related CO₂ output, with road transport—principally cars and trucks—contributing the largest share. The decarbonisation of transport is therefore central to global climate goals, and it is being pursued through three principal pathways: electrification, modal shift, and improved efficiency.

Electrification of the vehicle fleet is the most widely discussed pathway, and the pace of its advance has surprised many observers. Global electric vehicle (EV) sales reached 14 million units in 2023—approximately eighteen percent of all new car sales worldwide—up from less than one percent in 2015. The plummeting cost of lithium-ion batteries, which has fallen by over ninety percent since 2010, is the primary driver. In several markets—Norway, the Netherlands, China—EVs have achieved price parity with internal combustion engine vehicles without subsidies, and the transition is increasingly market-driven rather than policy-driven. The primary remaining barriers are charging infrastructure (particularly for apartment dwellers and those in rural areas), the higher upfront cost of EVs in lower-income countries, and concerns about battery supply chains involving lithium, cobalt, and nickel.

Electrification, however, is not sufficient by itself. An electric vehicle charged from a coal-powered electricity grid may have a larger lifecycle carbon footprint than a fuel-efficient petrol car; the benefit depends heavily on the carbon intensity of the electricity supply. Furthermore, manufacturing an EV produces significantly more carbon than producing an equivalent conventional vehicle, primarily due to battery production: this "carbon debt" is typically paid off over two to three years of driving, depending on the electricity source. And electrification addresses only tailpipe emissions; it does not reduce congestion, land use devoted to roads and parking, or the safety and equity issues associated with car-dominated urban design.

Modal shift—moving journeys from high-emission to low-emission modes—is equally important, particularly in urban areas. Rail, cycling, and walking produce dramatically lower emissions per passenger-kilometre than private car travel. Cities that have invested heavily in public transport—Tokyo, Vienna, Zurich, Singapore—achieve high modal shares for these alternatives and have significantly lower transport emissions per capita than car-dependent cities. The design of urban environments matters profoundly: cities built at human scale, with mixed uses and dense networks of destinations, generate less travel demand and facilitate active modes far more effectively than sprawling, single-use developments.

Autonomous vehicles (AVs)—cars capable of navigating without a human driver—have been the subject of intense enthusiasm and investment since the early 2010s, but the technology has proved far more difficult to deploy at scale than early proponents anticipated. Several companies that led the field, including some well-capitalised startups, have abandoned or significantly curtailed their AV programmes. As of 2024, limited robotaxi services operate in a small number of cities, primarily in controlled urban environments with favourable road conditions. The full autonomy envisioned—vehicles capable of navigating any environment in any conditions without human intervention—remains substantially further away than was predicted a decade ago.

The future of transport will also be shaped by the physical infrastructure of movement: roads, railways, ports, and airports built over decades or centuries at enormous cost and difficult to replace or repurpose quickly. Infrastructure decisions made today will constrain and enable transport choices for generations. The high-speed rail networks being expanded or planned across Europe, Asia, and—more tentatively—North America and South America, offer the potential to replace short-haul flights with a significantly lower-emission mode. Aviation itself remains one of the most technically challenging sectors to decarbonise: sustainable aviation fuels (SAF), hydrogen propulsion, and hybrid-electric aircraft are all under development, but none is yet available at scale or cost-competitive with conventional jet fuel.

The equity dimension of transport transitions is frequently overlooked in discussions focused on technology. The benefits of EVs and new mobility services have disproportionately accrued to higher-income households with access to private vehicles, home charging, and urban areas with good public transport. Lower-income workers in car-dependent suburbs, rural areas, and developing countries face a transition that may remove access to affordable personal mobility before adequate alternatives are in place. Ensuring that the transition to sustainable transport improves rather than worsens mobility equity is one of the defining challenges for transport policy in the coming decades.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'According to the passage, what is the main reason why electric vehicle sales have grown so rapidly?',
          options: [
            'Government subsidies have made EVs significantly cheaper than conventional vehicles everywhere.',
            'The dramatic fall in the cost of lithium-ion batteries over the past decade.',
            'The superior performance and range of electric vehicles compared to petrol cars.',
            'International agreements requiring car manufacturers to phase out combustion engines.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What does the passage say about the "carbon debt" of manufacturing electric vehicles?',
          options: [
            'It is negligible compared to the lifetime savings from zero tailpipe emissions.',
            'EV manufacturing produces more carbon than conventional vehicle manufacturing, mainly because of battery production.',
            'The carbon debt of EV manufacturing is higher in countries with renewable electricity grids.',
            'The carbon debt means that EVs never achieve a lower carbon footprint than petrol cars.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What does the passage suggest about autonomous vehicles?',
          options: [
            'They have been successfully deployed at scale in most major cities by 2024.',
            'They have proved much more difficult to deploy than early optimists predicted.',
            'Most investment in AVs has come from public transport authorities rather than private companies.',
            'They are expected to be widely available within the next two to three years.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What equity concern about the transport transition does the passage identify?',
          options: [
            'EVs are too expensive for high-income households in most countries.',
            'Public transport improvements have benefited rural areas more than cities.',
            'The benefits of new mobility technologies have disproportionately gone to wealthier, urban households.',
            'Lower-income countries are choosing to build high-speed rail instead of expanding road networks.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The writer argues that electrification alone is sufficient to decarbonise the transport sector fully.\n32. {{32}}: The carbon benefit of an EV depends significantly on how clean the electricity grid is in the country where it is charged.\n33. {{33}}: Cities designed at human scale with mixed uses tend to generate lower overall travel demand than car-dependent sprawl.\n34. {{34}}: High-speed rail has already replaced the majority of short-haul flights in Europe and Asia.\n35. {{35}}: Sustainable aviation fuels are already available at cost-competitive prices and are widely used by major airlines.\n36. {{36}}: The passage suggests that transport infrastructure built today will constrain choices for future generations.`,
          blanks: [
            { num: 31, answers: ['NO'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NOT GIVEN'] },
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
          template: `37. The three principal pathways for decarbonising transport are electrification, {{37}}, and improved efficiency.\n38. Electric vehicles are charged from electricity grids of varying {{38}} intensity, which determines their actual climate benefit.\n39. Robotaxi services currently operate in a limited number of cities in {{39}} urban environments with favourable road conditions.\n40. The passage identifies improving {{40}} equity as one of the defining challenges for transport policy in the coming decades.`,
          blanks: [
            { num: 37, answers: ['modal shift'] },
            { num: 38, answers: ['carbon'] },
            { num: 39, answers: ['controlled'] },
            { num: 40, answers: ['mobility'] },
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
          imageUrl: '/assets/ielts/charts/set20-task1.svg',
          imageAlt: 'Bar chart showing annual public transport journeys per capita in five selected cities in 2023',
          stimulus: 'The bar chart below shows the annual number of public transport journeys per capita in five selected cities in 2023.',
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
          stimulus: 'Private car use contributes significantly to air pollution, traffic congestion, and greenhouse gas emissions in cities around the world.',
          text: 'What measures should governments and city authorities take to reduce reliance on private cars and encourage the use of more sustainable transport? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about transport and getting around',
          followUp: [
            'How do you usually travel to work or study?',
            'Do you drive a car, or do you prefer public transport? Why?',
            'Have you ever used an electric vehicle or bicycle as a regular form of transport?',
            'What do you think could be improved about public transport in your city or town?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a health issue or challenge that you think is important for your community or country.\n\nYou should say:\n• what the health issue is\n• how widespread it is\n• what is currently being done about it\n• and explain why you think this issue deserves more attention`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Health, environment, and the future of cities',
          followUp: [
            'Do you think people in your country take enough care of their health? What influences their choices?',
            'Should governments have the right to restrict individual behaviour in order to protect public health?',
            'How important is access to green space and nature for people living in cities?',
            'What do you think cities will look like in fifty years\' time? Will they be better or worse places to live?',
          ],
        },
      ],
    },
  ],
};

export default mock;
