import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-14',
  examSlug: 'ielts',
  title: 'IELTS Academic Set 14',
  subtitle: 'AI Ethics · Rainforest Biodiversity · The History of Money',
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
      title: 'Reading — Passage 1: The Ethics of Artificial Intelligence',
      instructions: 'Read the passage and answer Questions 1–13.',
      passage: `The Ethics of Artificial Intelligence

Artificial intelligence systems are making consequential decisions with increasing frequency and speed—screening job applicants, evaluating loan applications, recommending criminal sentences, and diagnosing diseases. As these systems become more deeply embedded in the infrastructure of modern life, the ethical questions they raise have moved from the realm of science fiction to urgent policy debate.

One of the most widely discussed concerns is algorithmic bias. AI systems learn from historical data, and if that data reflects past patterns of discrimination—in hiring, lending, law enforcement, or healthcare—the models trained on it are likely to perpetuate and, in some cases, amplify those patterns. A prominent example is the COMPAS recidivism algorithm, used in parts of the United States to predict the likelihood that a convicted person would reoffend and inform sentencing recommendations. An investigation by ProPublica in 2016 found that the algorithm was twice as likely to misclassify black defendants as high risk compared with white defendants, raising serious questions about fairness and due process in the justice system.

A second concern involves transparency. Many advanced AI systems, particularly those based on deep learning, operate as "black boxes": they produce outputs whose internal reasoning is opaque even to their creators. When an AI system denies a mortgage application or flags a medical image as suspicious, the inability to explain the decision in human-comprehensible terms creates problems for accountability, for the ability to contest decisions, and for the identification and correction of errors. The European Union's General Data Protection Regulation (GDPR) attempted to address this by establishing a right to explanation for automated decisions, though the implementation of this right has proved legally and technically complex.

The prospect of autonomous weapons systems raises what many consider the most acute ethical challenge in AI development. Systems capable of identifying and targeting human beings without human intervention in the loop—sometimes described as lethal autonomous weapons systems or LAWS—are being developed by several major powers. Critics argue that ceding the decision to use lethal force to an algorithm violates fundamental principles of international humanitarian law, which requires that combatants be able to distinguish between civilians and military targets and apply proportional force. A growing coalition of scientists, ethicists, and governments has called for a preemptive international ban on LAWS, though progress in multilateral negotiations has been slow.

The economic consequences of AI automation represent a further ethical dimension. While economists debate the scale and pace of automation-driven job displacement, there is broad agreement that the transition will be disruptive for some sectors and demographics. Workers performing routine cognitive or physical tasks are most exposed; highly skilled professionals and those in creative, interpersonal, or highly variable roles are generally considered less vulnerable. The distributional consequences—who loses and who gains—depend heavily on policy responses, including investment in retraining, the reform of education systems, and the design of social safety nets capable of supporting workers through technological transitions.

In response to these challenges, governments, companies, and international bodies have developed a range of AI ethics frameworks and guidelines. Most converge on a set of core principles: fairness, transparency, accountability, privacy, and human oversight. The practical implementation of these principles, however, remains highly variable. Critics note that voluntary industry guidelines lack enforcement mechanisms and that there is a risk of "ethics washing"—the superficial adoption of ethical language without meaningful change in practice. The development of robust, enforceable AI governance frameworks is widely regarded as one of the defining regulatory challenges of the twenty-first century.`,
      questions: [
        {
          type: 'formgroup',
          id: 'r1-tfng',
          part: 5,
          qRange: [1, 7],
          groupLabel: 'Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.',
          template: `1. {{1}}: The COMPAS algorithm was found to misclassify white defendants as high risk more often than black defendants.\n2. {{2}}: Deep learning AI systems are sometimes described as "black boxes" because their reasoning is difficult to understand.\n3. {{3}}: The GDPR gives citizens the right to a human-comprehensible explanation of automated decisions.\n4. {{4}}: All major world powers have signed an international treaty banning lethal autonomous weapons.\n5. {{5}}: Workers performing highly routine tasks are considered more vulnerable to automation than those in creative roles.\n6. {{6}}: Most AI ethics frameworks include principles of fairness, transparency, and accountability.\n7. {{7}}: Voluntary industry ethics guidelines currently carry legally binding enforcement mechanisms.`,
          blanks: [
            { num: 1, answers: ['FALSE'] },
            { num: 2, answers: ['TRUE'] },
            { num: 3, answers: ['TRUE'] },
            { num: 4, answers: ['FALSE'] },
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
          template: `8. AI systems that learn from historically biased data may {{8}} patterns of discrimination rather than eliminate them.\n9. The COMPAS algorithm was used to inform {{9}} recommendations in parts of the United States.\n10. The EU's GDPR established a right to {{10}} for individuals affected by automated decisions.\n11. Lethal autonomous weapons systems are sometimes abbreviated as {{11}}.\n12. International humanitarian law requires combatants to distinguish between civilians and {{12}} targets.\n13. The adoption of ethical language without genuine change in practice is sometimes described as {{13}}.`,
          blanks: [
            { num: 8, answers: ['perpetuate', 'amplify'] },
            { num: 9, answers: ['sentencing'] },
            { num: 10, answers: ['explanation'] },
            { num: 11, answers: ['LAWS'] },
            { num: 12, answers: ['military'] },
            { num: 13, answers: ['ethics washing'] },
          ],
        },
      ],
    },

    {
      part: 6,
      skill: 'reading',
      title: 'Reading — Passage 2: The Remarkable Diversity of Tropical Rainforests',
      instructions: 'Read the passage and answer Questions 14–26.',
      passage: `The Remarkable Diversity of Tropical Rainforests

A. Tropical rainforests are the most biodiverse terrestrial ecosystems on Earth. Covering approximately six percent of the planet's land surface, they are home to more than half of the world's known plant and animal species—and scientists believe that millions more remain undiscovered. The Amazon basin alone harbours an estimated forty thousand plant species, three thousand freshwater fish species, and over thirteen hundred bird species. This extraordinary concentration of life is the product of a long evolutionary history, a stable climate, and an intricate web of ecological relationships that have developed over tens of millions of years.

B. The structure of a tropical rainforest is highly layered. The emergent layer, formed by the tallest trees—some reaching sixty metres or more—juts above the main forest canopy and is exposed to full sunlight, strong winds, and dramatic temperature fluctuations. These giants are inhabited by specialised animals, including harpy eagles, scarlet macaws, and various species of monkey adapted to life high above the ground. Below them, the dense canopy layer captures the vast majority of available sunlight, creating a lush closed environment where most of the forest's animal life resides.

C. The understorey, lying between the canopy and the forest floor, is a region of deep shade and high humidity. Here, plants adapted to low-light conditions—large-leafed shrubs, climbers, and shade-tolerant palms—compete for whatever light filters through the canopy above. The forest floor itself receives as little as two percent of the sunlight that falls on the canopy, yet it is teeming with life: leaf-cutter ants harvesting vegetation, decomposer fungi breaking down fallen organic matter, and an extraordinary variety of invertebrates, amphibians, and small mammals.

D. Much of the biological richness of rainforests results from intricate symbiotic relationships between species. The Brazil nut tree provides a striking example: it depends on a specific species of large bee, the orchid bee, for pollination—no other insect is large enough to access the flower. The same tree's seeds are dispersed almost exclusively by agoutis, large rodents equipped with teeth strong enough to crack the tree's extremely tough seed pods. Remove either partner from this relationship and the Brazil nut tree cannot successfully reproduce—a reminder of how profoundly interconnected rainforest species can be.

E. Rainforests also perform vital services for the global climate system. Through photosynthesis, tropical forests absorb enormous quantities of carbon dioxide, acting as a major carbon sink. It is estimated that the Amazon rainforest alone stores around eighty to one hundred and twenty billion tonnes of carbon—a store that is being partially released as deforestation continues. Rainforests also drive regional weather patterns: through evapotranspiration, forests release vast quantities of water vapour, which condenses to form clouds and precipitation. Studies have shown that the Amazon basin generates its own rainfall system, with "flying rivers" of moisture circulating from the Atlantic coast into the continental interior, sustaining agriculture in Brazil's southern states.

F. The threats facing tropical rainforests are severe. Deforestation—driven by agricultural expansion, cattle ranching, logging, and mining—destroys an estimated ten million hectares of tropical forest each year globally. In the Amazon, analysis of satellite imagery has revealed that in addition to deforestation, large areas are being degraded by selective logging, fire, and fragmentation—processes that weaken the forest's resilience without immediately converting it to a different land use. Scientists warn that the Amazon may be approaching a "tipping point" at which large-scale dieback becomes self-reinforcing: as the forest shrinks, its capacity to generate its own rainfall diminishes, threatening the survival of the remaining forest.

G. Conservation responses have included the expansion of protected areas, the development of sustainable forestry practices, and payment-for-ecosystem-services schemes that compensate forest-dwelling communities for protecting the forest. Brazil's implementation of the Amazon Fund, financed largely by Norway, was associated with a dramatic reduction in deforestation rates in the 2000s, demonstrating that policy interventions can be effective when properly resourced and enforced. However, political commitment to conservation has fluctuated significantly, and the long-term protection of tropical rainforests ultimately depends on resolving the tension between the economic pressures driving deforestation and the global ecological services these forests provide.`,
      questions: [
        {
          type: 'matching',
          id: 'r2-match',
          part: 6,
          qRange: [14, 20],
          groupLabel: 'The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
          items: [
            { num: 14, stem: 'An example of how the removal of one species can prevent another from reproducing', answer: 'D' },
            { num: 15, stem: 'A description of conditions found in the shaded middle layer of the forest', answer: 'C' },
            { num: 16, stem: 'A reference to a financial scheme that rewarded communities for preserving forest', answer: 'G' },
            { num: 17, stem: 'An account of how forests generate and recycle their own rainfall', answer: 'E' },
            { num: 18, stem: 'A description of the animals found in the uppermost forest layer', answer: 'B' },
            { num: 19, stem: 'A warning about a threshold beyond which forest loss could become irreversible', answer: 'F' },
            { num: 20, stem: 'Statistics about the total number of species found in the Amazon basin', answer: 'A' },
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
          title: 'Rainforest Ecology and Conservation',
          template: `Tropical rainforests contain more than half of all known species despite covering only six percent of {{21}}. The forest is structured in distinct layers; the {{22}} layer, the tallest, is exposed to full sunlight and strong winds. The Brazil nut tree illustrates {{23}} relationships, depending on orchid bees for pollination and agoutis for seed dispersal. The Amazon acts as a massive {{24}}, storing billions of tonnes of carbon. Deforestation, driven partly by cattle {{25}}, destroys millions of hectares annually and may push the Amazon toward a {{26}} that makes large-scale dieback self-reinforcing.`,
          blanks: [
            { num: 21, answers: ['land surface'] },
            { num: 22, answers: ['emergent'] },
            { num: 23, answers: ['symbiotic'] },
            { num: 24, answers: ['carbon sink'] },
            { num: 25, answers: ['ranching'] },
            { num: 26, answers: ['tipping point'] },
          ],
        },
      ],
    },

    {
      part: 7,
      skill: 'reading',
      title: 'Reading — Passage 3: The History of Money',
      instructions: 'Read the passage and answer Questions 27–40.',
      passage: `The History of Money

Money is so fundamental to modern life that it is easy to forget that it is an invention—a social technology developed by human beings to solve the practical problems of exchange. The history of money is, in a sense, the history of a series of solutions to successive problems: how to facilitate trade between strangers, how to store value across time, how to coordinate economic activity at ever-increasing scales.

The popular belief that money evolved from barter has been questioned by economic historians and anthropologists. The barter story—in which primitive societies traded goods directly until the inefficiency of finding someone who simultaneously wanted what you had and had what you wanted prompted the invention of money as a medium of exchange—is intuitively appealing but largely unsupported by historical or ethnographic evidence. Anthropologist David Graeber, in his 2011 book Debt: The First 5,000 Years, argued that what actually preceded monetary economies was a complex system of mutual credit and social obligation. People in early communities kept track of debts and obligations informally, and money emerged not as a solution to barter but as a way to formalise and transfer pre-existing credit relationships.

The earliest physical money appears in the form of commodity money—objects that had intrinsic value independent of their use as a medium of exchange. Grain, cattle, shells, and cloth have all served this function at various points in human history. Metal coinage is generally traced to the kingdom of Lydia, in present-day western Turkey, around the seventh century BCE. Lydian coins were made from electrum, a naturally occurring alloy of gold and silver, and were stamped with a symbol guaranteeing their weight and purity. Coinage spread rapidly across the ancient world, adopted by Greek city-states, the Persian Empire, and eventually Rome, where it became integral to the administration of a vast, monetised economy.

Paper money originated in Tang-dynasty China around the seventh century CE, initially as certificates of deposit held by wealthy merchants who found it impractical to carry large amounts of copper coin. These certificates, known as "flying money," could be exchanged for coin at official depositories. By the Song dynasty, the government had begun issuing paper notes directly. When Marco Polo described Chinese paper money to European readers in the thirteenth century, they found the concept almost incomprehensible: the idea that pieces of paper, backed by nothing more tangible than imperial authority, could function as money seemed to defy common sense. European nations did not develop their own paper currencies in earnest until the seventeenth century, with Sweden issuing the first European banknotes in 1661.

The development of central banking in the seventeenth and eighteenth centuries was a further transformation. Central banks such as the Bank of England, founded in 1694, issued banknotes backed initially by gold reserves—the gold standard—providing a disciplined anchor for the money supply. The gold standard was progressively abandoned during the twentieth century, culminating in the United States formally ending gold convertibility in 1971 under President Nixon. Since then, all major currencies have been "fiat" money—backed not by any physical commodity but by government decree and public trust. The stability of fiat money depends on confidence in the issuing authority, as episodes of hyperinflation—in Weimar Germany, Zimbabwe, and Venezuela—have demonstrated when that confidence collapses.

The digital revolution has produced new forms of money. Electronic payments, credit cards, and digital wallets have made physical cash increasingly marginal in many economies. Cryptocurrency, beginning with Bitcoin in 2009, attempted to create a form of digital money that operates outside government and banking systems, relying instead on a decentralised computational network to validate transactions. Cryptocurrencies have attracted both enthusiastic adopters who see them as the future of finance and sceptical economists who question whether they can fulfil the core functions of money—medium of exchange, store of value, and unit of account—sufficiently well to challenge conventional currencies at scale.`,
      questions: [
        {
          type: 'mcq',
          id: 'r3-q27',
          part: 7,
          text: 'What does the passage say about the traditional "barter story" of money\'s origins?',
          options: [
            'It is confirmed by recent archaeological evidence from ancient civilisations.',
            'It is widely accepted by economic historians as accurate.',
            'It is intuitive but largely unsupported by historical or ethnographic evidence.',
            'It correctly identifies barter as the universal precursor to monetary systems.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'r3-q28',
          part: 7,
          text: 'According to David Graeber, what actually preceded the use of money in early societies?',
          options: [
            'A system of direct barter between neighbouring communities.',
            'Systems of mutual credit and social obligation.',
            'The use of commodity money such as grain and shells.',
            'Centralised government distribution of goods and services.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q29',
          part: 7,
          text: 'What was significant about the paper money described by Marco Polo?',
          options: [
            'It was backed by gold reserves held by the Chinese government.',
            'European readers found it difficult to understand money based on authority alone.',
            'It was adopted immediately by European merchants who heard about it.',
            'It was identical in design to modern central bank banknotes.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'r3-q30',
          part: 7,
          text: 'What does "fiat money" mean, according to the passage?',
          options: [
            'Money that is backed by gold or silver reserves held by a central bank.',
            'Currency whose value is supported by government decree and public trust.',
            'Digital currency that operates outside the banking system.',
            'Money that can be exchanged for a fixed quantity of a physical commodity.',
          ],
          answer: 1,
        },
        {
          type: 'formgroup',
          id: 'r3-ynng',
          part: 7,
          qRange: [31, 36],
          groupLabel: 'Do the following statements agree with the claims of the writer? Write YES, NO or NOT GIVEN.',
          template: `31. {{31}}: The author describes money as a social technology invented to solve problems of exchange.\n32. {{32}}: Lydian coins were the first coins to be made exclusively from pure gold.\n33. {{33}}: Chinese "flying money" was initially used by wealthy merchants rather than ordinary citizens.\n34. {{34}}: The Bank of England was the first central bank ever established in the world.\n35. {{35}}: The United States formally ended gold convertibility of the dollar in 1971.\n36. {{36}}: The passage suggests that cryptocurrencies have successfully replaced conventional currencies in most economies.`,
          blanks: [
            { num: 31, answers: ['YES'] },
            { num: 32, answers: ['NO'] },
            { num: 33, answers: ['YES'] },
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
          template: `37. Objects with value independent of their use as money, such as grain or shells, are described as {{37}} money.\n38. The earliest metal coins are generally associated with the kingdom of {{38}} in present-day Turkey.\n39. The abandonment of the {{39}} meant that currencies were no longer tied to a physical commodity.\n40. Bitcoin, launched in 2009, relies on a {{40}} network to validate transactions rather than banks or governments.`,
          blanks: [
            { num: 37, answers: ['commodity'] },
            { num: 38, answers: ['Lydia'] },
            { num: 39, answers: ['gold standard'] },
            { num: 40, answers: ['decentralised computational'] },
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
          imageUrl: '/assets/ielts/charts/set14-task1.svg',
          imageAlt: 'Process diagram showing how municipal wastewater is treated and reused',
          stimulus: 'The diagram below illustrates the stages involved in treating municipal wastewater and the ways in which the treated water is subsequently used.',
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
          stimulus: 'Artificial intelligence is increasingly being used to make decisions that significantly affect people\'s lives, such as in hiring, loan applications, and medical diagnosis.',
          text: 'Do you think this is a positive development? What safeguards, if any, should be put in place? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
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
          text: 'Part 1 — Personal questions about technology and daily decisions',
          followUp: [
            'Do you use any apps or digital tools to help you make decisions in daily life?',
            'How comfortable are you with technology making decisions on your behalf?',
            'Can you think of an example where technology has made your life more convenient?',
            'Do you ever worry about the amount of personal data that companies collect about you?',
          ],
        },
        {
          type: 'speak',
          id: 'sp2',
          part: 10,
          partNumber: 2,
          text: 'Part 2 — Individual long turn',
          cueCard: `Describe a time when you had to make a difficult decision.\n\nYou should say:\n• what the decision was about\n• what options you were considering\n• how you made your final choice\n• and explain how you feel about that decision now`,
        },
        {
          type: 'speak',
          id: 'sp3',
          part: 10,
          partNumber: 3,
          text: 'Part 3 — Discussion: Technology, ethics, and society',
          followUp: [
            'To what extent should machines be allowed to replace human judgement in important decisions?',
            'Who should be responsible when an AI system makes a mistake that harms someone?',
            'Do you think the benefits of AI technology are distributed fairly across society?',
            'How can societies ensure that technological development serves the public good?',
          ],
        },
      ],
    },
  ],
};

export default mock;
