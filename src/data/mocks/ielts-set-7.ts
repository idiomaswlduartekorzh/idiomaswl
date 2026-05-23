import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-7',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 7',
  subtitle: 'Biomimicry · Blue Zones · Linguistic Relativity',
  timeMinutes: 120,
  sections: [
    { part: 1, skill: 'listening', comingSoon: true, title: 'Listening — En Construcción', instructions: 'Esta sección estará disponible próximamente.', questions: [] },

    {
      part: 5, skill: 'reading',
      title: 'Reading — Passage 1: Biomimicry in Design',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Biomimicry in Design

Nature has spent approximately 3.8 billion years refining its designs through the trial and error of evolution. The result is an extraordinary library of solutions to engineering problems—structures that are simultaneously strong and lightweight, surfaces that repel water without synthetic chemicals, navigation systems that operate without GPS. Biomimicry is the practice of studying and imitating these biological strategies to address human design challenges, and it is increasingly recognised as a powerful tool for innovation across architecture, materials science, and product engineering.

The term was popularised by biologist Janine Benyus in her 1997 book Biomimicry: Innovation Inspired by Nature. Benyus argued that rather than merely extracting resources from the natural world, designers and engineers should treat nature as a mentor, learning from the elegance and efficiency of biological systems. The concept was not new—inventors had always drawn inspiration from nature—but Benyus provided a systematic framework for doing so, and her work catalysed a new field of research and practice.

Some of the most celebrated examples of biomimicry involve architecture. The Eastgate Centre in Harare, Zimbabwe, designed by architect Mick Pearce in the 1990s, takes its cues from the ventilation strategies of African termite mounds. Despite the intense heat of the Zimbabwean climate, termite mounds maintain a remarkably stable internal temperature because of a system of vents and tunnels that allow hot air to rise and be expelled while cool air is drawn from below. Pearce replicated this principle in the Eastgate Centre using a passive cooling system that requires no conventional air conditioning, reducing the building's energy consumption by approximately ninety percent compared to a conventional building of similar size.

A second compelling example comes from materials science. The Namib Desert beetle (Stenocara gracilipes) survives in one of the world's driest environments by collecting water from fog. Its back is covered with tiny bumps: the tips of the bumps are hydrophilic (water-attracting) while the sides are hydrophobic (water-repelling). Water droplets from fog collect on the tips and then roll down the hydrophobic slopes toward the beetle's mouth. Engineers have applied this principle to develop fog-collecting surfaces for water harvesting in arid regions and to create self-cleaning glass that channels water efficiently across its surface.

The aerospace and transport industries have also drawn extensively on biological models. Humpback whale flippers inspired the development of tubercle technology—small bumps on the leading edges of wind turbine blades and aircraft wings that reduce drag and improve efficiency at lower wind or airspeed. The noses of Japan's Shinkansen bullet trains were redesigned based on the beak of the kingfisher, a bird that transitions between air and water with minimal turbulence. The redesign solved an engineering problem (pressure waves caused by the train entering tunnels) while simultaneously reducing energy consumption by fifteen percent.

Critics of biomimicry note that natural selection does not produce optimal designs but rather "good enough" solutions constrained by evolutionary history, available materials, and developmental pathways. A bat's wing, however elegant, is not the most efficient possible wing—it is the most efficient wing achievable given the constraints of the mammalian skeletal system. Nevertheless, even imperfect biological solutions often offer insights that purely mathematical optimisation fails to generate. The growing field of bioinspired computing, in which algorithms modelled on processes such as ant colony optimisation and neural learning are applied to complex engineering and logistics problems, illustrates how broadly biological principles can be applied beyond their original context.`,
      questions: [
        {
          type: 'formgroup', id: 'r1-tfng', part: 5, qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Janine Benyus coined the word "biomimicry" in a scientific journal article.\n2. {{2}}: The Eastgate Centre uses a cooling system similar to that found in termite mounds.\n3. {{3}}: The Eastgate Centre consumes about ninety percent less energy than a conventional building.\n4. {{4}}: The Namib Desert beetle collects water from rain using its bumped surface.\n5. {{5}}: Tubercle technology was first applied to wind turbines before aircraft wings.\n6. {{6}}: The Shinkansen's redesigned nose was modelled on the beak of the kingfisher.\n7. {{7}}: Critics argue that natural selection always produces the most mathematically optimal design.`,
          blanks: [
            { num: 1, answers: ['FALSE'] }, { num: 2, answers: ['TRUE'] }, { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] }, { num: 5, answers: ['NOT GIVEN'] }, { num: 6, answers: ['TRUE'] }, { num: 7, answers: ['FALSE'] },
          ],
        },
        {
          type: 'formgroup', id: 'r1-sent', part: 5, qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `8. The bumps on the Namib beetle's back have {{8}} tips that attract water droplets from fog.\n9. Water rolls towards the beetle's mouth along the {{9}} slopes of each bump.\n10. Small bumps on wind turbine blades, inspired by whale flippers, are called {{10}} technology.\n11. The Shinkansen nose redesign reduced energy consumption by {{11}} percent.\n12. Critics note that natural selection is constrained by evolutionary {{12}} and available materials.\n13. Algorithms modelled on biological processes form the basis of {{13}} computing.`,
          blanks: [
            { num: 8, answers: ['hydrophilic'] }, { num: 9, answers: ['hydrophobic'] },
            { num: 10, answers: ['tubercle'] }, { num: 11, answers: ['fifteen'] },
            { num: 12, answers: ['history'] }, { num: 13, answers: ['bioinspired'] },
          ],
        },
      ],
    },

    {
      part: 6, skill: 'reading',
      title: 'Reading — Passage 2: Blue Zones — The Science of Longevity',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `Blue Zones — The Science of Longevity

A. In 2004, journalist Dan Buettner, working with demographers and epidemiologists, identified five regions of the world with unusually high concentrations of centenarians—people who live to age one hundred or beyond. Buettner called these regions "Blue Zones," a term derived from the blue ink demographers used to mark areas of interest on maps. The five zones are: Sardinia in Italy; Okinawa in Japan; Loma Linda in California; the Nicoya Peninsula in Costa Rica; and the island of Ikaria in Greece. Despite their geographical and cultural diversity, researchers identified a set of lifestyle characteristics common to all five populations.

B. Physical activity in Blue Zone populations is not the vigorous, scheduled exercise of gym culture. Rather, it is embedded in daily routine: walking to village markets, tending gardens, herding animals, kneading bread. Okinawan elders sit on the floor to eat and rest, which means they rise and lower themselves dozens of times daily, engaging muscle groups that sedentary chair-bound living leaves dormant. Sardinian shepherds walk hilly terrain for hours each day as a natural consequence of their occupation. Research suggests that this form of low-intensity, continuous movement may confer health benefits distinct from those of intermittent high-intensity exercise.

C. Diet in the Blue Zones is overwhelmingly plant-based, though rarely completely vegetarian. Legumes—beans, lentils, and soya—are a dietary staple across all five regions, consumed daily in substantial quantities. Meat, particularly red meat, is eaten sparingly—typically only on festive occasions—and fish consumption varies considerably between populations. Caloric intake is generally moderate: Okinawans follow a cultural practice called hara hachi bu, a Confucian-influenced principle of eating until one is eighty percent full. Moderate alcohol consumption is common in several zones, particularly red wine in Sardinia, though researchers note that this correlation requires careful interpretation.

D. Social integration appears to be a critical factor. In all five zones, older people are embedded in strong social networks and maintain clear social roles. Okinawans belong to lifelong social support groups called moai, which provide mutual aid in times of difficulty and regular social connection throughout life. Sardinian culture places high value on intergenerational living: elderly grandparents typically live with or very close to adult children and grandchildren, participating actively in family and community life. Research in social epidemiology consistently finds that social isolation is associated with health outcomes comparable in severity to smoking fifteen cigarettes a day.

E. A sense of purpose—articulated in Okinawan culture as ikigai, "the reason for getting up in the morning"—and, separately, stress-reduction practices are features common to all zones. Nicoyans speak of their plan de vida, or life plan, as a core source of meaning. Seventh-day Adventists in Loma Linda observe a weekly Sabbath as a regular pause from the pressures of daily life. Sardinians decompress through daily social rituals, including extended family meals. The mechanisms by which psychological wellbeing translates into longevity are not fully understood, but the connection is robust across multiple research traditions.

F. Researchers are careful to note the limitations of Blue Zone research. The data on centenarian concentrations, particularly in some regions, may be affected by poor historical record-keeping and inflated claims of age. Confounding variables—genetics, geography, selective migration—make it difficult to isolate the causal effect of any single lifestyle factor. Nonetheless, the convergence of so many independent populations around similar habits has persuaded many public health researchers that the Blue Zone lifestyle represents a meaningful and replicable model for extending healthy life expectancy.`,
      questions: [
        {
          type: 'matching', id: 'r2-match', part: 6, qRange: [14, 20],
          groupLabel: 'The passage has six paragraphs, A–F. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of a cultural practice that limits food intake at mealtimes', answer: 'C' },
            { num: 15, stem: 'A warning that the longevity data may be unreliable in some regions', answer: 'F' },
            { num: 16, stem: 'Details of a social support structure used in Japan', answer: 'D' },
            { num: 17, stem: 'An explanation of how occupation naturally provides physical activity', answer: 'B' },
            { num: 18, stem: 'A reference to the cultural concept of having a sense of life purpose', answer: 'E' },
            { num: 19, stem: 'The origin of the term "Blue Zone" and the five regions identified', answer: 'A' },
            { num: 20, stem: 'A comparison between the health risks of social isolation and smoking', answer: 'D' },
          ],
          endings: [
            { letter: 'A', text: 'Paragraph A' }, { letter: 'B', text: 'Paragraph B' },
            { letter: 'C', text: 'Paragraph C' }, { letter: 'D', text: 'Paragraph D' },
            { letter: 'E', text: 'Paragraph E' }, { letter: 'F', text: 'Paragraph F' },
          ],
        },
        {
          type: 'formgroup', id: 'r2-table', part: 6, qRange: [21, 26],
          groupLabel: 'Complete the table below. Choose NO MORE THAN TWO WORDS from the passage.',
          title: 'Blue Zones — Key Features',
          template: `21. Physical activity: Embedded in daily routine; not {{21}} exercise.\n22. Diet staple: {{22}} consumed daily in all five zones.\n23. Okinawan eating principle: Called {{23}}: eating until 80% full.\n24. Okinawan social group: Lifelong support groups called {{24}}.\n25. Okinawan life purpose: Called {{25}}: "the reason for getting up".\n26. Research limitation: {{26}} variables such as genetics make causation hard to isolate.`,
          blanks: [
            { num: 21, answers: ['formal', 'organised', 'structured'] },
            { num: 22, answers: ['Legumes'] },
            { num: 23, answers: ['hara hachi bu'] },
            { num: 24, answers: ['moais', 'moai'] },
            { num: 25, answers: ['ikigai'] },
            { num: 26, answers: ['Confounding'] },
          ],
        },
      ],
    },

    {
      part: 7, skill: 'reading',
      title: 'Reading — Passage 3: Linguistic Relativity',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Linguistic Relativity

The hypothesis of linguistic relativity—the idea that the language one speaks influences how one perceives and thinks about the world—has generated intense debate in linguistics, psychology, and cognitive science for more than a century. In its strongest form, the Sapir-Whorf hypothesis (named after linguists Edward Sapir and Benjamin Lee Whorf) holds that language determines thought: that people who speak different languages inhabit incommensurable cognitive worlds. This strong version has been largely discredited. A weaker but more defensible version—that language influences certain cognitive tendencies and perceptions without determining them—has accumulated considerable empirical support in recent decades.

The evidence comes from a wide range of linguistic domains. Colour perception has been particularly well-studied. Languages vary dramatically in how they partition the colour spectrum: Russian, for example, makes a lexical distinction between light blue (goluboy) and dark blue (siniy) that English does not; the Pirahã language of the Amazon basin has no specific colour terms at all. A series of experiments by researchers including Paul Kay and Terry Regier found that speakers of languages with a specific lexical distinction between two colour categories are faster at discriminating between colours from different categories than speakers of languages without the distinction—but only for stimuli in the right visual field (processed by the left hemisphere, where language is typically located). This asymmetry suggests that language influences real-time perception, though not in an absolute or deterministic way.

Spatial cognition offers another revealing domain. In Kuuk Thaayorre, an Aboriginal Australian language, speakers use absolute cardinal directions (north, south, east, west) for all spatial reference rather than ego-centred terms (left, right, in front, behind). Researchers found that Kuuk Thaayorre speakers maintain a constant, accurate sense of cardinal direction regardless of their orientation—a remarkable navigational ability that is not characteristically observed in speakers of ego-centred languages. Whether this ability is caused by the language or merely correlated with cultural practices that both produce the language and the navigation skill is an ongoing debate.

Grammatical gender provides further evidence. In languages where nouns are assigned grammatical gender—German, French, Spanish—the gender of a noun has been shown to influence the adjectives and metaphors speakers use to describe the referent. German speakers, for whom the word for "bridge" (Brücke) is feminine, more often describe bridges using adjectives like "beautiful" and "elegant"; Spanish speakers, for whom puente is masculine, more often use adjectives like "strong" and "sturdy." These effects, while small, are consistent across multiple studies and have been replicated even when the instructions are given in a different language.

Critics of linguistic relativity research raise important methodological objections. Many of the effects reported are small in magnitude and sensitive to experimental conditions. The causal arrow is difficult to establish: rather than language shaping thought, cultural practices may independently shape both language and cognition. There are also concerns about publication bias—the tendency for journals to publish positive results while null findings accumulate unpublished. A comprehensive meta-analysis of linguistic relativity studies published in 2012 found effect sizes were generally modest but significantly above chance, suggesting that while language does not determine thought, it may subtly tune the cognitive tools available for particular tasks.

The practical implications of linguistic relativity are modestly significant. In second-language acquisition, understanding that a learner's native language may predispose them to perceive and categorise the world in particular ways can inform pedagogical strategies. In cross-cultural communication, awareness that linguistic structure shapes subtle perceptual and categorical tendencies may promote greater patience with misunderstandings that arise not from logic but from deeply embedded linguistic habits.`,
      questions: [
        {
          type: 'mcq', id: 'r3-q27', part: 7,
          text: 'What does the passage say about the strong version of the Sapir-Whorf hypothesis?',
          options: [
            'It has been confirmed by multiple empirical studies.',
            'It has been largely rejected, though a weaker version has support.',
            'It is still debated but has not been tested experimentally.',
            'It applies only to colour perception and spatial cognition.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q28', part: 7,
          text: 'What did the colour perception experiments described in the passage find?',
          options: [
            'Speakers of all languages discriminate colours at the same speed.',
            'Only languages with no colour terms showed differences in colour perception.',
            'Speakers whose language distinguishes two colour categories were faster at discriminating those colours, but only in one visual field.',
            'Colour perception is entirely determined by the number of colour terms in a language.',
          ],
          answer: 2,
        },
        {
          type: 'mcq', id: 'r3-q29', part: 7,
          text: 'What notable ability have Kuuk Thaayorre speakers been shown to possess?',
          options: [
            'The ability to use ego-centred terms more accurately than other speakers.',
            'A consistently accurate sense of cardinal direction regardless of orientation.',
            'Superior colour discrimination compared to other Aboriginal language speakers.',
            'The ability to learn spatial terms in English significantly faster than other groups.',
          ],
          answer: 1,
        },
        {
          type: 'mcq', id: 'r3-q30', part: 7,
          text: 'What does the research on grammatical gender described in the passage show?',
          options: [
            'That German and Spanish speakers describe all objects identically regardless of grammatical gender.',
            'That grammatical gender influences the adjectives speakers use to describe things.',
            'That grammatical gender effects disappear when instructions are given in a different language.',
            'That French speakers show stronger grammatical gender effects than Spanish or German speakers.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup', id: 'r3-ynng', part: 7, qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The Pirahã language has a very large number of specific colour terms.\n32. {{32}}: The left hemisphere of the brain is typically where language is processed.\n33. {{33}}: The navigational ability of Kuuk Thaayorre speakers is definitively caused by their language.\n34. {{34}}: The grammatical gender effects reported in research are consistent across multiple studies.\n35. {{35}}: Publication bias means negative findings are less likely to be published than positive ones.\n36. {{36}}: The writer suggests that awareness of linguistic relativity can improve cross-cultural communication.`,
          blanks: [
            { num: 31, answers: ['NO'] }, { num: 32, answers: ['YES'] }, { num: 33, answers: ['NOT GIVEN'] },
            { num: 34, answers: ['YES'] }, { num: 35, answers: ['YES'] }, { num: 36, answers: ['YES'] },
          ],
        },
        {
          type: 'formgroup', id: 'r3-sent', part: 7, qRange: [37, 40],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          template: `37. The hypothesis that language influences thought is sometimes called the {{37}} hypothesis.\n38. Russian distinguishes between light blue (goluboy) and dark blue with a different {{38}}.\n39. The 2012 meta-analysis found effect sizes were generally modest but above {{39}}.\n40. In second-language education, understanding linguistic relativity can inform {{40}} strategies.`,
          blanks: [
            { num: 37, answers: ['Sapir-Whorf'] }, { num: 38, answers: ['lexical'] },
            { num: 39, answers: ['chance'] }, { num: 40, answers: ['pedagogical'] },
          ],
        },
      ],
    },

    {
      part: 8, skill: 'writing', title: 'Writing — Task 1',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      questions: [{
        type: 'write', id: 'w1', part: 8, taskNumber: 1,
        imageUrl: '/assets/ielts/charts/set7-task1.svg',
        imageAlt: 'Two pie charts comparing energy sources in Germany and France in 2022',
        stimulus: 'The pie charts below show the percentage share of electricity generation by energy source in Germany and France in 2022.',
        text: 'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
        minWords: 150,
      }],
    },
    {
      part: 9, skill: 'writing', title: 'Writing — Task 2',
      instructions: 'You should spend about 40 minutes on this task. Write at least 250 words.',
      questions: [{
        type: 'write', id: 'w2', part: 9, taskNumber: 2,
        stimulus: 'Some people believe that learning a foreign language should be compulsory for all school children. Others argue that it is more important for children to focus on other subjects.',
        text: 'To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
        minWords: 250,
      }],
    },
    {
      part: 10, skill: 'speaking', title: 'Speaking',
      instructions: 'Answer the following questions.',
      questions: [
        {
          type: 'speak', id: 'sp1', part: 10, partNumber: 1,
          text: 'Part 1 — Personal questions about language learning',
          followUp: [
            'How many languages do you speak? How did you learn them?',
            'Do you think you are a natural language learner?',
            'What methods have you found most helpful when learning a new language?',
            'Are there any languages you would like to learn in the future? Why?',
          ],
        },
        {
          type: 'speak', id: 'sp2', part: 10, partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe an experience you have had communicating with someone who speaks a different language from you.\n\nYou should say:\n• who the person was and where you met\n• what language(s) you used to communicate\n• what challenges or misunderstandings arose\n• and explain what you learned from the experience`,
        },
        {
          type: 'speak', id: 'sp3', part: 10, partNumber: 3,
          text: 'Part 3 — Discussion: Language and global communication',
          followUp: [
            'Do you think English will continue to be the world\'s dominant language of communication?',
            'What are the consequences of having a world lingua franca for speakers of minority languages?',
            'Should governments invest more in foreign language education? Why or why not?',
            'How does losing a language affect a culture?',
          ],
        },
      ],
    },
  ],
};

export default mock;
