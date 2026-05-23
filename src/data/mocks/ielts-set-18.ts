import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-18',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 18',
  subtitle: 'Genetic Engineering · Smart Cities · Language Acquisition',
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
      title: 'Reading — Passage 1: Genetic Engineering and Its Applications',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Genetic Engineering and Its Applications

Genetic engineering—the direct manipulation of an organism's genome to alter its characteristics—has moved in the space of four decades from a laboratory curiosity to a technology with applications spanning medicine, agriculture, and environmental management. The development of the CRISPR-Cas9 gene editing system, announced by Jennifer Doudna and Emmanuelle Charpentier in 2012, accelerated this transformation dramatically by providing a cheap, precise, and widely accessible tool for editing DNA in virtually any organism. Doudna and Charpentier received the Nobel Prize in Chemistry in 2020 for this work.

CRISPR-Cas9 operates as a molecular scissors-and-guide system. A guide RNA directs the Cas9 protein—originally a bacterial immune defence mechanism—to a specific sequence in the genome, where it cuts both strands of the DNA double helix. The cell's own repair machinery then either disables the targeted gene (gene knockout) or, if a template is provided, introduces a new sequence (gene insertion or correction). The precision and efficiency of this process have made CRISPR far more practical than previous gene-editing tools, which were more expensive, slower, and technically demanding.

In medicine, CRISPR has opened therapeutic possibilities that were previously beyond reach. Clinical trials for CRISPR-based treatments of sickle cell disease and beta-thalassaemia—serious inherited blood disorders—have produced remarkable results, with some patients appearing functionally cured after a single treatment. Researchers are also investigating CRISPR as a means of disrupting viral DNA in HIV-infected cells, editing immune cells to target specific cancers, and developing in-vivo therapies that can correct genetic faults directly inside living patients. In 2023, the first CRISPR-based therapy—for sickle cell disease—received regulatory approval in the United States and the United Kingdom.

Agricultural applications of genetic engineering are longstanding, though CRISPR has significantly extended the scope of what is technically feasible. Genetically modified (GM) crops containing genes from other species—such as Bt maize, which produces a bacterial insecticide—have been grown commercially since the 1990s. CRISPR allows changes within an organism's own genome without introducing foreign DNA, which has important regulatory implications: some jurisdictions treat CRISPR-edited crops more leniently than traditional GM crops precisely because no genetic material from another species is inserted. Applications include crops with improved disease resistance, drought tolerance, nutritional profiles, and shelf life.

Environmental applications of genetic engineering present both significant potential and considerable ethical complexity. Gene drives—a technique that uses CRISPR to spread a desired genetic trait through a wild population far faster than natural inheritance would allow—have been proposed as a means of eliminating mosquito populations that carry malaria, dengue, and Zika. Laboratory tests and limited field trials have demonstrated the technical feasibility of gene drives in insect populations. Critics raise serious concerns about the irreversibility and ecological unpredictability of releasing self-propagating genetic elements into wild ecosystems: unlike a contained laboratory experiment, a gene drive released into a natural population cannot be recalled once spread begins.

The governance of genetic engineering technology presents challenges that regulatory systems designed for a slower pace of scientific change are poorly equipped to handle. International frameworks are patchy, and the pace of scientific advance regularly outstrips the pace of regulatory deliberation. The case of He Jiankui, the Chinese scientist who in 2018 announced the birth of the first gene-edited babies—twins whose genomes had been edited to resist HIV infection—provoked international condemnation. He's experiment was conducted without adequate institutional oversight, the medical necessity was disputed, and the possible off-target effects of the edits remain uncertain. He was subsequently imprisoned by Chinese authorities for conducting illegal medical practices, but the episode illustrated the inadequacy of existing governance frameworks to prevent unilateral action by individual researchers or institutions.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: CRISPR-Cas9 was announced by Doudna and Charpentier in 2012 and earned them a Nobel Prize in 2020.\n2. {{2}}: The Cas9 protein was originally used by bacteria as a mechanism of immune defence.\n3. {{3}}: Clinical trials for CRISPR treatments of sickle cell disease have so far produced disappointing results.\n4. {{4}}: Some regulatory systems treat CRISPR-edited crops more leniently than traditional GM crops.\n5. {{5}}: Gene drives can spread a genetic trait through a wild population faster than natural inheritance.\n6. {{6}}: He Jiankui's gene-edited baby experiment was approved by all relevant international regulatory bodies.\n7. {{7}}: He Jiankui was subsequently imprisoned for conducting illegal medical practices.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['FALSE'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. In CRISPR-Cas9, a {{8}} RNA directs the Cas9 protein to the correct location in the genome.\n9. When a cell's repair machinery disables a targeted gene, the process is called gene {{9}}.\n10. The first CRISPR-based therapy received regulatory approval in 2023 for the treatment of {{10}} disease.\n11. Bt maize produces a {{11}} that acts as a natural insecticide within the plant.\n12. Gene drives have been proposed as a way of eliminating mosquito species that carry malaria, dengue, and {{12}}.\n13. Critics argue that a gene drive released into the wild cannot be {{13}} once the spread has begun.`,
          blanks: [
            { num: 8, answers: ['guide'] },
            { num: 9, answers: ['knockout'] },
            { num: 10, answers: ['sickle cell'] },
            { num: 11, answers: ['bacterial insecticide'] },
            { num: 12, answers: ['Zika'] },
            { num: 13, answers: ['recalled'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: Smart Cities',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Smart Cities

A. The concept of the "smart city" has emerged over the past two decades as one of the most discussed ideas in urban planning and technology policy. Broadly, a smart city is one that deploys digital technologies—sensors, connectivity, data analytics, and artificial intelligence—to optimise the management of urban infrastructure and services, improve the quality of life for residents, and reduce environmental impacts. The concept encompasses everything from traffic signal systems that adjust in real time to congestion patterns to energy grids that balance supply and demand automatically, from surveillance systems that help police respond to incidents to platforms that enable residents to report potholes or book council services through a smartphone.

B. The world's most frequently cited example of a smart city is Singapore, which began developing its "smart nation" framework in 2014. Singapore deploys an extensive network of sensors across its urban environment, monitoring everything from air quality and humidity to the occupancy of car parks and the flow of pedestrians through public spaces. Data from these sensors feeds into centralised systems that optimise public transport routing, predict infrastructure maintenance needs, and guide urban planning decisions. A network of cameras and AI-enabled facial recognition systems is also deployed in public spaces, a capability that enhances security but has generated significant debate about surveillance and civil liberties.

C. European smart city initiatives have tended to place greater emphasis on citizen participation, data governance, and privacy than their Asian or North American counterparts. Barcelona's "Superblocks" programme, while not conventionally described as a smart city initiative, exemplifies an approach that uses data to redesign urban space in ways that reduce traffic and promote walking, cycling, and community use. Amsterdam's smart city programme is governed by an open data policy, making the data collected from city infrastructure available to citizens and researchers, enabling innovation and democratic scrutiny of how data is used.

D. The economic arguments for smart city investment rest on efficiency gains, cost savings, and the attraction of investment and talent. Optimised traffic systems reduce commuting times and fuel consumption; predictive maintenance prevents costly infrastructure failures; energy management systems reduce waste and operating costs. Consultancies and technology companies have produced projections suggesting that smart city technologies could generate substantial economic benefits globally, though critics note that these projections often originate from parties with a commercial interest in the outcome and may overstate the achievable benefits.

E. Cybersecurity is a significant and underappreciated risk. Smart city infrastructure, by design, depends on networked digital systems whose interconnection creates potential attack surfaces for malicious actors. Several cities have already suffered serious cyberattacks: Atlanta's city government was paralysed for weeks in 2018 by a ransomware attack that encrypted critical data and demanded payment; Baltimore suffered a similar attack the following year. The compromise of traffic management, water treatment, or energy distribution systems by hostile actors—whether criminals, activists, or state-sponsored attackers—represents a potential threat to public safety of a qualitatively different kind from conventional urban risks.

F. Privacy and surveillance concerns are equally significant. The deployment of extensive sensor networks, facial recognition systems, and data analytics platforms raises serious questions about what data is collected, who has access to it, how long it is retained, and what purposes it can be used for. In some authoritarian contexts, smart city technologies have been explicitly deployed as tools of social control: China's social credit system, for example, uses data aggregated from multiple sources—financial records, social media, CCTV footage—to assign scores that affect citizens' access to transport, education, and employment. Even in democratic societies, the collection and use of granular urban data creates risks of function creep—the use of data for purposes beyond those originally intended.

G. The future of smart cities will be shaped by decisions about governance, values, and the distribution of benefits. Technology alone does not make a city smart in any meaningful sense: the deployment of sensors and analytics in a city with weak institutions, poor governance, or deep inequality may do little to address these underlying challenges and could exacerbate them. Researchers and practitioners increasingly argue that the most important questions in smart city development are not technical but political: who decides which problems are worth solving, whose data is used and on whose terms, and who benefits from the efficiencies created?`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A warning that smart city technology cannot compensate for weak governance or deep inequality', answer: 'G' },
            { num: 15, stem: 'An example of a city that makes its smart city data available to the public', answer: 'C' },
            { num: 16, stem: 'A description of how a city has been paralysed by a ransomware cyberattack', answer: 'E' },
            { num: 17, stem: 'An explanation of how smart city economic projections may be influenced by commercial interests', answer: 'D' },
            { num: 18, stem: 'A reference to the use of smart city technology as an explicit tool of social control', answer: 'F' },
            { num: 19, stem: 'An overview of the broad definition of what a smart city is', answer: 'A' },
            { num: 20, stem: 'A description of Singapore\'s sensor network and how it is used to manage the city', answer: 'B' },
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
          title: 'Smart Cities: Technology, Risks, and Governance',
          template: `A smart city uses digital technologies including sensors, AI, and {{21}} to improve urban management. Singapore is frequently cited as a leading example, using sensor networks to optimise {{22}} routing and predict infrastructure needs. European cities tend to emphasise data {{23}} and citizen participation more than Asian or North American counterparts. A key risk is {{24}}, since interconnected digital systems can be targeted by ransomware and other attacks. The use of data beyond its originally stated purpose is known as {{25}} and is a significant concern even in democratic societies. Researchers argue that the most important smart city questions are not technical but {{26}}.`,
          blanks: [
            { num: 21, answers: ['data analytics'] },
            { num: 22, answers: ['public transport'] },
            { num: 23, answers: ['governance'] },
            { num: 24, answers: ['cybersecurity'] },
            { num: 25, answers: ['function creep'] },
            { num: 26, answers: ['political'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: How Children Acquire Language',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `How Children Acquire Language

Language is the most distinctively human of all cognitive abilities, and its acquisition in early childhood is among the most remarkable developmental achievements. Within the first few years of life, children master a system of extraordinary complexity—the phonology, vocabulary, morphology, and syntax of their native language—without formal instruction, apparently effortlessly, and at a pace that has astonished linguists and developmental psychologists for generations.

The theoretical landscape of language acquisition research is dominated by a longstanding debate between nativist and empiricist accounts. The nativist position, most famously associated with Noam Chomsky and his colleagues, holds that children are born with an innate biological endowment for language—sometimes called the language acquisition device (LAD) or universal grammar—that constrains the range of possible human language structures and explains why all healthy children acquire language rapidly and without formal teaching. The primary evidence for nativism is the "poverty of the stimulus": the observation that the input children receive is far too impoverished, ambiguous, and incomplete to explain the complex and precise grammatical knowledge they develop.

Empiricist and social-interactionist accounts challenge the nativist view. Elizabeth Bates and Brian MacWhinney, among others, argued that language is a learned behaviour shaped by the statistical patterns in the input children receive, combined with general learning mechanisms they share with other cognitive domains. Research on "child-directed speech"—the simplified, repetitive, and exaggerated form of speech that caregivers in most cultures direct at young children—supports this view: the characteristics of child-directed speech appear specifically adapted to facilitate language learning. More recently, computational models using large neural networks have demonstrated that many grammatical structures can be learned from statistical regularities in linguistic input without any language-specific innate mechanism.

Regardless of the theoretical framework, the facts of language acquisition are well established and broadly consistent across cultures. Children begin discriminating the sounds of their native language from others within the first months of life—a feat of phonological learning that narrows over time as unfamiliar sound contrasts become harder to perceive. Most children produce their first recognisable words between ten and fourteen months, and the size of the vocabulary grows steadily before accelerating dramatically in a "vocabulary explosion" that typically occurs around eighteen to twenty-four months. By the time they start school, children have typically acquired several thousand words and the core grammatical structures of their language.

The role of social interaction in language development is increasingly emphasised by researchers. The developmental psychologist Michael Tomasello has argued that what fundamentally distinguishes human language acquisition from the communication of other primates is not innate grammar but the capacity for joint attention—the ability to share attention to an object or event with another person and to understand that the other person is intentionally directing one's attention. Joint attention, which emerges at around nine to twelve months, allows children to learn the meaning of words by tracking what a speaker is attending to, and provides the motivational and interpretive foundation for cultural learning more broadly.

Bilingual language acquisition—the simultaneous or sequential acquisition of two languages in childhood—has attracted considerable research interest, partly because of its theoretical implications and partly because of its practical prevalence: approximately half the world's population is estimated to use more than one language regularly. Early research suggested that bilingualism might confuse or delay language development; subsequent, more rigorous research has found that bilingual children acquire both languages at a normal pace and that the apparent "mixing" of languages in early speech reflects an active strategy rather than confusion. Bilingualism has been associated with advantages in executive function tasks requiring inhibition and cognitive flexibility, though the size and reliability of these effects has been debated in recent years.

The implications of language acquisition research are extensive. In education, understanding how children learn language provides guidance for early literacy instruction, for the teaching of second languages, and for interventions supporting children with language disorders. Developmental language disorder—a significant and persistent difficulty with language development that affects approximately seven percent of children and is not explained by hearing loss or intellectual disability—is now recognised as one of the most common neurodevelopmental conditions. Early identification and targeted intervention can substantially improve outcomes, making language acquisition research not merely academically interesting but practically consequential.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What is the main evidence Chomsky and nativists use to support the idea of an innate language capacity?',
          options: [
            'Children learn language faster when parents use simplified speech with them.',
            'The language input children receive is too limited to explain the grammatical knowledge they develop.',
            'Children from different cultures acquire language at very different rates.',
            'Computational models have failed to reproduce human grammatical knowledge.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What do empiricist accounts of language acquisition emphasise?',
          options: [
            'The role of a language-specific brain module in enabling rapid grammar learning.',
            'The importance of formal schooling in developing complex grammatical knowledge.',
            'General learning mechanisms operating on statistical patterns in the language children hear.',
            'The universality of grammatical structures across all human languages.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What does Michael Tomasello argue distinguishes human language acquisition from primate communication?',
          options: [
            'Humans possess an innate universal grammar that other primates lack.',
            'The capacity for joint attention, which allows children to track what a speaker is referring to.',
            'The unique ability of human children to imitate sounds with great precision.',
            'The larger brain size of humans, which enables a greater memory for vocabulary.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does recent research suggest about language mixing in bilingual children?',
          options: [
            'It is evidence of confusion caused by learning two languages simultaneously.',
            'It is an active and strategic behaviour rather than a sign of developmental difficulty.',
            'It always leads to long-term deficits in both languages.',
            'It is unique to children who learn two languages sequentially rather than simultaneously.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Nativist theories of language acquisition are currently accepted by all leading researchers in the field.\n32. {{32}}: Child-directed speech appears to be specifically adapted to support language learning.\n33. {{33}}: Infants become better at distinguishing the sounds of foreign languages as they grow older.\n34. {{34}}: The "vocabulary explosion" typically occurs between eighteen and twenty-four months.\n35. {{35}}: Bilingual children consistently show stronger academic performance than monolingual children.\n36. {{36}}: Developmental language disorder affects approximately seven percent of children and can be improved with early intervention.`,
          blanks: [
            { num: 31, answers: ['NOT GIVEN'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NO'] },
            { num: 34, answers: ['YES'] },
            { num: 35, answers: ['NOT GIVEN'] },
            { num: 36, answers: ['YES'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r3-sent',
          part: 7,
          qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. Chomsky's proposed innate biological capacity for language is sometimes called {{37}} grammar.\n38. The simplified speech that caregivers direct at young children is referred to as {{38}} speech.\n39. The ability to share attention to an object or event with another person is called {{39}} attention.\n40. A persistent difficulty with language development affecting around seven percent of children is known as developmental {{40}} disorder.`,
          blanks: [
            { num: 37, answers: ['universal'] },
            { num: 38, answers: ['child-directed'] },
            { num: 39, answers: ['joint'] },
            { num: 40, answers: ['language'] },
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
          imageUrl: '/assets/ielts/charts/set18-task1.svg',
          imageAlt: 'Process diagram showing the stages of plastic recycling from collection to new products',
          stimulus: 'The diagram below shows the stages involved in the recycling of plastic waste, from initial collection through to the manufacture of new products.',
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
          stimulus: 'Genetic technologies such as CRISPR gene editing offer the potential to cure inherited diseases, but also raise ethical concerns about how these technologies might be used in the future.',
          text: 'Do the potential benefits of genetic engineering outweigh the risks? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about languages and communication',
          followUp: [
            'How many languages do you speak, and how did you learn them?',
            'Do you think it is important to speak more than one language? Why?',
            'Have you ever experienced difficulties communicating with someone because of a language barrier?',
            'Do you think technology like translation apps will ever replace the need to learn foreign languages?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe an invention or piece of technology that has changed your life significantly.\n\nYou should say:\n• what the invention or technology is\n• how you use it in your daily life\n• how life would be different without it\n• and explain why you consider it so important`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Technology, science, and ethics',
          followUp: [
            'Should there be international limits on how genetic technologies can be used?',
            'Do you think smart city surveillance is an acceptable trade-off for improved safety and efficiency?',
            'Who should have the right to make decisions about new and potentially dangerous technologies?',
            'How can societies ensure that the benefits of scientific advances are shared fairly?',
          ],
        },
      ],
    },
  ],
};

export default mock;
