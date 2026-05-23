import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-17',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 17',
  subtitle: 'Ocean Acidification · History of Cinema · Behavioural Economics',
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
      title: 'Reading — Passage 1: Ocean Acidification',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Ocean Acidification

The world's oceans are undergoing a fundamental chemical change. Since the beginning of the Industrial Revolution, the oceans have absorbed approximately thirty percent of all carbon dioxide emitted by human activity—around one hundred and fifty billion tonnes in total. This absorption has served as a vital buffer against even more rapid atmospheric warming, but it has come at a significant cost: the dissolved carbon dioxide reacts with seawater to form carbonic acid, progressively lowering the pH of the ocean in a process called ocean acidification.

The scale of the change is significant. Ocean surface pH has fallen from approximately 8.2 before industrialisation to around 8.1 today—a change that, because the pH scale is logarithmic, represents a twenty-six percent increase in hydrogen ion concentration and thus in acidity. If emissions continue on their current trajectory, models project that ocean pH could fall to 7.8 by the end of this century—a level lower than any experienced in the past twenty million years, and one that would have far-reaching consequences for marine ecosystems.

The organisms most directly threatened by acidification are those that build shells or skeletons from calcium carbonate, the mineral that dissolves in acidic conditions. Oysters, mussels, sea urchins, starfish, and certain species of plankton—including pteropods, tiny free-swimming snails that form a critical link in many marine food webs—are all highly sensitive to declining pH. Laboratory experiments have demonstrated that pteropods exposed to projected near-future pH levels show measurable dissolution of their shells within 45 days. Coral reefs, which are already under severe stress from warming, face the additional challenge of acidification reducing the availability of carbonate ions, slowing calcification rates and weakening reef structures.

The economic and social stakes are substantial. Marine fisheries provide the primary source of protein for more than one billion people worldwide, and many of the species most exposed to acidification—shellfish, crustaceans, and the small forage fish and zooplankton that underpin marine food webs—are critical both ecologically and commercially. The US shellfish industry alone, particularly on the Pacific Northwest coast, has already experienced significant impacts: oyster hatcheries in Oregon and Washington reported mass failures of oyster larvae beginning in 2005, which were subsequently linked to high-carbon seawater upwelling along the coast.

Understanding the interaction between acidification and other ocean stressors is an important area of ongoing research. Acidification does not act in isolation: it operates alongside warming, deoxygenation, and pollution in ways that are sometimes additive and sometimes synergistic, producing effects greater than any single stressor would generate alone. Some species and ecosystems show greater resilience than others. Seagrass beds and kelp forests, which absorb carbon dioxide through photosynthesis and can locally elevate pH in surrounding water, have been identified as potential refugia—areas where conditions remain more hospitable—and their conservation has taken on new importance in the context of acidification.

Mitigation of ocean acidification at a global scale ultimately requires reducing carbon dioxide emissions, since the ocean's chemistry is directly coupled to atmospheric concentrations. Local interventions—adding alkaline substances to coastal waters, protecting and restoring coastal vegetation, and reducing other local stressors to improve ecosystem resilience—can provide some protection for particularly valuable sites but cannot address the global-scale change without emissions reduction. The scientific consensus is clear: ocean acidification is one of the most serious and least reversible consequences of unchecked carbon emissions, and the window for avoiding the worst outcomes is narrowing rapidly.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The oceans have absorbed roughly thirty percent of all human-produced carbon dioxide since industrialisation.\n2. {{2}}: A drop in ocean pH from 8.2 to 8.1 represents a twenty-six percent increase in acidity.\n3. {{3}}: All species of marine plankton are equally sensitive to changes in ocean pH.\n4. {{4}}: Oyster hatcheries in the Pacific Northwest experienced failures that were linked to ocean acidification.\n5. {{5}}: Warming, deoxygenation, and acidification sometimes produce effects that are greater together than individually.\n6. {{6}}: Seagrass beds can locally raise pH levels by absorbing carbon dioxide.\n7. {{7}}: Adding alkaline substances to coastal waters can fully reverse global ocean acidification.`,
          blanks: [
            { num: 1, answers: ['TRUE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['TRUE'] },
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
          template: `8. Dissolved carbon dioxide forms {{8}} when it reacts with seawater, lowering the ocean's pH.\n9. Tiny free-swimming snails called {{9}} are a critical link in many marine food webs and are highly vulnerable to acidification.\n10. Laboratory studies showed that pteropod shells begin to dissolve when exposed to near-future pH levels within {{10}} days.\n11. Acidification slows coral {{11}} rates by reducing the availability of carbonate ions.\n12. Areas where marine conditions remain more hospitable to sensitive species are known as potential {{12}}.\n13. Scientists agree that tackling ocean acidification fundamentally requires reducing {{13}} emissions.`,
          blanks: [
            { num: 8, answers: ['carbonic acid'] },
            { num: 9, answers: ['pteropods'] },
            { num: 10, answers: ['45'] },
            { num: 11, answers: ['calcification'] },
            { num: 12, answers: ['refugia'] },
            { num: 13, answers: ['carbon dioxide'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: A History of Cinema',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `A History of Cinema

A. Cinema is one of the youngest art forms in human history, yet within little more than a century it has become the world's dominant popular entertainment, a major economic industry, and a powerful medium for shaping and reflecting culture. Its origins lie in the late nineteenth century, when a series of inventors—working simultaneously and competitively in France, Britain, Germany, and the United States—developed technologies for capturing and projecting moving images. The Lumière brothers, Auguste and Louis, are conventionally credited with the first public commercial film screening, held in Paris on 28 December 1895, in which short films depicting everyday scenes—workers leaving a factory, a train arriving at a station—astonished paying audiences.

B. The earliest films were silent and very short, often lasting less than a minute. As the medium developed through the 1900s and 1910s, filmmakers discovered techniques that are now the grammar of cinema: editing (cutting between shots to create narrative and meaning), close-ups (focusing on facial expression or detail to convey emotion), and cross-cutting (alternating between simultaneous actions in different locations to create tension). D. W. Griffith, the American director whose 1915 film The Birth of a Nation remains deeply controversial for its racist content, was nonetheless influential in systematising and demonstrating these techniques at epic length. His subsequent film Intolerance (1916) developed complex parallel narratives that influenced filmmakers for generations.

C. The introduction of synchronised sound in the late 1920s transformed the industry almost overnight. The Jazz Singer (1927), produced by Warner Bros, is conventionally cited as the first "talkie," though it was partly silent. By 1930, virtually all Hollywood studios had converted entirely to sound production. The transition had significant social consequences: it created enormous demand for actors with suitable voices and dramatic training, ending the careers of some major silent stars while creating new opportunities for stage-trained performers. Sound also enabled the development of the musical as a distinct Hollywood genre, and dialogue gave writers a central creative role they had not previously held.

D. Hollywood consolidated its dominance of global cinema in the 1930s and 1940s through a "studio system" in which major studios controlled every aspect of production and distribution—writing, directing, casting, releasing, and exhibiting films through their own chains of theatres. Stars and directors worked under long-term exclusive contracts, giving studios extraordinary control over creative and financial resources. This system produced the "Golden Age" of Hollywood, characterised by the refinement of genre conventions—the Western, the gangster film, the screwball comedy, the musical—and by the luminous star personas of figures such as Cary Grant, Katharine Hepburn, and Humphrey Bogart.

E. The postwar period brought significant challenges to Hollywood dominance. Television drew audiences away from cinemas, and European cinema—particularly Italian neorealism and the French New Wave—produced films of artistic ambition and formal innovation that contrasted sharply with the polished genre entertainment of the studio system. Directors such as Vittorio De Sica, Federico Fellini, Jean-Luc Godard, and François Truffaut rejected studio conventions, shooting on location with non-professional actors and expressing personal, idiosyncratic visions. This "auteur" tradition—in which the director's personal style is seen as the defining element of a film—became enormously influential, shaping both critical discourse and a generation of American filmmakers.

F. The blockbuster era, initiated by the enormous commercial success of Jaws (1975) and Star Wars (1977), reorganised Hollywood around large-budget, wide-release "event" films with massive marketing campaigns. Studios became more risk-averse, concentrating investment on films with established intellectual property, franchise potential, and global market appeal. The rise of home video in the 1980s and streaming services in the twenty-first century further transformed distribution models, while digital technology revolutionised both production—replacing celluloid with digital image capture—and visual effects, enabling the spectacle of contemporary superhero and science fiction films.

G. Cinema's global landscape today is far more diverse than at any previous point in its history. Bollywood—the Hindi-language film industry based in Mumbai—produces more films annually than Hollywood and reaches a global audience of billions. South Korean cinema achieved remarkable international recognition with Bong Joon-ho's Parasite winning the Academy Award for Best Picture in 2020—the first non-English-language film to do so. Chinese, Nigerian, and Brazilian cinemas are significant and growing industries. The globalisation of distribution through streaming platforms has simultaneously made world cinema more accessible to global audiences and raised concerns about the dominance of US-produced content in recommendation algorithms.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of how the arrival of sound transformed the careers of film actors', answer: 'C' },
            { num: 15, stem: 'An account of how European filmmakers challenged Hollywood conventions after World War Two', answer: 'E' },
            { num: 16, stem: 'A reference to the first public paid screening of moving images', answer: 'A' },
            { num: 17, stem: 'Information about the growing diversity of national film industries beyond Hollywood', answer: 'G' },
            { num: 18, stem: 'A description of how studios controlled every stage of film production and distribution', answer: 'D' },
            { num: 19, stem: 'An explanation of editing techniques that became fundamental to cinema grammar', answer: 'B' },
            { num: 20, stem: 'An account of how two commercially successful films reshaped Hollywood priorities', answer: 'F' },
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
          title: 'The History of Cinema',
          template: `The first public commercial film screening took place in Paris in 1895, organised by the {{21}} brothers. Early filmmakers developed key techniques including {{22}}, which alternates between simultaneous events to create tension. The introduction of {{23}} sound in the late 1920s transformed the industry, creating demand for actors with stage training. During the 1930s and 1940s, Hollywood studios operated under a {{24}} that controlled all aspects of production and distribution. Post-war European cinema, particularly the {{25}} tradition, emphasised the director's personal vision over genre conventions. In 2020, Bong Joon-ho's Parasite became the first non-English-language film to win the {{26}} for Best Picture.`,
          blanks: [
            { num: 21, answers: ['Lumière'] },
            { num: 22, answers: ['cross-cutting'] },
            { num: 23, answers: ['synchronised'] },
            { num: 24, answers: ['studio system'] },
            { num: 25, answers: ['auteur'] },
            { num: 26, answers: ['Academy Award'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Behavioural Economics',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Behavioural Economics

For most of the twentieth century, the dominant model in economics was that of the rational actor: an individual who consistently pursues their own interests, makes decisions based on complete and accurate information, and maximises utility—broadly, their own wellbeing—in every choice they make. This model, known as homo economicus, provided economists with a tractable framework for building mathematical models of markets and predicting aggregate economic outcomes. Its drawback was that real human beings behave in ways that the model cannot explain.

Behavioural economics emerged from the intersection of psychology and economics, drawing on evidence from laboratory experiments, field studies, and neuroscience to document the systematic ways in which human decision-making departs from rational actor predictions. Its intellectual origins lie primarily in the work of Daniel Kahneman and Amos Tversky in the 1970s and 1980s, and it was brought to mainstream economic and policy attention by Richard Thaler and Cass Sunstein's 2008 book Nudge. Kahneman received the Nobel Memorial Prize in Economic Sciences in 2002, and Thaler in 2017—notable achievements for work rooted in psychology rather than traditional economic modelling.

One of the field's central contributions is prospect theory, developed by Kahneman and Tversky as an empirically grounded alternative to expected utility theory—the standard economic model of decision-making under risk. Expected utility theory predicts that people evaluate outcomes in terms of their final states of wealth. Prospect theory found instead that people evaluate outcomes in terms of gains and losses relative to a reference point, and that losses are psychologically more powerful than equivalent gains—a phenomenon called loss aversion. Experiments consistently show that the pain of losing a sum of money is approximately twice as intense as the pleasure of gaining the same amount, which explains a range of puzzling behaviours: why investors hold losing stocks too long, why homeowners resist selling at a loss, and why employees prefer salary cuts to layoffs when the objective outcome may be comparable.

Present bias—the tendency to disproportionately prefer immediate rewards over future ones, even when future rewards are objectively larger—is another well-documented departure from rational actor predictions. Classical economic models assume that people discount future outcomes at a consistent rate; behavioural research shows that the rate of discounting is much steeper for the near-term future than for the more distant future. This "hyperbolic discounting" explains why people repeatedly fail to save adequately for retirement despite knowing they should, and why they choose the larger slice of cake today knowing they intended to diet. Present bias underlies much of the evidence on self-control failure, which is recognised as one of the most important and costly failures in individual decision-making.

The policy application of behavioural economics is "nudging"—designing the architecture of choice to encourage people toward decisions that are better for their long-term interests without restricting their freedom to choose otherwise. Classic nudge interventions include: defaulting employees into pension savings plans (with the option to opt out), placing fruit and healthy food at eye level in canteens, requiring people to actively opt out of organ donation rather than opt in, and sending personalised energy use reports that compare a household's consumption to similar neighbours. These interventions have been shown in large-scale trials to produce meaningful changes in behaviour at low cost and without coercion—though critics have questioned whether they can produce lasting change or whether they merely shift behaviour temporarily.

Behavioural economics has also attracted substantive criticism. Some economists argue that the field has overstated the irrationality of human decision-making: in natural settings, where people have experience, feedback, and stakes in outcomes, behaviour often approaches rationality more closely than laboratory experiments suggest. Others argue that nudges are paternalistic—that it is inappropriate for governments to exploit psychological weaknesses to manipulate behaviour, even toward ostensibly beneficial ends, without explicit consent. The political valence of the critique is mixed: conservatives object to government manipulation of choice; some progressives worry that nudges are a substitute for structural reforms that would address the underlying social and economic determinants of poor outcomes. Despite these critiques, behavioural economics has become a well-established influence on policy in dozens of countries, with dedicated behavioural insights teams operating in governments from the United Kingdom to Singapore.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What is "homo economicus" as described in the passage?',
          options: [
            'A prehistoric ancestor of modern humans who was exceptionally rational.',
            'An economic model assuming people always act rationally in their own interests.',
            'A term used by behavioural economists to describe irrational consumer behaviour.',
            'A concept developed by Daniel Kahneman to describe emotional decision-making.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What does "loss aversion" mean, according to the passage?',
          options: [
            'The tendency to avoid all financial risk, even when expected returns are positive.',
            'The psychological experience in which losses feel roughly twice as painful as equivalent gains feel pleasurable.',
            'The preference for certain outcomes over uncertain ones, regardless of expected value.',
            'The tendency to overestimate the probability of rare but catastrophic financial losses.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What is meant by "hyperbolic discounting" as described in the passage?',
          options: [
            'The tendency to underestimate the cost of very large future expenditures.',
            'A discounting rate that is consistent and predictable across all time horizons.',
            'The pattern in which people discount the near-term future much more steeply than the distant future.',
            'The inability to calculate compound interest accurately when making savings decisions.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'Which of the following is identified as a criticism of behavioural economics in the passage?',
          options: [
            'It has failed to produce any measurable changes in real-world behaviour.',
            'It has never been adopted by any national government policy team.',
            'Some argue it overstates human irrationality and that nudges can be paternalistic.',
            'It relies exclusively on data from laboratory settings and ignores field evidence.',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The rational actor model was considered useful by economists even though it did not perfectly describe real behaviour.\n32. {{32}}: Daniel Kahneman was awarded the Nobel Prize in Economic Sciences despite working primarily as a psychologist.\n33. {{33}}: Prospect theory predicts that people evaluate outcomes in terms of their total accumulated wealth.\n34. {{34}}: Present bias has been shown to be the main cause of all forms of financial irresponsibility.\n35. {{35}}: Nudge interventions have been demonstrated to produce meaningful behavioural change at relatively low cost.\n36. {{36}}: The author concludes that all critics of behavioural economics are motivated by conservative political beliefs.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['NO'] },
            { num: 34, answers: ['NOT GIVEN'] },
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
          template: `37. The standard economic model of decision-making under risk, which behavioural economists challenged, is called {{37}} theory.\n38. The strong preference for immediate rewards over future ones, even when future rewards are larger, is known as {{38}}.\n39. The design of choices to guide people toward beneficial decisions without restricting their freedom is referred to as {{39}}.\n40. Critics argue that nudges may be a substitute for {{40}} reforms that address the deeper causes of poor outcomes.`,
          blanks: [
            { num: 37, answers: ['expected utility'] },
            { num: 38, answers: ['present bias'] },
            { num: 39, answers: ['nudging'] },
            { num: 40, answers: ['structural'] },
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
          imageUrl: '/assets/ielts/charts/set17-task1.svg',
          imageAlt: 'Bar chart comparing life expectancy at birth by world region in 1990 and 2022',
          stimulus: 'The bar chart below shows life expectancy at birth (in years) for five world regions in 1990 and 2022.',
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
          stimulus: 'Governments are increasingly using insights from psychology and behavioural science to influence citizens\' decisions—for example, by changing how choices are presented or setting certain options as defaults.',
          text: 'Is this an acceptable approach, or does it raise ethical concerns? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about money and financial decisions',
          followUp: [
            'Are you generally good at saving money? Why or why not?',
            'Do you prefer to plan your spending carefully or spend more spontaneously?',
            'Has anyone ever given you useful financial advice? What was it?',
            'Do you think people in your country are generally good at managing money?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a film or television series that had a strong impact on you.\n\nYou should say:\n• what the film or series was about\n• when and where you watched it\n• why it had such a strong impact on you\n• and explain what you learned or felt as a result`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: The oceans, environment, and human behaviour',
          followUp: [
            'How aware do you think most people are of environmental problems like ocean acidification?',
            'Do you think people naturally make good decisions about the environment, or do they need to be encouraged?',
            'What is more effective in changing environmental behaviour — government regulations or individual choice?',
            'Should entertainment media like film and television be used to promote environmental messages?',
          ],
        },
      ],
    },
  ],
};

export default mock;
