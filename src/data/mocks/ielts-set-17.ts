import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-17',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 17',
  subtitle: 'Ocean Acidification · History of Cinema · Behavioural Economics',
  timeMinutes: 164,
  sections: [

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-17.mp3',
      title: 'Listening — Section 1: Booking a Home Repair',
      instructions: 'You will hear a telephone conversation between a customer and a home-repair booking agent. Listen and answer Questions 1–10.',
      transcript: `AGENT: Good afternoon, Hartley Home Repairs. How can I help you today?

CUSTOMER: Hello. I'd like to arrange for someone to come and fix a few things at my house.

AGENT: Of course, I can help with that. Can I take your name, please?

CUSTOMER: Yes, it's David Whitfield.

AGENT: And could you spell your surname for me?

CUSTOMER: Certainly. It's W-H-I-T-F-I-E-L-D.

AGENT: Thank you, Mr Whitfield. And what's your address?

CUSTOMER: It's 15 Maple Avenue.

AGENT: Maple Avenue, got it. And the postcode?

CUSTOMER: It's LS9 4RT.

AGENT: Lovely. And what's the best number to reach you on?

CUSTOMER: My mobile is 078 4419 2036.

AGENT: And when's the best time for us to call you, if we need to?

CUSTOMER: In the evenings, please. I'm at work all day.

AGENT: Noted — evenings. Now, could you describe the problems for me?

CUSTOMER: Well, the main thing is a leak. There's water coming in from the roof whenever it rains heavily.

AGENT: A leak from the roof — I'll make a note of that. Anything else?

CUSTOMER: Yes, there's also a broken fence in the back garden that needs repairing.

AGENT: A broken fence. And when would suit you for our visit?

CUSTOMER: I'd prefer the morning — oh, actually, no. Make it the afternoon. I have to take the children to school first.

AGENT: The afternoon it is. And how will our technician get in if you're not at home?

CUSTOMER: I'll leave a spare key with a neighbour. They're always in.

AGENT: Perfect. Now let me tell you about our two maintenance plans. The basic plan includes two visits a year, with a call-out fee of £45 each time, but it does include free parts.

CUSTOMER: And the other one?

AGENT: The premium plan gives you four visits a year. With that plan the call-out fee drops to £30, and it also includes free labour.

CUSTOMER: The premium sounds better. I'll go with that one.

AGENT: Excellent choice, Mr Whitfield. I'll get that booked in for you.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l1-form',
          part: 1,
          qRange: [1, 6],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          title: 'Home Repair Booking',
          example: 'Name:  David Whitfield',
          template: `Address: 15 {{1}} Avenue
Postcode: LS9 4RT
Phone: (mobile) 078 4419 2036
Best time to call: {{2}}

Problem details
• Main problem: a leak coming from the {{3}}
• Also needs to repair a broken {{4}} in the back garden
• Prefers an appointment in the {{5}}, not the morning
• Will leave a spare key with a {{6}}`,
          blanks: [
            { num: 1, answers: ['Maple', 'maple'], maxWords: 1 },
            { num: 2, answers: ['evenings', 'evening'], maxWords: 1 },
            { num: 3, answers: ['roof'], maxWords: 1 },
            { num: 4, answers: ['fence'], maxWords: 1 },
            { num: 5, answers: ['afternoon'], maxWords: 1 },
            { num: 6, answers: ['neighbour', 'neighbor'], maxWords: 1 },
          ],
        },
        {
          type: 'tablegroup',
          id: 'l1-table',
          part: 1,
          qRange: [7, 10],
          groupLabel: 'Complete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.',
          headers: ['Plan', 'Visits per year', 'Call-out fee', 'Includes'],
          rows: [
            [
              'Basic plan',
              { num: 7, answers: ['two', '2'], maxWords: 1 },
              '£45',
              { num: 8, answers: ['parts', 'part'], maxWords: 1 },
            ],
            [
              'Premium plan',
              '4',
              { num: 9, answers: ['30', '£30'], maxWords: 1 },
              { num: 10, answers: ['labour', 'labor'], maxWords: 1 },
            ],
          ],
        },
      ],
    },

    {
      part: 2,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-17.mp3',
      title: 'Listening — Section 2: Art Gallery Guided Tour',
      instructions: 'You will hear a guide talking to visitors at the start of an art gallery tour. Listen and answer Questions 11–20.',
      transcript: `Good morning everyone, and welcome to the Riverside Art Gallery. My name's Karen, and I'll be your guide this morning. Before we begin, let me tell you about a few improvements we've made recently. The most exciting addition is our new rooftop café, which opened last month and has wonderful views over the river. We've also created a brand-new workshop room for children on the second floor, where families can take part in hands-on activities. Now, some of you have asked about the gift shop and the members' lounge — those have been here for years — and our audio guide app, I'm afraid, is still being developed and isn't available yet.

Right, let me explain how the tour works. The tour lasts about 90 minutes, and we'll finish back here at the main entrance. Please note that photography is allowed, but only without flash, as bright light can damage the older paintings. If you'd like to leave your bags, there are free lockers next to the cloakroom.

We'll start in the East Wing, which houses the gallery's collection of landscape paintings. The highlight there is a work called 'The Harvest', which the gallery bought at auction in 2019 for a record price. From there, we move to the sculpture garden, where I'd ask you to please stay on the path, as the grass has just been reseeded.

After the sculpture garden, we visit the portrait gallery on the first floor. Many of these portraits were donated by a local collector whose family owned the building in the nineteenth century. The final room on the tour is the print room, which is kept quite dark to protect the delicate drawings.

At the end of the tour, you're welcome to relax in the café, and don't forget that gallery members receive a ten percent discount in the shop. If you have any questions along the way, please feel free to ask me at any time. Now, if you'd all like to follow me, we'll make our way to the East Wing.`,
      questions: [
        {
          type: 'multiselect',
          id: 'l2-multi',
          part: 2,
          qRange: [11, 12],
          text: 'Which TWO new features have recently been added to the gallery?',
          options: [
            { letter: 'A', text: 'a rooftop café' },
            { letter: 'B', text: 'a gift shop' },
            { letter: 'C', text: 'an audio guide app' },
            { letter: 'D', text: 'a workshop room for children' },
            { letter: 'E', text: 'a members lounge' },
          ],
          selectCount: 2,
          answers: ['A', 'D'],
        },
        {
          type: 'formgroup',
          id: 'l2-form',
          part: 2,
          qRange: [13, 20],
          groupLabel: 'Complete the notes below.\nWrite NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
          title: 'Art Gallery Guided Tour',
          template: `Tour information

• The tour lasts about {{13}} minutes and ends at the main entrance.
• Photography is allowed, but only without a {{14}}.
• Free {{15}} are available next to the cloakroom for bags.

On the tour

• The East Wing holds the collection of {{16}} paintings.
• The painting 'The Harvest' was bought at {{17}} in 2019.
• In the sculpture garden, visitors must stay on the {{18}}.
• The portraits were {{19}} by a local collector.
• Gallery members receive a ten percent {{20}} in the shop.`,
          blanks: [
            { num: 13, answers: ['90', 'ninety'], maxWords: 2 },
            { num: 14, answers: ['flash'], maxWords: 2 },
            { num: 15, answers: ['lockers', 'locker'], maxWords: 2 },
            { num: 16, answers: ['landscape'], maxWords: 2 },
            { num: 17, answers: ['auction'], maxWords: 2 },
            { num: 18, answers: ['path'], maxWords: 2 },
            { num: 19, answers: ['donated'], maxWords: 2 },
            { num: 20, answers: ['discount'], maxWords: 2 },
          ],
        },
      ],
    },

    {
      part: 3,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-17.mp3',
      title: 'Listening — Section 3: Sports-Science Study Discussion',
      instructions: 'You will hear a tutor talking to two students about a sports-science study. Listen and answer Questions 21–30.',
      transcript: `TUTOR: So, Amy and Josh, thanks for coming in. I've read your draft proposal for the sports-science study. Perhaps you could start by reminding me what you're actually trying to find out.

AMY: Well, originally we wanted to look at how diet affects sprinting speed, but we decided that was too broad. So now we're focusing specifically on how the amount of sleep athletes get affects their reaction times.

TUTOR: Good — that's a much sharper focus. And who are your participants?

JOSH: We're recruiting university students, but only ones who already play sport competitively. We thought about using complete beginners, but their results would be too inconsistent.

TUTOR: Sensible. Now, how exactly are you measuring reaction time?

AMY: We're using a light-based test. A light flashes and the participant presses a button as quickly as they can. The software records the delay in milliseconds.

TUTOR: And have you run into any difficulties yet?

JOSH: The main problem has been getting participants to attend at the same time each day. Reaction times vary depending on the time of day, so if people come at different hours, that adds noise to the data.

TUTOR: That's a really important point. Consistency of timing matters enormously. So what have your early results shown?

AMY: This is the surprising bit. We expected that less sleep would always mean slower reactions, but actually, for the fittest participants, one bad night didn't seem to affect them much at all. It seems fitness might protect against short-term sleep loss.

TUTOR: Fascinating. That's genuinely worth exploring. Now, in terms of next steps, I'd strongly recommend increasing your sample size — twenty participants really isn't enough to draw firm conclusions.

JOSH: We were worried about that.

TUTOR: Also, you should keep a log of each participant's caffeine intake, because that clearly influences alertness. And I'd like you to add a short questionnaire about their usual sleep patterns. Finally, make sure you get ethical approval before you start testing — the committee meets next Tuesday.

AMY: Thank you, that's really helpful.`,
      questions: [
        {
          type: 'mcq',
          id: 'l3q21',
          part: 3,
          text: 'What are the students now trying to find out?',
          options: [
            'how diet affects sprinting speed',
            'how sleep affects reaction times',
            'how exercise affects sleep quality',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q22',
          part: 3,
          text: 'Who takes part in the study as participants?',
          options: [
            'complete beginners at sport who have never followed a structured training programme',
            'university students who compete in sport',
            'professional athletes',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q23',
          part: 3,
          text: 'What has been the main problem so far?',
          options: [
            'getting participants to attend at the same time each day',
            'faulty software recording the wrong attendance times for several participants on every testing day',
            'finding enough volunteers',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'l3q24',
          part: 3,
          text: 'What did the early results surprisingly suggest?',
          options: [
            'less sleep always slows reaction times equally among athletes and beginners',
            'fitness may protect against short-term sleep loss',
            'beginners react faster than expected',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'l3q25',
          part: 3,
          text: 'What does the tutor say must be done before testing begins?',
          options: [
            'increasing the sample size',
            'buying new equipment',
            'getting ethical approval',
          ],
          answer: 2,
        },
        {
          type: 'formgroup',
          id: 'l3-form',
          part: 3,
          qRange: [26, 30],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          template: `The tutor's suggestions

• The students should increase the {{26}} size.
• They should keep a log of each participant's {{27}} intake.
• They should add a short {{28}} about sleep patterns.
• They must obtain {{29}} approval before testing.
• The relevant committee meets next {{30}}.`,
          blanks: [
            { num: 26, answers: ['sample'], maxWords: 1 },
            { num: 27, answers: ['caffeine'], maxWords: 1 },
            { num: 28, answers: ['questionnaire'], maxWords: 1 },
            { num: 29, answers: ['ethical'], maxWords: 1 },
            { num: 30, answers: ['Tuesday'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      audioUrl: '/audio/ielts/ielts-listening-set-17.mp3',
      title: 'Listening — Section 4: The Printing Press',
      instructions: 'You will hear a lecture about the history of the printing press. Listen and answer Questions 31–40.',
      transcript: `Today I'm going to talk about one of the most influential inventions in human history: the printing press. Although we often credit Johannes Gutenberg with inventing printing in the fifteenth century, forms of printing existed long before him. In China, printers were using carved wooden blocks to reproduce texts as early as the seventh century. The Chinese also experimented with movable type made from clay, but because the Chinese writing system uses thousands of different characters, the method never became widely practical there.

Gutenberg's crucial innovation, developed in the German city of Mainz around 1440, was movable type made from metal. He created a special alloy that was durable enough to be reused thousands of times, and he designed a mould that allowed individual letters to be produced quickly and in large quantities. He also adapted the design of the wine press, which was already common in the region, to apply even pressure to the paper.

Another essential element was ink. Gutenberg developed a new oil-based ink that stuck properly to the metal type — earlier water-based inks simply slid off. His most famous product was a printed Bible, completed around 1455, which is admired even today for the beauty of its printing.

The consequences of the printing press were enormous. Before printing, books were copied by hand, usually by monks, which made them extremely expensive and rare. After Gutenberg, the price of books fell dramatically, and literacy began to spread among ordinary people. Ideas could now travel faster than ever before. Historians often argue that the printing press made the religious movement known as the Reformation possible, because pamphlets could be produced and distributed on a massive scale.

The press also had a profound effect on science. Accurate diagrams could be reproduced identically in every copy of a book, which helped scholars across Europe share knowledge reliably. Some historians claim that without the printing press, the Scientific Revolution could not have happened. By the year 1500, presses across Europe had already produced millions of books, transforming society permanently.`,
      questions: [
        {
          type: 'formgroup',
          id: 'l4-form',
          part: 4,
          qRange: [31, 40],
          groupLabel: 'Complete the notes below.\nWrite ONE WORD ONLY for each answer.',
          title: 'THE PRINTING PRESS',
          template: `Printing before Gutenberg

• In China, wooden blocks were used to print texts as early as the {{31}} century.
• The Chinese also made movable type from {{32}}.
• Their method was impractical because the writing system has thousands of {{33}}.

Gutenberg's innovations

• Gutenberg worked in the German city of {{34}} around 1440.
• He produced movable type made from {{35}}.
• He created a special {{36}} that could be reused thousands of times.
• He developed a new oil-based {{37}} that stuck to the metal type.

The impact of printing

• Before printing, books were copied by hand, usually by {{38}}.
• The press is said to have made the religious movement called the {{39}} possible.
• In science, accurate {{40}} could be reproduced identically in every copy.`,
          blanks: [
            { num: 31, answers: ['seventh', '7th'], maxWords: 1 },
            { num: 32, answers: ['clay'], maxWords: 1 },
            { num: 33, answers: ['characters', 'character'], maxWords: 1 },
            { num: 34, answers: ['Mainz'], maxWords: 1 },
            { num: 35, answers: ['metal'], maxWords: 1 },
            { num: 36, answers: ['alloy'], maxWords: 1 },
            { num: 37, answers: ['ink'], maxWords: 1 },
            { num: 38, answers: ['monks', 'monk'], maxWords: 1 },
            { num: 39, answers: ['Reformation'], maxWords: 1 },
            { num: 40, answers: ['diagrams', 'diagram'], maxWords: 1 },
          ],
        },
      ],
    },

    {
      part: 5,
      skill: 'reading',
      title: 'Reading — Passage 1: Ocean Acidification',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `Ocean Acidification

The world's oceans are undergoing a fundamental chemical change. Since the beginning of the Industrial Revolution, they have absorbed roughly a quarter of the carbon dioxide released to the atmosphere by human activity. This uptake slows the accumulation of atmospheric carbon dioxide, but it changes seawater chemistry: dissolved carbon dioxide reacts with water to form carbonic acid, increasing hydrogen ions and progressively lowering ocean pH in a process called ocean acidification. The term can be misleading because average seawater remains alkaline; acidification describes movement down the pH scale rather than an ocean that has already become acidic.

The scale of the change is significant. Average surface pH has fallen from approximately 8.2 before industrialisation to around 8.1 today—a change that, because the pH scale is logarithmic, represents about a twenty-six percent increase in hydrogen ion concentration. Future change depends strongly on emissions. The IPCC projects a further mean open-ocean surface decline by 2081–2100 of about 0.08 pH units under a low-emissions pathway and about 0.37 under a very high-emissions pathway, relative to 1995–2014. A single end-of-century value therefore conceals a wide range of possible outcomes and regional variation.

Many directly exposed organisms build shells or skeletons from calcium carbonate. As pH and carbonate-ion availability fall, forming these structures can require more energy and some mineral forms become more liable to dissolve. Oysters, mussels, sea urchins, starfish, and certain plankton—including pteropods, tiny free-swimming snails that form a critical link in many marine food webs—can be sensitive, although responses differ among species and life stages. In one laboratory study, pteropods exposed to projected near-future conditions showed measurable shell dissolution within 45 days. Coral reefs, already under severe stress from warming, face the additional challenge of slower calcification and weaker reef growth.

The economic and social stakes are substantial. FAO estimates that aquatic animal foods supplied at least one-fifth of animal-protein consumption for 3.2 billion people in 2021. Shellfish, crustaceans, forage fish, and zooplankton matter both commercially and as parts of food webs, but ecological change will not affect every fishery in the same way. In the US Pacific Northwest, oyster hatchery production began falling sharply in 2005. Monitoring later connected major larval losses with corrosive, high-carbon water drawn into coastal facilities during seasonal upwelling, and hatcheries adapted by tracking chemistry and timing water intake.

Understanding the interaction between acidification and other ocean stressors is an important area of ongoing research. Acidification does not act in isolation: it operates alongside warming, deoxygenation, and pollution in ways that can be additive or synergistic, producing effects greater than a single stressor. Exposure histories, food supply, genetics, and the capacity to acclimatise also help explain why responses vary. Seagrass beds and kelp forests absorb carbon dioxide through photosynthesis and can sometimes elevate local pH. Researchers study whether such habitats can function as potential refugia—areas where conditions remain more hospitable—but the effect changes with water movement, season, and ecosystem metabolism.

Mitigation of ocean acidification at a global scale ultimately requires reducing carbon dioxide emissions, since ocean chemistry is coupled to atmospheric concentrations and absorbed carbon circulates far beyond one shoreline. Local interventions—adding alkaline substances to coastal waters, protecting and restoring coastal vegetation, and reducing pollution or overharvesting—may protect valuable sites or improve ecosystem resilience, but they cannot cancel global change without emissions reduction. Deliberately adding alkalinity at large scale remains an area of research: any proposal must account for energy and material demand, ecological side effects, monitoring, and how long added carbon remains stored. Sustained observations are also essential because natural daily and seasonal variability can obscure the human-driven trend at an individual site. The scientific evidence therefore supports combining rapid emissions reduction with carefully evaluated local adaptation rather than treating either as a complete substitute for the other.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The oceans have absorbed roughly a quarter of the carbon dioxide released to the atmosphere by human activity since industrialisation.\n2. {{2}}: A drop in ocean pH from 8.2 to 8.1 represents about a twenty-six percent increase in hydrogen ion concentration.\n3. {{3}}: All species of marine plankton are equally sensitive to changes in ocean pH.\n4. {{4}}: Oyster hatcheries in the Pacific Northwest experienced failures that were linked to corrosive, high-carbon water.\n5. {{5}}: Warming, deoxygenation, and acidification sometimes produce effects that are greater together than individually.\n6. {{6}}: Seagrass beds can locally raise pH levels by absorbing carbon dioxide.\n7. {{7}}: Adding alkaline substances to coastal waters can fully reverse global ocean acidification.`,
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
          template: `8. Dissolved carbon dioxide forms {{8}} when it reacts with seawater, lowering the ocean's pH.\n9. Tiny free-swimming snails called {{9}} are a critical link in many marine food webs and can be sensitive to acidification.\n10. Laboratory studies showed measurable dissolution of pteropod shells under near-future conditions within {{10}} days.\n11. Acidification slows coral {{11}} rates by reducing the availability of carbonate ions.\n12. Areas where marine conditions remain more hospitable to sensitive species are known as potential {{12}}.\n13. Scientists agree that tackling ocean acidification fundamentally requires reducing {{13}} emissions.`,
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

A. Cinema became a major industry and a powerful medium for shaping and reflecting culture within little more than a century. Its origins lie in overlapping nineteenth-century experiments in photography, flexible film, cameras, peep-show machines, and projection. Inventors in France, Britain, Germany, and the United States worked simultaneously and competitively, so no single event can securely be called the birth of cinema. The Lumière brothers, Auguste and Louis, held an influential paid screening in Paris on 28 December 1895, showing short scenes such as workers leaving their factory. Yet customers had already paid to view films in Edison's Kinetoscope boxes, and projected motion pictures had been shown to paying audiences in New York and Berlin earlier in 1895. The Lumière programme became iconic partly because their compact Cinématographe and international operators helped popularise projection.

B. The earliest films were silent and very short, often lasting less than a minute. As the medium developed through the 1900s and 1910s, filmmakers discovered techniques that are now the grammar of cinema: editing (cutting between shots to create narrative and meaning), close-ups (focusing on facial expression or detail to convey emotion), and cross-cutting (alternating between simultaneous actions in different locations to create tension). D. W. Griffith, the American director whose 1915 film The Birth of a Nation remains deeply controversial for its racist content, was nonetheless influential in systematising and demonstrating these techniques at epic length. His subsequent film Intolerance (1916) developed complex parallel narratives that influenced filmmakers for generations.

C. The introduction of commercially successful synchronised sound in the late 1920s transformed the industry rapidly. The Jazz Singer (1927), produced by Warner Bros, is conventionally cited as the first "talkie", although earlier films had experimented with recorded sound and much of this film remained silent. By the early 1930s, sound production had become the Hollywood norm. The transition created demand for performers with suitable voices and dramatic training. Some silent stars lost opportunities, while stage-trained performers gained them, although sound alone did not determine every career. It also encouraged the musical as a distinct Hollywood genre and gave dialogue writers a more central creative role.

D. Hollywood consolidated its dominance of global cinema in the 1930s and 1940s through a "studio system" in which major studios controlled every aspect of production and distribution—writing, directing, casting, releasing, and exhibiting films through their own chains of theatres. Stars and directors worked under long-term exclusive contracts, giving studios extraordinary control over creative and financial resources. This system produced the "Golden Age" of Hollywood, characterised by the refinement of genre conventions—the Western, the gangster film, the screwball comedy, the musical—and by the luminous star personas of figures such as Cary Grant, Katharine Hepburn, and Humphrey Bogart.

E. The postwar period brought significant challenges to Hollywood dominance. Television drew audiences away from cinemas, and European cinema—particularly Italian neorealism and the French New Wave—offered formal and social alternatives to polished studio entertainment. Neorealist filmmakers often shot amid postwar streets and used non-professional performers; New Wave directors exploited lighter equipment, location work, jump cuts, and self-conscious storytelling. Individual filmmakers did not all use the same methods, but figures including Vittorio De Sica, Federico Fellini, Jean-Luc Godard, and François Truffaut expanded the possibilities of personal direction. The "auteur" tradition—in which a director's recurring style and concerns help define a film—became influential in criticism and among later American filmmakers.

F. The blockbuster era, initiated by the enormous commercial success of Jaws (1975) and Star Wars (1977), reorganised Hollywood around large-budget, wide-release "event" films with massive marketing campaigns. Studios became more risk-averse, concentrating investment on films with established intellectual property, franchise potential, and global market appeal. The rise of home video in the 1980s and streaming services in the twenty-first century further transformed distribution models, while digital technology revolutionised both production—replacing celluloid with digital image capture—and visual effects, enabling the spectacle of contemporary superhero and science fiction films.

G. Cinema has long developed through exchanges among national and regional industries. India includes Hindi-language production centred in Mumbai, often called Bollywood, as well as major industries in Telugu, Tamil, Malayalam, and other languages; production totals depend on which industries and releases are counted. South Korean cinema achieved a prominent milestone when Bong Joon-ho's Parasite won the Academy Award for Best Picture in 2020, the first non-English-language film to do so. Chinese, Nigerian, Brazilian, and many other cinemas sustain substantial domestic and diasporic audiences. Streaming platforms can make subtitled films available across borders without a traditional theatrical release, while commissioning local-language productions. At the same time, catalogue decisions, territorial rights, and recommendation systems influence which works audiences actually discover, so technical availability does not guarantee equal visibility.`,
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
            { num: 16, stem: 'A correction to the familiar claim that one Paris screening marked the birth of cinema', answer: 'A' },
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
          template: `An influential public commercial screening took place in Paris in 1895, organised by the {{21}} brothers, although paying audiences had seen other moving-image systems earlier. Early filmmakers developed key techniques including {{22}}, which alternates between simultaneous events to create tension. The introduction of {{23}} sound in the late 1920s transformed the industry, creating demand for actors with stage training. During the 1930s and 1940s, Hollywood studios operated under a {{24}} that controlled all aspects of production and distribution. Post-war European cinema, particularly the {{25}} tradition, emphasised the director's personal vision over genre conventions. In 2020, Bong Joon-ho's Parasite became the first non-English-language film to win the {{26}} for Best Picture.`,
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

For much of the twentieth century, economists often modelled a rational actor who has stable preferences, responds consistently to available information, and chooses the option that maximises utility. This simplified figure is sometimes called homo economicus. Economists did not necessarily claim that every person literally performs perfect calculations; the assumptions supplied a tractable benchmark for analysing markets and aggregate outcomes. Models can also incorporate limited information, uncertainty, and constraints without abandoning rational choice. The benchmark becomes less informative, however, when predictable features of attention, framing, memory, or self-control systematically alter choices. Behavioural evidence asks whether an apparent anomaly is robust and whether revising an assumption improves explanation enough to justify added complexity.

Behavioural economics draws on psychology, laboratory and field experiments, and other empirical methods to study systematic departures from standard predictions. Earlier ideas such as Herbert Simon's bounded rationality prepared the ground; Daniel Kahneman and Amos Tversky's work on judgement and decisions under uncertainty became especially influential from the 1970s onward. Richard Thaler connected these findings to economic problems, while Thaler and Cass Sunstein's 2008 book Nudge widened policy attention. Kahneman, a psychologist, received the 2002 Prize in Economic Sciences for integrating psychological research into economics, and Thaler received the prize in 2017 for contributions to behavioural economics. Laboratory control can identify a mechanism, while field experiments test behaviour in operational settings; neither automatically proves that an effect will be large across cultures, institutions, or time.

One of the field's central contributions is prospect theory, developed by Kahneman and Tversky as an alternative to expected utility theory—the standard economic model of decision-making under risk. Expected utility theory evaluates risky prospects through outcomes and their utilities, commonly expressed in final wealth. Prospect theory instead models gains and losses relative to a reference point, sensitivity that diminishes with distance from that point, and decision weights that do not simply equal objective probabilities. Its value function is steeper for losses than for comparable gains, a feature called loss aversion. Classic estimates used a loss slope roughly twice the gain slope, but that ratio is a model estimate rather than a universal psychological constant. Reference dependence and loss aversion can help explain reluctance to sell assets below a salient purchase price and a preference for the status quo; they do not establish one cause for every such decision.

Present bias—the tendency to give disproportionate weight to immediate rewards—is another documented departure from time-consistent choice. Standard exponential discounting applies a constant proportional discount across time, whereas hyperbolic discounting describes preferences that can reverse as a reward becomes immediate. A person may plan to save or diet next month and then change course when spending or food is available today. Researchers use several models of this pattern, and impatience does not always imply present bias. Automatic saving, deadlines, and voluntary commitment devices can help people act on earlier plans, though their effects depend on circumstances and design. A useful diagnosis must separate self-control problems from low income, uncertainty, fees, or lack of access, since those barriers call for different remedies.

The best-known policy application is "nudging"—altering the architecture of choice predictably without forbidding options or substantially changing economic incentives. Examples include default enrolment in pension plans with an opt-out, reminders, simplified forms, placing healthier food prominently, and energy reports that compare a household with similar neighbours. Some large-scale trials have produced meaningful changes at relatively low implementation cost; other interventions have small, null, short-lived, or context-specific effects. A default can increase enrolment without proving that every participant is better off, so evaluation should examine welfare and distribution as well as uptake. A result from one institution may not transfer unchanged to another population. Evaluation therefore needs to report costs and null results, test implementation at scale, and monitor long-term or unintended effects.

Behavioural economics has also attracted substantive criticism. Some economists argue that it can overstate irrationality: experience, feedback, institutions, and real stakes may change behaviour relative to a laboratory task. Others question replication, external validity, or the temptation to attach a familiar bias to evidence after the fact. Ethical critics ask who defines the citizen's interests and whether a nudge is transparent, avoidable, and accountable. The political valence is mixed: conservatives may object to government manipulation, while some progressives worry that nudges substitute for structural reforms addressing deeper social and economic determinants. These criticisms do not erase well-replicated findings; they narrow the claims that evidence can support and raise the standard for application. Behavioural insights teams now operate in many governments, but responsible use requires public justification, easy routes to opt out or complain where appropriate, and comparison with regulation, information, incentives, or structural policy rather than assuming that a nudge is always the right tool.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What is "homo economicus" as described in the passage?',
          options: [
            'A prehistoric ancestor of modern humans who was exceptionally rational and consistently maximised personal economic gain.',
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
            'The tendency to avoid all financial risk, even when expected returns are positive and the potential loss is relatively small.',
            'The modelling assumption that losses receive roughly twice the weight of comparable gains in classic estimates.',
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
            'A discounting rate that remains consistent and predictable across all time horizons, regardless of how close a reward becomes.',
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
          template: `31. {{31}}: The rational actor model was considered useful by economists even though it did not perfectly describe real behaviour.\n32. {{32}}: Daniel Kahneman was awarded the Prize in Economic Sciences while working as a psychologist.\n33. {{33}}: Prospect theory predicts that people evaluate outcomes solely in terms of their total accumulated wealth.\n34. {{34}}: Present bias has been shown to be the main cause of all forms of financial irresponsibility.\n35. {{35}}: Some large-scale nudge trials have produced meaningful behavioural changes at relatively low implementation cost.\n36. {{36}}: The author concludes that all critics of behavioural economics are motivated by conservative political beliefs.`,
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
          cueCard: `Describe a film, documentary, or television programme about an environmental issue that had a strong impact on you.\n\nYou should say:\n• what the programme was and which issue it explored\n• when and where you watched it\n• why it had such a strong impact on you\n• and explain whether it changed your behaviour or opinions`,
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
