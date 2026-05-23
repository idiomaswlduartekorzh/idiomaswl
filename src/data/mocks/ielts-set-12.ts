import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-12',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 12',
  subtitle: 'Coral Reef Decline · History of Chess · Social Media & Mental Health',
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
      title: 'Reading — Passage 1: The Decline of Coral Reefs',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Decline of Coral Reefs

Coral reefs occupy less than one percent of the ocean floor, yet they support approximately twenty-five percent of all known marine species. These ecosystems—often described as the rainforests of the sea—provide food security, coastal protection, and economic income to hundreds of millions of people worldwide. Today, they face an unprecedented convergence of threats that scientists warn could eliminate most of the world's reefs within decades.

The primary driver of reef decline is ocean warming caused by climate change. Corals are colonial animals that live in a symbiotic relationship with photosynthetic algae called zooxanthellae. These algae provide corals with up to ninety percent of their energy needs through photosynthesis and give corals their vivid colours. When sea temperatures rise by even one or two degrees Celsius above the seasonal maximum for a sustained period, corals expel their zooxanthellae in a stress response called coral bleaching. Without the algae, the coral skeleton becomes visible—appearing ghostly white—and the coral begins to starve. If temperatures do not return to normal within weeks, the coral dies. Mass bleaching events, once rare, are now occurring with increasing frequency; the Great Barrier Reef experienced five mass bleaching events between 2016 and 2024.

Ocean acidification compounds this problem significantly. As the ocean absorbs approximately thirty percent of all carbon dioxide emitted by human activity, a chemical reaction produces carbonic acid, lowering the pH of seawater. Since the Industrial Revolution, ocean surface pH has dropped from 8.2 to 8.1—a change that, because pH is logarithmic, represents a twenty-six percent increase in acidity. For corals, which build their skeletons from calcium carbonate, this is deeply problematic: acidification reduces the availability of carbonate ions, making it harder for corals to calcify and causing existing skeletons to weaken and dissolve.

Local stressors add further pressure. Agricultural runoff introduces nutrients into coastal waters, stimulating algal blooms that smother reefs and block sunlight. Overfishing removes herbivorous fish such as parrotfish and surgeonfish, which normally keep algae in check. Coastal development disrupts sediment patterns and can physically damage reef structures. In many regions, these local threats operate in combination with climate stressors, creating a "death by a thousand cuts" dynamic from which reefs have little opportunity to recover.

The economic stakes are enormous. Coral reefs generate an estimated US$375 billion per year in goods and services, including fisheries, tourism, and coastal protection. The physical barrier they create absorbs wave energy and protects shorelines from erosion and storm damage—a service valued at hundreds of billions of dollars annually for low-lying coastal nations and islands. In countries like Indonesia, the Philippines, and the Maldives, reef-based tourism and fishing underpin the livelihoods of millions of people, making reef degradation not merely an ecological problem but a development crisis.

Responses to reef decline range from local interventions to global policy ambitions. Coral gardening—growing fragments of resilient coral on underwater nurseries and transplanting them to degraded reefs—has shown promise in the Caribbean and parts of the Indo-Pacific, though the scale of the work required is vast. Scientists are investigating heat-resistant coral strains, produced through selective breeding or assisted evolution, that may be able to survive warmer waters. At the policy level, the establishment of marine protected areas reduces local stressors and gives reefs more capacity to recover from bleaching events. Ultimately, however, conservationists argue that without aggressive action to limit greenhouse gas emissions, all other interventions risk being overwhelmed by continued warming.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: Coral reefs cover approximately one quarter of the total ocean floor.\n2. {{2}}: Zooxanthellae supply corals with most of their energy through photosynthesis.\n3. {{3}}: A temperature rise of five degrees is needed to trigger coral bleaching.\n4. {{4}}: Ocean pH has become more acidic since the beginning of the Industrial Revolution.\n5. {{5}}: Parrotfish and surgeonfish help reefs by controlling algae growth.\n6. {{6}}: Coral reefs generate more economic value from tourism than from fisheries.\n7. {{7}}: Coral gardening involves transplanting resilient coral fragments to damaged reefs.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['FALSE'] },
            { num: 4, answers: ['TRUE'] },
            { num: 5, answers: ['TRUE'] },
            { num: 6, answers: ['NOT GIVEN'] },
            { num: 7, answers: ['TRUE'] },
          ],
        },
        {
          type: 'formgroup',
          id: 'r1-sent',
          part: 5,
          qRange: [8, 13],
          groupLabel: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
          template: `8. The algae living inside coral tissue are called {{8}} and they are expelled during bleaching events.\n9. The {{9}} experienced five mass bleaching events between 2016 and 2024.\n10. When corals lose their algae, they appear white because their {{10}} becomes visible.\n11. Agricultural runoff promotes {{11}} that cover reefs and block sunlight.\n12. Coral reefs protect coastlines from erosion by acting as a physical {{12}} that absorbs wave energy.\n13. Scientists are developing {{13}} coral strains that may survive higher ocean temperatures.`,
          blanks: [
            { num: 8, answers: ['zooxanthellae'] },
            { num: 9, answers: ['Great Barrier Reef'] },
            { num: 10, answers: ['coral skeleton'] },
            { num: 11, answers: ['algal blooms'] },
            { num: 12, answers: ['barrier'] },
            { num: 13, answers: ['heat-resistant'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: A History of Chess',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `A History of Chess

A. Chess is one of the oldest and most widely played strategy games in the world. Its origins lie in the Indian subcontinent, where a game called chaturanga—meaning "four divisions," a reference to the divisions of the Indian military—was played as early as the sixth century CE. Chaturanga featured four types of pieces corresponding to infantry, cavalry, elephants, and chariots, and was played on an eight-by-eight grid. From India, the game spread westward to Persia, where it was transformed into chatrang, later shatranj. The Persian word for the game's most important piece, shah, meaning king, gave rise to the words "chess" and "checkmate"—the latter derived from shah mat, meaning "the king is helpless."

B. Arab traders and scholars carried shatranj across the Islamic world following the conquest of Persia in the seventh century. The game proved enormously popular in the caliphate courts, and a significant body of chess literature—including problem collections, treatise on strategy, and biographical accounts of great players—was produced in Arabic during the eighth and ninth centuries. The caliph Harun al-Rashid, famed for his patronage of arts and sciences, was reportedly a devoted player. When chess reached Moorish Spain and Sicily, it entered Europe, where it would undergo a transformation that produced the game we recognise today.

C. European chess diverged from shatranj in the late fifteenth century, during a period that coincided roughly with the height of the Renaissance. The most significant changes involved the newly empowered queen—known in shatranj as the counsellor or firz, a weak piece restricted to diagonal moves—who became the most powerful piece on the board, capable of moving any number of squares in any direction. The bishop received long-range diagonal movement, and the pawn acquired the option of moving two squares on its first move, along with the option of capturing en passant. These changes dramatically increased the pace and tactical richness of the game, making the prior, slower version obsolete almost overnight.

D. The eighteenth and nineteenth centuries saw chess flourish as a competitive pursuit. The first unofficial world championship is generally considered to have been the match between Wilhelm Steinitz and Johannes Zukertort in 1886, which Steinitz won, becoming the game's first recognised world champion. Steinitz also developed what became known as positional chess—a style emphasising long-term structural advantages, pawn formations, and the control of open files, rather than the swashbuckling tactical play that had dominated earlier European chess. His ideas, initially controversial, proved enormously influential on subsequent generations of players.

E. The twentieth century brought two defining developments: the rise of Soviet chess and the advent of computer analysis. Following the Russian Revolution, the Soviet government promoted chess as a sport of intellectual prestige, funding a network of state chess schools and producing a series of world champions, beginning with Alexander Alekhine and continuing through Mikhail Botvinnik, Tigran Petrosian, Boris Spassky, and Anatoly Karpov. The match between Spassky and the American Bobby Fischer in Reykjavik in 1972 became a proxy conflict for Cold War tensions, attracting global media attention and drawing chess briefly into mainstream consciousness.

F. Computer chess programs began defeating amateur players in the 1980s and gradually improved to the point where they could challenge grandmasters. In 1997, IBM's Deep Blue defeated the reigning world champion Garry Kasparov in a six-game match—a result that shocked the chess world and the public alike. Today's chess engines, running on ordinary laptop computers, play at a level far beyond the reach of any human player. Paradoxically, rather than diminishing the human game, computer analysis has enriched it: players and coaches use engines to prepare openings, analyse mistakes, and explore positions of extraordinary complexity that would have been inaccessible to earlier generations.

G. The twenty-first century has seen chess undergo a remarkable popular revival. The COVID-19 pandemic drove millions of people online, and chess became one of the most-watched and played games on the internet. The release of the Netflix series The Queen's Gambit in 2020 introduced the game to an entirely new global audience. Online platforms such as Chess.com reported record membership growth, and live-streamed chess tournaments attracted audiences in the millions. Chess, it seems, is as resilient and adaptable as the game itself demands its players to be.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'A description of changes made to the rules of chess during the Renaissance period', answer: 'C' },
            { num: 15, stem: 'An account of how chess became linked to Cold War political rivalry', answer: 'E' },
            { num: 16, stem: 'An explanation of the origin of the word "checkmate"', answer: 'A' },
            { num: 17, stem: 'Evidence of a revival in the popularity of chess in recent years', answer: 'G' },
            { num: 18, stem: 'A reference to Arabic texts produced about chess strategy', answer: 'B' },
            { num: 19, stem: 'Information about a chess player who changed how the game was theoretically understood', answer: 'D' },
            { num: 20, stem: 'An account of a computer defeating a human world chess champion', answer: 'F' },
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
          title: 'The History and Development of Chess',
          template: `Chess originated in India as a game called {{21}}, which represented the four divisions of the army. From India, it spread to Persia and was later brought to Europe by Arab traders. In the fifteenth century, the queen became the most powerful piece and the bishop gained {{22}} movement, making the game faster. The first formal world championship took place in 1886 and was won by {{23}}. The Soviet Union promoted chess as a prestige sport, producing many {{24}} who dominated the game throughout the twentieth century. In 1997, IBM's chess computer {{25}} defeated world champion Garry Kasparov. More recently, the release of a popular Netflix {{26}} introduced chess to a new generation of fans.`,
          blanks: [
            { num: 21, answers: ['chaturanga'] },
            { num: 22, answers: ['long-range diagonal'] },
            { num: 23, answers: ['Wilhelm Steinitz', 'Steinitz'] },
            { num: 24, answers: ['world champions'] },
            { num: 25, answers: ['Deep Blue'] },
            { num: 26, answers: ['series'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: Social Media and Mental Health',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `Social Media and Mental Health

Few topics in contemporary public discourse generate as much concern and controversy as the relationship between social media use and mental health, particularly among young people. The debate pits alarming survey data and compelling personal narratives against a more cautious scientific literature that emphasises the complexity of the evidence and warns against simplistic causal claims.

The popular concern is grounded in striking statistics. In the United States and the United Kingdom, rates of depression, anxiety, and self-harm among adolescents—particularly girls—began rising sharply around 2012, a period that coincides with the widespread adoption of smartphones and social media platforms. The psychologist Jean Twenge, one of the most prominent voices in this debate, argues that this correlation reflects causation: that social media use has fundamentally altered the social landscape of adolescence in harmful ways. Platforms built around social comparison, she argues, expose young users to a constant stream of curated, idealised images of others' lives, driving feelings of inadequacy, envy, and low self-worth. The displacement of face-to-face social interaction by screen time, she further argues, deprives young people of the emotionally nourishing forms of connection that genuine relationships provide.

Critics of this position, however, point out that correlation does not establish causation, and that multiple alternative explanations exist for the rise in adolescent mental health problems—including economic insecurity, academic pressure, and changes in diagnostic practices or help-seeking behaviour. A major meta-analysis published in 2019 in the journal Psychological Science examined data from over half a million adolescents and found that the association between social media use and wellbeing, while statistically significant, was tiny in magnitude—comparable in size to the association between wearing glasses and mental health problems. The researchers questioned whether associations of this scale warranted the level of public alarm they had generated.

Other studies have found evidence of more nuanced, bidirectional relationships. People who are already experiencing depression or anxiety may be more likely to use social media heavily—partly because digital socialising feels less demanding than in-person interaction. In this case, the direction of causation is reversed: mental ill-health drives social media use, rather than the other way around. Some research also identifies positive uses of social media, particularly for groups who experience social isolation in their offline lives. LGBTQ+ youth, young people with chronic illness, and those living in rural or socially homogeneous communities have reported that online communities provide access to support, identity affirmation, and connection that would otherwise be unavailable.

The role of specific platforms and specific uses matters significantly. Passive consumption—scrolling through feeds and comparing oneself to others—appears more strongly associated with negative outcomes than active use, such as messaging friends, sharing personal content, or participating in interest-based communities. Some researchers have proposed that the key variable is not time spent but the quality of the social experience: meaningful, reciprocal interaction appears to have neutral or positive effects, while passive exposure to social comparison stimuli is associated with worse outcomes.

Regulators and platform companies are under increasing pressure to respond. Several countries, including Australia and Norway, have introduced or proposed legislation restricting the use of social media by children under a certain age—typically fourteen or sixteen. Platform companies have introduced features such as daily use reminders, time limits, and the removal of like counts on posts, following research suggesting that like counts intensify social comparison. Critics argue that these measures are insufficient given the scale of the problem and the financial incentives that drive platforms to maximise engagement at the expense of user wellbeing. The debate, like the evidence itself, remains unresolved—though the urgency with which researchers, policymakers, and parents are seeking answers suggests that it will not remain so indefinitely.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What is the main argument made by Jean Twenge regarding social media?',
          options: [
            'Social media is primarily responsible for increasing smartphone addiction.',
            'Exposure to idealised images on social platforms drives feelings of inadequacy in young people.',
            'Social media platforms deliberately cause mental illness in young users.',
            'The decline in face-to-face interaction began well before smartphones were introduced.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'What did the 2019 meta-analysis published in Psychological Science find about social media and wellbeing?',
          options: [
            'There was no statistically measurable association between social media and wellbeing.',
            'The association between social media use and poor wellbeing was real but very small.',
            'Social media was confirmed as the primary cause of adolescent mental health problems.',
            'Girls showed a much stronger negative association than boys.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'According to the passage, which group appears to experience positive effects from social media use?',
          options: [
            'Young people who use social media to passively scroll through news feeds.',
            'Those who live in large cities with many opportunities for face-to-face interaction.',
            'Young people who are socially isolated offline, such as LGBTQ+ youth or those with chronic illness.',
            'Adolescents who use social media for less than one hour per day.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does the passage say about the effect of removing "like counts" from posts?',
          options: [
            'It has been shown to completely eliminate social comparison on platforms.',
            'Research suggests it may reduce the intensity of social comparison behaviour.',
            'It has been banned in several countries as an insufficient measure.',
            'Platform companies introduced it voluntarily after being legally required to do so.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: Jean Twenge argues that the rise in adolescent mental health problems is directly caused by social media.\n32. {{32}}: The 2019 meta-analysis studied data from more than 500,000 adolescents.\n33. {{33}}: People who are already depressed may use social media more heavily than others.\n34. {{34}}: Active engagement on social media, such as messaging, is more harmful than passive scrolling.\n35. {{35}}: Australia has introduced legislation to restrict children under a certain age from using social media.\n36. {{36}}: Social media companies have sufficient financial incentive to prioritise user wellbeing over engagement.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['YES'] },
            { num: 33, answers: ['YES'] },
            { num: 34, answers: ['NO'] },
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
          template: `37. The concern about social media and mental health is partly based on the sharp increase in rates of depression, anxiety, and {{37}} among adolescents from around 2012.\n38. Some researchers argue that the relationship between social media and mental health is {{38}}, meaning each can influence the other.\n39. {{39}} consumption of social media, such as passively viewing others' posts, is more associated with negative outcomes than active use.\n40. Researchers emphasise that the key variable is not the time spent on social media but the {{40}} of the social experience.`,
          blanks: [
            { num: 37, answers: ['self-harm'] },
            { num: 38, answers: ['bidirectional'] },
            { num: 39, answers: ['passive'] },
            { num: 40, answers: ['quality'] },
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
          imageUrl: '/assets/ielts/charts/set12-task1.svg',
          imageAlt: 'Line graph showing global average sea surface temperature anomaly from 1980 to 2022',
          stimulus: 'The line graph below shows the global average sea surface temperature anomaly (degrees Celsius above the 1961–1990 baseline) from 1980 to 2022.',
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
          stimulus: 'Social media platforms have become a major part of daily life for people of all ages, but particularly for young people.',
          text: 'Do the advantages of social media outweigh the disadvantages? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about technology and communication',
          followUp: [
            'How often do you use social media platforms?',
            'What do you mainly use the internet for in your daily life?',
            'Do you prefer communicating with friends online or in person? Why?',
            'Have your technology habits changed significantly in the past few years?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a time when technology helped you in an important way.\n\nYou should say:\n• what the situation was\n• what technology you used\n• how it helped you\n• and explain how you felt about this experience`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Technology and society',
          followUp: [
            'Do you think social media companies have a responsibility to protect users\' mental health?',
            'Should governments regulate the age at which children can access social media? Why or why not?',
            'How do you think technology will change human relationships in the next twenty years?',
            'Is there a risk that technology is making people less able to cope with real-world challenges?',
          ],
        },
      ],
    },
  ],
};

export default mock;
