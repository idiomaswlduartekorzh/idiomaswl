import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-16',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 16',
  subtitle: 'Renewable Energy · Child Cognitive Development · Globalisation',
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
      title: 'Reading — Passage 1: The Renewable Energy Transition',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Renewable Energy Transition

The global energy system is undergoing a transformation without historical precedent. After more than a century dominated by fossil fuels, the combination of falling technology costs, climate policy, and shifting investment is accelerating the deployment of renewable energy at a pace that has repeatedly outstripped even optimistic forecasts. In 2023, global capacity additions of solar and wind power reached a record four hundred and forty-five gigawatts—more than all other forms of electricity generation combined.

The decline in the cost of solar photovoltaic electricity has been the most dramatic story in energy economics for a generation. Between 2010 and 2023, the cost of generating electricity from utility-scale solar PV fell by approximately ninety percent, making it the cheapest source of new electricity generation in history in most parts of the world. Wind power followed a similar trajectory, with offshore wind costs falling by around seventy percent over the same period. These cost reductions are not the product of any single technological breakthrough but the result of cumulative improvements across manufacturing, installation, materials science, and supply chain logistics—a process known as "learning by doing" or Wright's Law.

The implications for existing energy systems are significant. In electricity grids that previously relied on dispatchable sources—power stations that generate electricity on demand—the growing share of wind and solar creates new challenges of integration. Solar and wind generate electricity intermittently, dependent on weather conditions, and their output does not automatically match the pattern of demand. Managing this variability requires a range of solutions: flexible demand, interconnection between grids, natural gas as a backup "firm" power source, and increasingly, energy storage.

Battery storage technology has emerged as a critical enabler of the energy transition. The same cost trajectories that transformed solar and wind have affected lithium-ion batteries: prices fell by over ninety-seven percent between 1991 and 2023, unlocking utility-scale battery installations that can store surplus renewable generation and discharge it when needed. Electric vehicles are also reshaping the energy system—both as a major new source of demand for electricity and, potentially, as a distributed storage resource that could help balance grids through vehicle-to-grid charging. The electrification of transport, heating, and industrial processes is a necessary complement to the decarbonisation of the electricity supply.

The pace of transition is uneven across countries and sectors. Rich countries with strong policy frameworks and access to capital have led deployment, though some middle-income countries—notably China, India, and Brazil—have also installed renewable capacity at enormous scale. Fossil fuel-dependent economies, particularly those in which fossil fuels represent a major source of government revenue and employment, face the most complex transitions. For countries like Saudi Arabia, Nigeria, and Australia, the energy transition raises profound questions not only about electricity systems but about economic models and social contracts.

Achieving full decarbonisation of energy systems by mid-century—as required by the Paris Agreement targets—will require not only the continued scaling of wind, solar, and storage but also progress in areas where renewable electricity is more difficult to deploy. "Hard-to-abate" sectors—heavy industry, aviation, and shipping—are responsible for a significant share of global emissions and present greater technical and economic challenges than electricity generation. Green hydrogen, produced by using renewable electricity to split water into hydrogen and oxygen, has attracted considerable interest as a potential fuel for these sectors, though its cost remains high and the infrastructure for its use is at an early stage.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: In 2023, solar and wind capacity additions exceeded those of all other electricity sources combined.\n2. {{2}}: The cost decline of solar PV was primarily the result of a single major scientific breakthrough.\n3. {{3}}: Solar and wind generation poses integration challenges because their output is variable.\n4. {{4}}: Lithium-ion battery prices fell by more than ninety percent between 1991 and 2023.\n5. {{5}}: China, India, and Brazil have installed more renewable energy capacity than any high-income country.\n6. {{6}}: Heavy industry, aviation, and shipping are among the sectors hardest to decarbonise using renewable electricity.\n7. {{7}}: Green hydrogen is already widely used as a fuel in the shipping and aviation industries.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['FALSE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['TRUE'] },
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
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. The process of cost reduction through accumulated manufacturing experience is known as {{8}}.\n9. Power stations that can generate electricity on demand are described in the passage as {{9}} sources.\n10. Electric vehicles could potentially help balance electricity grids through {{10}} charging systems.\n11. The {{11}} process uses renewable electricity to split water into hydrogen and oxygen.\n12. Countries in which fossil fuels are a major source of {{12}} face the most complex energy transitions.\n13. The global climate agreement requiring mid-century decarbonisation is known as the {{13}}.`,
          blanks: [
            { num: 8, answers: ['learning by doing', 'Wright\'s Law'] },
            { num: 9, answers: ['dispatchable'] },
            { num: 10, answers: ['vehicle-to-grid'] },
            { num: 11, answers: ['green hydrogen'] },
            { num: 12, answers: ['government revenue'] },
            { num: 13, answers: ['Paris Agreement'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Cognitive Development in Early Childhood',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Cognitive Development in Early Childhood

A. The first five years of life represent a period of cognitive development of extraordinary rapidity and consequence. The human brain at birth contains virtually all the neurons it will ever have—approximately one hundred billion—but the connections between these neurons, the synapses, are formed at a rate of millions per second during infancy and early childhood. This period of synaptic proliferation is followed, from early childhood through adolescence, by a process of "synaptic pruning" in which connections that are frequently used are strengthened and those that are not are eliminated. The architecture of the mature brain is thus shaped, in significant part, by the quality and richness of a child's early experiences.

B. Jean Piaget, the Swiss psychologist whose work between the 1930s and 1970s revolutionised understanding of child development, proposed that children pass through a series of discrete cognitive stages. In the sensorimotor stage, from birth to approximately two years, infants learn through physical interaction with their environment and develop object permanence—the understanding that objects continue to exist even when not visible. The pre-operational stage, from two to seven years, is characterised by the development of language and symbolic thinking, though logical reasoning remains limited. Children in this stage are typically egocentric—that is, they find it difficult to understand perspectives different from their own.

C. Piaget's stage theory was enormously influential but has been revised by subsequent research. Modern developmental psychologists have found that many cognitive abilities emerge earlier than Piaget proposed, and that development is less clearly staged and more continuous than his model suggests. Infant research using habituation techniques—in which infants' attention to novel versus familiar stimuli is measured—has demonstrated that babies as young as three or four months show implicit understanding of basic physical principles, including aspects of object permanence, that Piaget believed were not present until the end of the first year.

D. Lev Vygotsky, a Soviet psychologist working at roughly the same time as Piaget, emphasised the social and cultural dimensions of cognitive development in ways that Piaget's framework largely ignored. For Vygotsky, cognitive growth is fundamentally a social process: children learn through interaction with more knowledgeable others—parents, older siblings, teachers—who guide them through tasks slightly beyond their current independent capability. The zone of proximal development (ZPD), Vygotsky's most influential concept, refers to the gap between what a child can do alone and what they can achieve with guidance. Effective instruction and scaffolding operate within this zone, stretching the child's capabilities without overwhelming them.

E. Language development is among the most remarkable achievements of early childhood. A typical child produces their first words at around twelve months, reaches a vocabulary of approximately fifty words by eighteen months, and begins combining words into two-word utterances shortly thereafter. By the age of four, most children have acquired the core grammatical structures of their language and can produce and understand an enormous variety of sentences. Linguist Noam Chomsky famously proposed that the speed and uniformity of language acquisition across cultures reflects the existence of an innate "language acquisition device"—a biological predisposition for language that is unique to human beings, though this view has been contested by researchers who emphasise the role of social interaction in language learning.

F. The quality of early childhood environments has profound and lasting effects. Research on adverse childhood experiences—including neglect, abuse, household instability, and poverty—has demonstrated that early adversity is associated with significantly worse developmental outcomes across cognitive, social, emotional, and physical domains. Conversely, research on high-quality early childhood education programmes—particularly those targeting disadvantaged children—consistently shows positive effects on school readiness, academic achievement, and long-term outcomes including employment and health. Economic analyses suggest that investment in early childhood education yields some of the highest returns of any form of public expenditure.

G. The digital environment presents new questions for early childhood development. Screen time among young children has increased dramatically in the past decade, and parents and researchers debate the effects of digital media on attention, language development, and social skills. Current evidence suggests that interactive, co-viewed digital content—in which a caregiver watches and discusses media with a young child—can support language learning, while passive background television and unsupported solo device use appear to have less beneficial or neutral effects. The nature of the content and the social context of viewing appear more important than simple screen time duration.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'Evidence that infant cognitive abilities appear earlier than a major theorist proposed', answer: 'C' },
            { num: 15, stem: 'A description of how children develop language from their first words to full sentences', answer: 'E' },
            { num: 16, stem: 'Research showing that early adversity has lasting negative effects on multiple developmental outcomes', answer: 'F' },
            { num: 17, stem: 'An account of how the mature brain is shaped by early experiences', answer: 'A' },
            { num: 18, stem: 'A concept describing the gap between what a child can do alone and with support', answer: 'D' },
            { num: 19, stem: 'A discussion of how the type of digital media use matters more than the amount of screen time', answer: 'G' },
            { num: 20, stem: 'A description of a stage of development characterised by difficulty in understanding other perspectives', answer: 'B' },
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
          title: 'Key Theories of Child Cognitive Development',
          template: `Jean Piaget proposed that children pass through a series of discrete {{21}}, beginning with the sensorimotor stage in which infants develop {{22}}—the understanding that objects still exist when not seen. Vygotsky, by contrast, emphasised the role of social interaction and introduced the zone of {{23}}, which refers to what a child can achieve with guidance. Chomsky argued that language acquisition reflects an innate {{24}} device unique to humans. Research on early adversity shows that neglect and poverty are associated with worse {{25}} outcomes. Investment in early childhood education programmes targeting disadvantaged children consistently yields high {{26}} compared with other public spending.`,
          blanks: [
            { num: 21, answers: ['cognitive stages'] },
            { num: 22, answers: ['object permanence'] },
            { num: 23, answers: ['proximal development'] },
            { num: 24, answers: ['language acquisition'] },
            { num: 25, answers: ['developmental'] },
            { num: 26, answers: ['returns'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Globalisation and Its Critics',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Globalisation and Its Critics

Globalisation—the intensifying economic, cultural, and political interconnection of the world—has been one of the defining processes of the late twentieth and early twenty-first centuries. It has generated extraordinary gains in prosperity and connected billions of people to information, markets, and opportunities previously inaccessible to them. It has also produced profound dislocations and generated a political backlash that has shaped elections and reshaped international relations in ways that were difficult to foresee when globalisation's advance seemed irresistible.

The economic case for globalisation rests on the principle of comparative advantage: the idea that countries benefit by specialising in what they produce most efficiently and trading with others for goods they produce less efficiently. Applied at global scale, this logic supports the international division of labour that has allowed manufacturing to migrate from high-wage to lower-wage countries, sharply reducing production costs and consumer prices. Global poverty reduction over the past three decades has been dramatic: the share of the world's population living in extreme poverty fell from approximately thirty-six percent in 1990 to under ten percent by 2015, and this reduction is heavily concentrated in countries—particularly China and India—that integrated deeply into the global economy.

Not all have shared equally in these gains. Within high-income countries, the benefits of cheaper imports and expanded export markets have been broadly distributed, while the costs—factory closures, job losses in manufacturing, and wage stagnation for workers in directly competing sectors—have been concentrated in specific communities. Research on trade-exposed regions in the United States, United Kingdom, and Germany has consistently found elevated rates of unemployment, depressed wages, and reduced economic mobility in communities that lost manufacturing industries to import competition. The political consequences of this concentrated displacement have been significant: studies have identified a correlation between the share of jobs lost to Chinese import competition in a congressional district and support for populist candidates and positions hostile to further trade liberalisation.

Globalisation's effects on inequality at the global level are more complex than the within-country picture. The economist Branko Milanovic's analysis of global income distribution from 1988 to 2008 produced what he called the "elephant curve"—a graph of income growth across the global distribution in which those at the very bottom and in the rising middle of the global distribution (largely workers in emerging economies) gained substantially, those at the upper-middle range (largely the middle class of high-income countries) experienced relative stagnation, while the global top one percent gained greatly. This pattern reflects both the genuine convergence of developing economies toward higher incomes and the divergence of a global elite from everyone else.

Cultural globalisation has proved equally contested. Flows of music, film, fashion, food, and digital culture across national boundaries have enriched many lives and facilitated new forms of identity, creativity, and connection. Critics, however, point to the dominance of a small number of cultural industries—largely American—in global flows of entertainment and media, raising concerns about the homogenisation of culture, the erosion of local languages and traditions, and the loss of cultural diversity that resembles, in some analyses, a form of cultural imperialism. The evidence, however, is mixed: research in multiple countries has found that exposure to global culture does not straightforwardly displace local cultural production but often generates hybrid forms that blend local and global influences.

The COVID-19 pandemic exposed the vulnerabilities of highly interconnected supply chains, as disruptions in one part of the world rapidly cascaded through global systems for producing medicines, semiconductors, and food. The resulting political pressure for supply chain "reshoring"—the return of production to domestic locations—and the broader shift toward strategic autonomy in critical sectors has introduced a new phase of "slowbalisation" or selective deglobalisation. Whether this represents a temporary adjustment or a deeper structural shift in the organisation of the global economy remains one of the central questions of international political economy.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What economic principle does the passage identify as the foundation for the case in favour of globalisation?',
          options: [
            'The principle of absolute advantage in international production.',
            'The principle of comparative advantage, in which countries specialise in their most efficient outputs.',
            'The law of supply and demand as applied to international trade.',
            'The principle of economic equilibrium between importing and exporting nations.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'According to the passage, how have the costs of globalisation been distributed within high-income countries?',
          options: [
            'The costs have been shared equally across all income levels and regions.',
            'The costs have mainly been borne by wealthy sectors that lost export markets.',
            'The costs have been concentrated in specific communities that lost manufacturing jobs.',
            'The costs have fallen primarily on consumers who pay higher prices for imported goods.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What is the "elephant curve" described by the economist Branko Milanovic?',
          options: [
            'A graph showing that the global poor gained the most from globalisation, while the rich gained least.',
            'A visualisation of income growth showing gains for the global middle and top 1%, but stagnation for high-income country middle classes.',
            'A diagram comparing economic growth rates in elephantine economies such as India.',
            'A curve showing that global inequality has consistently fallen over the period of globalisation.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does the research on cultural globalisation suggest about local cultural production?',
          options: [
            'Local cultures are invariably destroyed by exposure to global media and entertainment.',
            'American cultural dominance has been largely reversed by the growth of local streaming platforms.',
            'Exposure to global culture often produces hybrid forms rather than simply displacing local culture.',
            'Cultural globalisation has no measurable effect on local traditions or languages.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The writer argues that globalisation has generated both significant gains and significant dislocations.\n32. {{32}}: The reduction in extreme poverty since 1990 is primarily due to globalisation in countries like China and India.\n33. {{33}}: Research shows a direct link between job losses caused by trade and support for anti-trade political candidates.\n34. {{34}}: Branko Milanovic concludes that globalisation has benefited only the top one percent of income earners globally.\n35. {{35}}: The passage claims that cultural globalisation has resulted in the complete disappearance of local cultural traditions in many countries.\n36. {{36}}: The COVID-19 pandemic contributed to political pressure to return production to domestic locations.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NO'] },
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
          template: `37. The concentration of cultural production in a small number of countries has raised concerns about cultural {{37}}.\n38. The term used to describe the return of production to domestic locations is {{38}}.\n39. The broader shift toward reducing international economic integration has been described as {{39}} or selective deglobalisation.\n40. The passage describes the organisation of the global economy as a central question of international {{40}}.`,
          blanks: [
            { num: 37, answers: ['imperialism', 'homogenisation'] },
            { num: 38, answers: ['reshoring'] },
            { num: 39, answers: ['slowbalisation'] },
            { num: 40, answers: ['political economy'] },
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
          imageUrl: '/assets/ielts/charts/set16-task1.svg',
          imageAlt: 'Bar chart showing global installed renewable energy capacity by type in 2010, 2015, and 2022',
          stimulus: 'The bar chart below shows global installed renewable energy capacity (in gigawatts) for four energy types in 2010, 2015, and 2022.',
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
          stimulus: 'Governments and businesses are increasingly investing in renewable energy sources such as wind and solar power.',
          text: 'What are the advantages of this trend, and what challenges does the transition away from fossil fuels present? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about learning and education',
          followUp: [
            'What was your favourite subject at school, and why?',
            'How do you prefer to learn new skills — by reading, watching videos, or practising?',
            'Do you think the education you received has prepared you well for adult life?',
            'What is something you would like to learn more about in the future?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a change that has happened in your country that you consider positive.\n\nYou should say:\n• what the change is\n• when and how it happened\n• how it has affected people's lives\n• and explain why you consider it a positive development`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Energy, environment, and global cooperation',
          followUp: [
            'Do you think individuals can make a meaningful difference to climate change through their personal choices?',
            'How important is international cooperation in addressing global challenges like climate change?',
            'Do you think richer countries have a greater responsibility to reduce their carbon emissions than poorer ones?',
            'What do you think the world will look like in fifty years in terms of energy production?',
          ],
        },
      ],
    },
  ],
};

export default mock;
