import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-10',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 10',
  subtitle: 'Microplastics · The Sharing Economy · Memory and Identity',
  timeMinutes: 120,
  sections: [
    { part: 1, skill: 'listening', comingSoon: true, title: 'Listening — En Construcción', instructions: 'Esta sección estará disponible próximamente.', questions: [] },

    {
      part: 5, skill: 'reading',
      title: 'Reading — Passage 1: Microplastics in the Ocean',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Microplastics in the Ocean

Plastic pollution has become one of the most visible and alarming symptoms of humanity's impact on the natural environment. Millions of tonnes of plastic enter the world's oceans each year, where it persists indefinitely—plastic does not biodegrade but rather breaks down into progressively smaller fragments. Particles smaller than five millimetres in diameter are classified as microplastics, and their presence now pervades every marine environment on Earth, from the surface of the Arctic Ocean to the sediments of the deepest ocean trenches.

The sources of microplastics are numerous and varied. Primary microplastics are manufactured at microscopic size for specific industrial or consumer purposes: microbeads used in cosmetic exfoliants and toothpastes, and pellets known as nurdles that are the raw material from which larger plastic products are moulded. Secondary microplastics result from the gradual fragmentation of larger plastic items—bottles, bags, fishing gear, synthetic clothing—under the combined action of ultraviolet radiation, wave action, and mechanical abrasion. A single washing-machine cycle involving synthetic garments can release hundreds of thousands of microfibre particles into wastewater.

Marine organisms interact with microplastics at multiple levels of the food web. Filter feeders such as mussels and oysters ingest particles indiscriminately alongside their normal food. Fish and seabirds confuse floating microplastic fragments for food items, with serious consequences: laboratory studies have shown that fish exposed to microplastics exhibit reduced feeding behaviour, impaired reproduction, and liver stress. Chemical concerns compound the physical ones: microplastics are highly effective scavengers of persistent organic pollutants (POPs) in seawater, concentrating toxic chemicals that then enter the food chain when the plastic is ingested.

Human exposure to microplastics is now effectively universal. Studies have detected microplastics in human blood, lung tissue, placental tissue, and breast milk. The health consequences of this exposure are not yet fully characterised, but laboratory studies have identified potential mechanisms of harm: microplastic particles have been shown to cause inflammatory responses in human cell cultures, and certain plastic additives—plasticisers and stabilisers—are established endocrine disruptors that interfere with hormonal regulation.

The regulatory response to microplastic pollution has been partial and slow. Several countries including the United States, the United Kingdom, and France have banned the use of microbeads in cosmetics. However, these measures address only a fraction of the problem: microbeads account for a small proportion of total microplastic input compared to secondary microplastics from larger items. More comprehensive solutions require addressing plastic production and waste management at the source—reducing the volume of plastic manufactured, improving recycling infrastructure, and developing materials that degrade safely in the environment. In 2022, United Nations member states agreed to negotiate a legally binding international treaty on plastic pollution, widely described as the most significant environmental agreement since the Paris Climate Accord.`,
      questions: [
        {
          type: 'formgroup', id: 'r1-tfng', part: 5, qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Microplastics are defined as plastic particles smaller than five millimetres in diameter.\n2. {{2}}: Nurdles are primary microplastics used as raw material to make larger plastic products.\n3. {{3}}: Synthetic clothing is the main source of microplastic pollution worldwide.\n4. {{4}}: Laboratory studies have shown fish exposed to microplastics experience reduced feeding behaviour.\n5. {{5}}: Microplastics have been detected in human blood and placental tissue.\n6. {{6}}: The United States has banned microbeads in all consumer products, not just cosmetics.\n7. {{7}}: United Nations member states agreed to negotiate a plastic pollution treaty in 2022.`,
          blanks: [
            { num: 1, answers: ['TRUE'] }, { num: 2, answers: ['TRUE'] }, { num: 3, answers: ['NOT GIVEN'] },
            { num: 4, answers: ['TRUE'] }, { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['NOT GIVEN'] }, { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup', id: 'r1-sent', part: 5, qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `8. Plastic does not {{8}} but instead breaks into progressively smaller fragments.\n9. Fragmentation of larger plastics occurs through ultraviolet radiation, wave action, and {{9}}.\n10. Microplastics scavenge {{10}} from seawater, concentrating toxins that enter the food chain.\n11. Certain plastic additives are known {{11}} that interfere with hormonal regulation.\n12. Microbead bans address only a small proportion of microplastic input compared to {{12}} microplastics.\n13. The 2022 plastic pollution treaty was described as the most significant environmental agreement since the {{13}}.`,
          blanks: [
            { num: 8, answers: ['biodegrade'] }, { num: 9, answers: ['mechanical abrasion'] },
            { num: 10, answers: ['persistent organic pollutants', 'POPs'] },
            { num: 11, answers: ['endocrine disruptors'] }, { num: 12, answers: ['secondary'] },
            { num: 13, answers: ['Paris Climate Accord'] },
          ],
        },
      ],
    },

    {
      part: 6, skill: 'reading',
      title: 'Reading — Passage 2: The Sharing Economy',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `The Sharing Economy

A. The term "sharing economy" describes a model of economic activity in which individuals share access to goods, services, or skills, typically mediated by digital platforms. Ride-sharing, home-sharing, tool libraries, peer-to-peer lending, and skill-exchange platforms all fall under this broad category. Proponents describe it as a more efficient, sustainable, and community-oriented alternative to traditional consumption; critics argue that many so-called sharing platforms are simply new mechanisms for commercial transaction, with the environmental and social benefits frequently overstated.

B. The sharing economy's growth has been dramatic. Airbnb, founded in 2008, now lists more rooms than the world's five largest hotel chains combined. Uber operates in over 70 countries and has fundamentally disrupted the taxi industry in dozens of cities. Beyond these headline platforms, thousands of smaller services facilitate the rental of cars, bicycles, formal wear, power tools, and storage space. The aggregate value of transactions flowing through sharing economy platforms reached an estimated 335 billion US dollars globally in 2025, up from virtually zero in 2010.

C. Environmental claims for the sharing economy are mixed. In theory, sharing reduces the total number of assets that need to be produced: a shared car replaces multiple privately owned vehicles, reducing manufacturing, raw material consumption, and parking infrastructure demand. In practice, however, research has found that ride-sharing services increase the total vehicle kilometres travelled in cities rather than reducing them, because they attract passengers from walking, cycling, and public transport rather than from car ownership. Similarly, home-sharing has been shown in some markets to increase accommodation demand and tourism-related travel, potentially generating more carbon emissions than traditional hotel use.

D. The disruption of regulated industries is a persistent source of controversy. The hotel industry argues that home-sharing platforms operate at a competitive advantage by avoiding hotel taxes, fire safety regulations, and disability access requirements. Taxi industries have lobbied strenuously against ride-sharing platforms that they claim circumvent licensing and insurance requirements designed to protect consumers. Regulators have responded inconsistently: some cities have embraced platforms while negotiating new forms of compliance, while others have sought outright bans. Amsterdam, Barcelona, and New York City have all introduced restrictions on short-term rentals following evidence that home-sharing had contributed to housing shortages and rising rents for permanent residents.

E. Workers in the sharing economy—already discussed in relation to the gig economy—face significant vulnerabilities. While platform companies emphasise the freedom and autonomy they offer, the absence of employment protections means that a platform's algorithmic decisions—about pricing, job allocation, and account termination—can have immediate and severe consequences for a worker's livelihood. Research has documented cases in which workers were deactivated from platforms without explanation or recourse, losing their primary income with no entitlement to notice pay or appeal.

F. Despite these critiques, genuine sharing—distinct from commercial platform activity—does deliver social and economic value. Community sharing libraries, tool exchanges, community-supported agriculture schemes, and informal skill-swap networks provide goods and services in ways that build social capital, reduce waste, and strengthen local communities. Whether these forms of sharing can be scaled or whether they remain inherently small-scale is an unresolved question. Some researchers argue that the true potential of the sharing economy lies not in billion-dollar platforms but in the revival of pre-market forms of mutual aid—reimagined for a networked, urban world.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'Specific cities that have restricted short-term rental platforms', answer: 'D' },
            { num: 15, stem: 'A description of the potential benefits of community-based, non-commercial sharing', answer: 'F' },
            { num: 16, stem: 'Evidence that ride-sharing may increase rather than decrease vehicle use in cities', answer: 'C' },
            { num: 17, stem: 'Global financial data illustrating the rapid growth of sharing economy platforms', answer: 'B' },
            { num: 18, stem: 'An example of a worker losing income due to an automated platform decision', answer: 'E' },
            { num: 19, stem: 'A broad definition of the sharing economy and a summary of debates about its nature', answer: 'A' },
            { num: 20, stem: 'Arguments made by the traditional taxi industry against ride-sharing services', answer: 'D' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' }, { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' }, { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' }, { letter: 'F', text: 'Paragraph F' },
          ],
        },
        {
          type: 'formgroup', id: 'r2-sent', part: 6, qRange: [21, 26],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `21. Airbnb now lists more rooms than the world's {{21}} largest hotel chains combined.\n22. Research found that ride-sharing attracts passengers from {{22}}, cycling, and public transport.\n23. The hotel industry argues that home-sharing platforms avoid hotel taxes and {{23}} regulations.\n24. Some cities have introduced {{24}} on short-term rentals because of rising rents for permanent residents.\n25. Platform companies emphasise the {{25}} and autonomy that gig workers enjoy.\n26. Community sharing schemes build {{26}}, reduce waste, and strengthen local communities.`,
          blanks: [
            { num: 21, answers: ['five'] }, { num: 22, answers: ['walking'] },
            { num: 23, answers: ['fire safety'] }, { num: 24, answers: ['restrictions'] },
            { num: 25, answers: ['freedom'] }, { num: 26, answers: ['social capital'] },
          ],
        },
      ],
    },

    {
      part: 7, skill: 'reading',
      title: 'Reading — Passage 3: Memory and Identity',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Memory and Identity

Memory is foundational to personal identity. The philosopher John Locke argued in the seventeenth century that personal identity consists in continuity of consciousness—specifically, in the ability to remember past experiences as one's own. On this account, you are the same person who woke up this morning because you remember waking up; you are the same person who attended school as a child because you can recall the experience. Memory, in Locke's framework, is not merely a record of the past but the very substance of the self.

This philosophical intuition is supported, in a qualified way, by neuroscience. The hippocampus—a structure deep in the medial temporal lobe—plays a critical role in the formation of episodic memories: memories of specific events tied to particular times and places. When the hippocampus is damaged, as in the celebrated case of patient H.M., who had large portions of both hippocampi removed in 1953 to control severe epilepsy, the ability to form new long-term memories is profoundly impaired. H.M. could remember his life before the surgery in broad outline but was unable to form lasting memories of anything that happened afterwards. He met his doctors daily for decades but greeted them each time as strangers. His case revealed that memory is not a single, unified faculty but a collection of distinct systems, each supported by different neural structures.

Not all memory is explicit and declarative. Procedural memory—the memory of skills and habits—operates largely independently of the hippocampus and remains intact even in patients with severe amnesia. H.M. was able to learn new motor skills, such as tracing a star shape while viewing his hand in a mirror, even though he had no conscious recollection of having practised the task. This dissociation between knowing how and knowing that reveals that human identity is not constituted solely by the narrative memory championed by Locke, but by a deeper layer of embodied, non-narrative competence.

Memory is also far more malleable than the metaphor of a "recording" implies. Memories are not stored like files on a computer but are reconstructed each time they are recalled, incorporating new information, subsequent experience, and current emotional states. The psychologist Elizabeth Loftus conducted landmark research demonstrating that people can be induced to form detailed and confident false memories through suggestive questioning. In one celebrated paradigm, subjects who were told that they had been lost in a shopping mall as children subsequently developed elaborate false memories of the event, complete with sensory details. This malleability has profound implications for the reliability of eyewitness testimony in legal contexts—an area where research has driven significant reforms in many jurisdictions.

The social dimension of memory is equally important. Psychologists distinguish between individual memory and collective or social memory: the shared narratives through which communities, nations, and cultures make sense of their past. Social memory is maintained through rituals, monuments, commemorations, and storytelling. It is also subject to political contestation: which events are remembered, how they are framed, and whose experiences are centred are never neutral questions. The ongoing debates in many countries about how history is taught in schools, and which historical figures deserve public commemoration, reflect the deep connection between collective memory and contemporary identity politics.

The question of how memory should be understood in an age of digital documentation adds further complexity. Photographs, videos, social media posts, and search histories now record experiences in unprecedented detail. Some researchers argue that digital memory supplements biological memory productively, freeing cognitive resources for higher-order thinking. Others warn that the outsourcing of memory to devices impairs the development of the neural networks that underpin deep comprehension and wisdom. The relationship between remembering and understanding, these researchers suggest, is more intimate than the simple storage metaphor implies.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'What does Locke\'s theory of personal identity, as described in the passage, claim?',
          options: [
            'Personal identity is constituted by physical continuity of the body over time.',
            'Personal identity consists in the continuity of consciousness through memory.',
            'Personal identity is a philosophical illusion with no neurological basis.',
            'Personal identity depends on social recognition rather than individual memory.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'What does the case of patient H.M. primarily demonstrate about memory?',
          options: [
            'That the hippocampus is responsible for all types of human memory.',
            'That memory is a single unified system located in one brain region.',
            'That memory consists of distinct systems supported by different neural structures.',
            'That procedural memory is more important than episodic memory for personal identity.',
          ],
          answer: 2,
        },
        {
          type: 'mcq', id: 'r3-q29', part: 7,
          text: 'What did Elizabeth Loftus\'s research demonstrate?',
          options: [
            'That memories are stored permanently and cannot be altered once formed.',
            'That people can develop detailed false memories through suggestive questioning.',
            'That eyewitness testimony is generally more reliable than previously thought.',
            'That children are better at forming false memories than adults.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q30', part: 7,
          text: 'What concern do some researchers express about digital memory tools?',
          options: [
            'That they store too little information to be genuinely useful.',
            'That they may impair the development of neural networks underlying comprehension.',
            'That they make memories too accurate, preventing the normal process of forgetting.',
            'That they cause people to share private memories inappropriately.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup', id: 'r3-ynng', part: 7, qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: H.M.'s surgery successfully controlled his epilepsy.\n32. {{32}}: H.M. was unable to learn new motor skills after his surgery.\n33. {{33}}: Procedural memory is primarily supported by the hippocampus.\n34. {{34}}: Research on false memories has led to reforms in how eyewitness testimony is used in legal proceedings.\n35. {{35}}: Social memory is always an accurate record of historical events.\n36. {{36}}: The writer argues that digital tools are ultimately beneficial for human memory.`,
          blanks: [
            { num: 31, answers: ['NOT GIVEN'] }, { num: 32, answers: ['NO'] }, { num: 33, answers: ['NO'] },
            { num: 34, answers: ['YES'] }, { num: 35, answers: ['NO'] }, { num: 36, answers: ['NOT GIVEN'] },
          ],
        },
        {
          type: 'formgroup', id: 'r3-sent', part: 7, qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. The hippocampus plays a critical role in forming {{37}} memories tied to specific times and places.\n38. H.M.'s ability to learn motor skills despite amnesia shows a distinction between knowing {{38}} and knowing that.\n39. Memories are not stored like files but are {{39}} each time they are recalled.\n40. Social memory is maintained through rituals, monuments, and {{40}}.`,
          blanks: [
            { num: 37, answers: ['episodic'] }, { num: 38, answers: ['how'] },
            { num: 39, answers: ['reconstructed'] }, { num: 40, answers: ['storytelling'] },
          ],
        },
      ],
    },

    {
      part: 8, skill: 'writing', title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [{
        type: 'write', id: 'w1', part: 8, taskNumber: 1,
        imageUrl: '/assets/ielts/charts/set10-task1.svg',
        imageAlt: 'Line graph showing unemployment rates in three countries from 2008 to 2022',
        stimulus: 'The line graph below shows the unemployment rate (as a percentage of the labour force) in three countries between 2008 and 2022.',
        text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'In many countries, people are moving away from rural areas and into cities. This trend is likely to continue in the future.',
        text: 'What are the main causes of this trend? What are its effects on both urban and rural areas? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
      }],
    },
    {
      part: 10, skill: 'speaking', title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak', id: 'sp1', part: 10, partNumber: 1,
          text: 'Part 1 — Personal questions about the environment',
          followUp: [
            'How concerned are you about environmental issues such as climate change?',
            'What do you do in your daily life to reduce your impact on the environment?',
            'Do you think individuals or governments bear more responsibility for protecting the environment?',
            'Has environmental awareness changed in your country in recent years?',
          ],
        },
        {
          type: 'speak', id: 'sp2', part: 10, partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a place in nature that you have visited and found particularly impressive or memorable.\n\nYou should say:\n• where the place is and how you got there\n• what the natural environment was like\n• what you did or saw there\n• and explain why this place had such an impact on you`,
        },
        {
          type: 'speak', id: 'sp3', part: 10, partNumber: 3,
          text: 'Part 3 — Discussion: Environment and sustainability',
          followUp: [
            'Do you think economic development and environmental protection can coexist? How?',
            'What role should international organisations play in addressing global environmental problems?',
            'Are there any environmental policies in your country that you think are particularly effective or ineffective?',
            'How might climate change affect daily life in your country in the next 30 years?',
          ],
        },
      ],
    },
  ],
};

export default mock;
