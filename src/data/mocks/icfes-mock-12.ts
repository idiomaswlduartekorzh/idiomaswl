import type { MockExam } from './types';

const PART5_TEXT = `Electric Vehicles and the Road to Sustainability

The global electric vehicle (EV) market has grown at a pace that would have seemed extraordinary just a decade ago. In 2023, electric cars accounted for roughly one in every five new vehicles sold worldwide, with China, Europe, and parts of North America leading the transition. Governments and manufacturers alike argue that widespread EV adoption is essential for reducing transport-sector emissions, which account for approximately 16% of global greenhouse gas output.

The environmental case for EVs is compelling in certain respects. Because they produce no direct exhaust emissions, EVs dramatically reduce air pollution in urban areas, where conventional vehicles have long been a primary source of respiratory illness. Studies in cities that have expanded EV fleets show measurable improvements in nitrogen dioxide levels, a pollutant closely linked to asthma and cardiovascular disease.

However, the environmental picture is more nuanced than it first appears. The production of lithium-ion batteries — the heart of any electric vehicle — is energy-intensive and relies on the extraction of minerals such as lithium, cobalt, and nickel, which carry significant ecological and social costs. Mining operations in parts of the Congo and Chile have been linked to habitat destruction, water contamination, and labor rights abuses.

Furthermore, an EV\'s overall carbon footprint depends heavily on how the electricity used to charge it is generated. In countries where the power grid relies predominantly on coal or natural gas, EVs may offer only modest emissions savings compared to modern petrol vehicles. Conversely, in nations with predominantly renewable energy sources, EVs deliver dramatically lower lifetime emissions.

The transition to electric mobility is thus neither simple nor uniformly positive. Its success will ultimately depend on parallel progress in grid decarbonization, responsible mineral sourcing, and battery recycling infrastructure.`;

const PART6_TEXT = `Deforestation in the Tropics: A Crisis Hidden in Plain Sight

Tropical forests cover less than 10% of the Earth\'s land surface, yet they are home to more than half of the world\'s plant and animal species and absorb enormous quantities of atmospheric carbon dioxide. For these reasons, the accelerating loss of tropical forest cover represents one of the most consequential environmental crises of our time — even as it receives a fraction of the public attention devoted to other climate issues.

The drivers of tropical deforestation are well-documented. Agricultural expansion — particularly for cattle ranching, soya production, and palm oil cultivation — accounts for the majority of forest clearance globally. In the Amazon basin, which contains the world\'s largest tropical rainforest, satellite data show that forest loss accelerated sharply during the 2010s, driven by policy changes that weakened environmental enforcement and emboldened illegal land clearing. Between 2000 and 2020, the Amazon lost an area of forest larger than the entire country of France.

The consequences extend far beyond the borders of the affected countries. Tropical forests regulate regional rainfall patterns through a process called transpiration, in which trees release vast quantities of water vapor. Deforestation disrupts these patterns, contributing to droughts that affect agricultural regions hundreds of kilometres away from the cleared areas — a phenomenon that researchers have described as "flying rivers" being severed. Additionally, the carbon stored in cleared vegetation is released into the atmosphere, accelerating the very climate change that further stresses the remaining forest ecosystem.

There are, however, reasons for cautious optimism. Brazil\'s deforestation rate fell by more than 80% between 2004 and 2012, largely as a result of satellite monitoring, law enforcement, and financial pressure on companies in supply chains linked to deforestation. Similar declines have been observed in other countries following the implementation of payment-for-ecosystem-services programs, which compensate landowners for the economic value of preserved forests.

The central lesson of these successes is that deforestation is not inevitable. It is driven by economic incentives that can, with sufficient political will and international cooperation, be redirected toward forest conservation.`;

const PART7_TEXT = `Climate Action: Individual Responsibility vs. Systemic Change

The debate over who should lead the response to climate change has intensified in recent years, with two broad camps emerging. On one side stand those who emphasize individual behavior — the choices each person makes about diet, transport, consumption, and energy use. On the other stand those who insist that systemic, government-led change is the only force capable of operating at the scale and speed the climate crisis demands. In truth, both positions reflect partial understanding of a problem that is simultaneously personal and structural.

The case for individual action is not without foundation. Dietary choices, for instance, are genuinely consequential: livestock agriculture accounts for roughly 14.5% of global greenhouse gas emissions, and research suggests that a widespread shift toward plant-based diets could reduce food-system emissions by up to 70%. Flying less, driving less, and consuming less are all actions that, in aggregate, carry measurable environmental impact. Critics who dismiss individual action entirely risk inadvertently endorsing a form of passivity — the idea that nothing one does matters — which is both empirically inaccurate and psychologically corrosive.

And yet the limits of individual action are equally real. A person living in a city with no functional public transportation cannot meaningfully "choose" not to drive. A family that cannot afford to renovate their home cannot "choose" more efficient insulation. A farmer locked into a commodity market that rewards only high-volume, chemical-intensive production cannot easily "choose" sustainable agriculture. Structural conditions shape what choices are available, and focusing relentlessly on individual responsibility risks shifting attention away from the actors — corporations and governments — whose decisions determine those structural conditions.

The most effective responses to climate change have invariably combined both dimensions. Germany\'s rapid expansion of renewable energy required both government policy and citizen investment in solar panels. Costa Rica\'s extraordinary achievement in generating over 99% of its electricity from renewables relied on decades of deliberate public investment, not individual consumer choices. In both cases, government action created the conditions in which individual choices became meaningful.

The question, therefore, is not whether individuals or governments should act — both must. The more productive question is how government policy can be designed to make sustainable choices the easiest, most affordable, and most natural option for individuals. Framing climate action as either personal virtue or systemic reform misses the point. The task is to make them inseparable.`;

const mock: MockExam = {
  id: 'mock-12',
  examSlug: 'icfes',
  title: 'Mock 12 · Environment & Sustainability',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    // ── Part 1 — Vocabulary (5 questions) ────────────────────────────────────
    // Answers: 3, 1, 0, 2, 3   → 0×1, 1×1, 2×1, 3×2
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Choose the word that best matches each definition.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'Describing the use of resources in a way that meets present needs without compromising the ability of future generations to meet their own needs.',
          options: ['recyclable', 'organic', 'renewable', 'sustainable'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'A gas or other substance released into the atmosphere, especially as a by-product of burning fuels.',
          options: ['pollutant', 'emission', 'discharge', 'residue'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'The variety of plant and animal life found within a particular habitat or across the Earth as a whole.',
          options: ['biodiversity', 'ecosystem', 'habitat', 'taxonomy'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'Coming from a natural source that is naturally replenished and will not run out, such as wind or solar energy.',
          options: ['fossil', 'nuclear', 'renewable', 'conventional'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'To make an environment or substance harmful or poisonous by introducing pollutants or toxins.',
          options: ['erode', 'deplete', 'disperse', 'contaminate'],
          answer: 3,
        },
      ],
    },

    // ── Part 2 — Diálogos (9 questions) ──────────────────────────────────────
    // Answers: 1, 0, 2, 3, 0, 2, 1, 3, 0
    {
      part: 2,
      title: 'Parte 2 — Diálogos',
      instructions: 'Read each dialogue and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p2q1',
          part: 2,
          stimulus: 'Teacher: "Can anyone explain why the ocean\'s plastic pollution is so difficult to clean up?"\nStudent: _______',
          text: 'Which response demonstrates the best understanding of the issue?',
          options: [
            'Because most countries do not have enough boats to reach the plastic.',
            'Because plastic breaks into tiny microplastics that spread across vast areas and sink to different depths, making collection extremely challenging.',
            'Because ocean plastic is too heavy to remove with existing technology.',
            'Because plastic dissolves in salt water and cannot be recovered.',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Friend A: "I heard that recycling doesn\'t actually help. Is that true?"\nFriend B: _______',
          text: 'Which response is the most accurate and nuanced?',
          options: [
            'It\'s more complicated than that — recycling does reduce resource use and emissions, but its effectiveness depends on sorting systems, local infrastructure, and which materials are involved.',
            'Yes, it\'s completely useless and we should stop doing it.',
            'Recycling is the most important thing any individual can do for the environment.',
            'It\'s true, but only for plastic — glass and metal recycling work perfectly.',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Interviewer: "Your company claims to be carbon neutral. What does that actually mean in practice?"\nCompany spokesperson: _______',
          text: 'Which response is the most credible and transparent?',
          options: [
            '"It means we have eliminated all our emissions entirely."',
            '"It means our products produce no pollution during use."',
            '"It means we measure our total emissions, reduce them where possible, and offset the remainder through verified carbon credit schemes."',
            '"It means we have planted one million trees globally."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Resident: "The new factory near our town says it\'s environmentally friendly, but the river downstream has changed color."\nEnvironmental officer: "Have you reported this to the authorities?"\nResident: "Not yet. I wasn\'t sure if it was serious."\nEnvironmental officer: _______',
          text: 'What is the most appropriate professional response?',
          options: [
            '"It is probably just sediment from recent rain. No need to report it."',
            '"You should contact the factory directly before involving the authorities."',
            '"River color changes are normal and nothing to worry about."',
            '"Please file a report with us immediately. A change in water color can indicate contamination and requires prompt investigation."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Student A: "I want to reduce my carbon footprint but I don\'t know where to start."\nStudent B: _______',
          text: 'Which advice is the most practical and evidence-based?',
          options: [
            '"The single most impactful change is usually diet — reducing meat consumption, particularly beef, significantly lowers emissions. After that, consider how you travel."',
            '"Just use public transport more often and that\'s enough."',
            '"You should install solar panels on your home as soon as possible."',
            '"Avoid buying any new products — the manufacturing process is the biggest problem."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Journalist: "Many experts say individual actions alone cannot solve climate change. Do you agree?"\nActivist: "To some extent. But dismissing individual action entirely lets corporations off the hook."\nJournalist: _______',
          text: 'Which follow-up question best advances the discussion?',
          options: [
            '"So you think corporations are entirely to blame?"',
            '"Are you saying that individual action is pointless?"',
            '"So you see individual and systemic action as complementary rather than competing priorities?"',
            '"Should we stop talking about personal choices altogether?"',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Park ranger: "This is a protected forest. Visitors must stay on marked trails."\nHiker: "Why can\'t we walk anywhere we want? The forest looks fine."\nPark ranger: _______',
          text: 'What is the most appropriate explanation from the ranger?',
          options: [
            '"Those are the rules, and that\'s that."',
            '"Off-trail walking compacts the soil, damages root systems, and disturbs ground-nesting wildlife — impacts that are often invisible but accumulative."',
            '"The trails are there for your safety, not for environmental reasons."',
            '"Only some areas are sensitive, so you can walk freely in most of the forest."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Government official: "We\'re proposing to open part of the national park to mining."\nEnvironmentalist: "That would be devastating. Has an environmental impact assessment been conducted?"\nGovernment official: "We believe the economic benefits outweigh any environmental concerns."\nEnvironmentalist: _______',
          text: 'What is the most effective response from the environmentalist?',
          options: [
            '"Economic benefits are never more important than nature."',
            '"We will accept the plan if the company plants replacement trees."',
            '"An economic argument cannot replace a rigorous environmental impact study. We insist that one be conducted and made public before any decision is finalized."',
            '"The community should vote on this issue directly."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Child: "Why do we separate our rubbish into different bins?"\nParent: _______',
          text: 'Which explanation is the most age-appropriate and accurate?',
          options: [
            '"Because the rules say so."',
            '"Different materials need to go to different places — paper and plastic can be turned into new things, food scraps can become compost, and only the rest goes to landfill."',
            '"Because the rubbish collectors prefer it that way."',
            '"Because mixing everything together would smell bad."',
          ],
          answer: 1,
        },
      ],
    },

    // ── Part 3 — Completar texto (9 questions) ────────────────────────────────
    // Cloze passage about plastic pollution in oceans
    // Answers: 2, 0, 3, 1, 2, 0, 3, 1, 0
    {
      part: 3,
      title: 'Parte 3 — Completar texto',
      instructions: 'Read the passage and choose the best option for each numbered blank.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (1).',
          text: 'Blank (1): "Plastic pollution in the world\'s oceans _______ one of the most visible and pressing environmental problems..."',
          options: ['represent', 'are representing', 'represents', 'have represented'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (2).',
          text: 'Blank (2): "...an estimated 8 million metric tonnes of plastic waste _______ into the ocean every single year..."',
          options: ['enters', 'enter', 'has entered', 'entering'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (3).',
          text: 'Blank (3): "...plastic waste enters into the ocean every year, _______ from inadequate waste management systems..."',
          options: ['results', 'resulting', 'resulted', 'to result'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (4).',
          text: 'Blank (4): "...plastic does not disappear; instead, it _______ into progressively smaller fragments..."',
          options: ['is breaking', 'breaks down', 'has broken', 'broke'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (5).',
          text: 'Blank (5): "...microplastics, which are now found in environments _______ from the deepest ocean trenches to remote mountain peaks."',
          options: ['ranging', 'ranged', 'range', 'to range'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (6).',
          text: 'Blank (6): "Marine animals frequently mistake plastic debris for food, _______ serious harm to birds, fish, sea turtles, and marine mammals..."',
          options: ['causing', 'caused', 'causes', 'to cause'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (7).',
          text: 'Blank (7): "Researchers _______ that microplastics have also entered the human food chain..."',
          options: ['are warning', 'warned', 'warn', 'have warned'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (8).',
          text: 'Blank (8): "Several international agreements _______ to address the problem..."',
          options: ['had attempted', 'have attempted', 'are attempting', 'attempt'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          stimulus: `Plastic pollution in the world\'s oceans (1) one of the most visible and pressing environmental problems of the modern era. Since the large-scale production of plastic began in the 1950s, an estimated 8 million metric tonnes of plastic waste (2) into the ocean every single year, (3) from inadequate waste management systems, discarded fishing equipment, and single-use packaging that escapes collection networks. Once at sea, plastic does not disappear; instead, it (4) into progressively smaller fragments called microplastics, which are now found in environments (5) from the deepest ocean trenches to the peaks of remote mountain ranges. Marine animals frequently mistake plastic debris for food, (6) serious harm to birds, fish, sea turtles, and marine mammals across every ocean basin. Researchers (7) that microplastics have also entered the human food chain through seafood consumption, though the long-term health effects remain under investigation. Several international agreements (8) to address the problem, and in 2022, 175 nations agreed to negotiate a legally binding global plastics treaty — the most significant environmental commitment since the Paris Agreement on climate change. (9), experts warn that treaty negotiations alone will not be sufficient; fundamental changes to how plastic is produced, used, and managed are (10) necessary if the ocean is to recover.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (9).',
          text: 'Blank (9): "_______, experts warn that treaty negotiations alone will not be sufficient..."',
          options: ['Nevertheless', 'Furthermore', 'As a result', 'For example'],
          answer: 0,
        },
      ],
    },

    // ── Part 4 — Comprensión visual (9 questions) ─────────────────────────────
    // Answers: 2, 0, 3, 1, 2, 3, 0, 1, 2
    {
      part: 4,
      title: 'Parte 4 — Comprensión visual',
      instructions: 'Read each notice or sign carefully and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: 'SIERRA VERDE NATIONAL PARK\n——————————————\nWELCOME — PLEASE READ BEFORE ENTERING\n\n• Feeding wildlife is strictly prohibited.\n• Campfires permitted only in designated zones between 6–10 PM.\n• All waste must be carried out. No bins are provided inside the park.\n• Dogs are not permitted on forest trails.\n• Drone use requires prior written authorization from park management.\n\nViolations may result in fines of up to $500 and removal from the park.',
          stimulusLabel: 'Read the national park notice.',
          text: 'A visitor who wants to use a drone in the park must:',
          options: [
            'Pay a $500 fee at the entrance.',
            'Use the drone only in designated zones.',
            'Obtain written authorization from park management beforehand.',
            'Notify a park ranger upon arrival.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: 'SIERRA VERDE NATIONAL PARK\n——————————————\nWELCOME — PLEASE READ BEFORE ENTERING\n\n• Feeding wildlife is strictly prohibited.\n• Campfires permitted only in designated zones between 6–10 PM.\n• All waste must be carried out. No bins are provided inside the park.\n• Dogs are not permitted on forest trails.\n• Drone use requires prior written authorization from park management.\n\nViolations may result in fines of up to $500 and removal from the park.',
          stimulusLabel: 'Read the national park notice.',
          text: 'Which of the following is NOT mentioned as a rule in the park notice?',
          options: [
            'Restrictions on bringing dogs onto forest trails.',
            'A ban on picking plants or flowers.',
            'Limits on when campfires are allowed.',
            'Requirements for disposing of waste.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'GREENPOINT RECYCLING CENTRE\n——————————————\nACCEPTED MATERIALS:\n✓ Paper and cardboard (clean and dry)\n✓ Glass bottles and jars (labels removed)\n✓ Plastic bottles (types 1 and 2 only)\n✓ Aluminium and steel cans\n\nNOT ACCEPTED:\n✗ Plastic bags or film\n✗ Styrofoam\n✗ Broken glass\n✗ Electronics or batteries (see e-waste centre — Building C)\n\nCentre open: Monday–Saturday, 7:00 AM – 5:00 PM',
          stimulusLabel: 'Read the recycling centre sign.',
          text: 'A resident with a bag of used plastic shopping bags should:',
          options: [
            'Place them in the plastic bottles container.',
            'Drop them at the paper and cardboard station.',
            'Contact the recycling centre for special instructions.',
            'Take them elsewhere — plastic bags are not accepted here.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'GREENPOINT RECYCLING CENTRE\n——————————————\nACCEPTED MATERIALS:\n✓ Paper and cardboard (clean and dry)\n✓ Glass bottles and jars (labels removed)\n✓ Plastic bottles (types 1 and 2 only)\n✓ Aluminium and steel cans\n\nNOT ACCEPTED:\n✗ Plastic bags or film\n✗ Styrofoam\n✗ Broken glass\n✗ Electronics or batteries (see e-waste centre — Building C)\n\nCentre open: Monday–Saturday, 7:00 AM – 5:00 PM',
          stimulusLabel: 'Read the recycling centre sign.',
          text: 'Where should a visitor take old batteries according to the sign?',
          options: [
            'To the aluminium and steel cans container.',
            'To the e-waste centre in Building C.',
            'To any recycling bin in the facility.',
            'Batteries are not mentioned in the sign.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'EVERY DROP COUNTS\n——————————————\nWATER CONSERVATION CAMPAIGN — CITY OF PALMIRA\n\nDid you know?\n• A leaking tap wastes up to 20,000 litres per year.\n• A five-minute shower uses 5× less water than a full bath.\n• Watering gardens in the evening reduces evaporation by 30%.\n\nJoin our pledge: Fix leaks. Shorten showers. Water wisely.\nReport water waste: 1800-WATER | palmira.gov/water',
          stimulusLabel: 'Read the water conservation notice.',
          text: 'According to the notice, when is the best time to water a garden to minimize water loss?',
          options: [
            'In the early morning before sunrise.',
            'At midday when temperatures are highest.',
            'In the evening, when evaporation rates are lower.',
            'Immediately after rainfall.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'EVERY DROP COUNTS\n——————————————\nWATER CONSERVATION CAMPAIGN — CITY OF PALMIRA\n\nDid you know?\n• A leaking tap wastes up to 20,000 litres per year.\n• A five-minute shower uses 5× less water than a full bath.\n• Watering gardens in the evening reduces evaporation by 30%.\n\nJoin our pledge: Fix leaks. Shorten showers. Water wisely.\nReport water waste: 1800-WATER | palmira.gov/water',
          stimulusLabel: 'Read the water conservation notice.',
          text: 'What is the primary purpose of this notice?',
          options: [
            'To inform residents about a water shortage emergency.',
            'To advertise a new water pricing scheme.',
            'To explain how the city\'s water supply is managed.',
            'To encourage residents to adopt water-saving behaviors.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'ACT NOW FOR TOMORROW\n——————————————\nENVIRONMENTAL AWARENESS CAMPAIGN\n\n"The Earth does not belong to us — we belong to it."\n\n• 1 million species face extinction due to human activity.\n• The Amazon loses an area the size of a football field every minute.\n• Ocean temperatures have risen 0.13°C per decade since 1901.\n\nWhat YOU can do:\n→ Reduce single-use plastics\n→ Choose public transport\n→ Support reforestation projects\n\nLearn more: actnow.eco',
          stimulusLabel: 'Read the environmental campaign ad.',
          text: 'The statistic about the Amazon in this advertisement is intended to:',
          options: [
            'Demonstrate the speed and scale of ongoing deforestation.',
            'Encourage readers to visit the Amazon rainforest.',
            'Explain the causes of species extinction.',
            'Compare deforestation rates between different countries.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'ACT NOW FOR TOMORROW\n——————————————\nENVIRONMENTAL AWARENESS CAMPAIGN\n\n"The Earth does not belong to us — we belong to it."\n\n• 1 million species face extinction due to human activity.\n• The Amazon loses an area the size of a football field every minute.\n• Ocean temperatures have risen 0.13°C per decade since 1901.\n\nWhat YOU can do:\n→ Reduce single-use plastics\n→ Choose public transport\n→ Support reforestation projects\n\nLearn more: actnow.eco',
          stimulusLabel: 'Read the environmental campaign ad.',
          text: 'The opening quote "The Earth does not belong to us — we belong to it" is used to suggest:',
          options: [
            'Legal ownership of land should be redistributed equally.',
            'Human beings have a fundamental duty of stewardship toward the natural world.',
            'Environmental laws are more important than property rights.',
            'People should not buy land or property.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'ACT NOW FOR TOMORROW\n——————————————\nENVIRONMENTAL AWARENESS CAMPAIGN\n\n"The Earth does not belong to us — we belong to it."\n\n• 1 million species face extinction due to human activity.\n• The Amazon loses an area the size of a football field every minute.\n• Ocean temperatures have risen 0.13°C per decade since 1901.\n\nWhat YOU can do:\n→ Reduce single-use plastics\n→ Choose public transport\n→ Support reforestation projects\n\nLearn more: actnow.eco',
          stimulusLabel: 'Read the environmental campaign ad.',
          text: 'Which of the following actions is NOT listed as something individuals can do in this campaign?',
          options: [
            'Reducing the use of single-use plastics.',
            'Supporting reforestation projects.',
            'Switching to a plant-based diet.',
            'Choosing public transport.',
          ],
          answer: 2,
        },
      ],
    },

    // ── Part 5 — Texto corto (9 questions) ────────────────────────────────────
    // Answers: 3, 0, 2, 1, 3, 0, 2, 1, 0
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the article and answer the questions.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What share of global greenhouse gas emissions does the transport sector account for, according to the article?',
          options: ['Approximately 8%.', 'Approximately 12%.', 'Approximately 20%.', 'Approximately 16%.'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'Which direct environmental benefit of EVs in urban areas is specifically mentioned in the text?',
          options: [
            'A reduction in noise pollution from traffic.',
            'A reduction in air pollution, particularly nitrogen dioxide levels.',
            'A decrease in the amount of road space needed for vehicles.',
            'A reduction in urban heat island effects.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The word "nuanced" in the third paragraph most closely means:',
          options: [
            'Straightforward and easily understood.',
            'Biased toward a particular viewpoint.',
            'Complex, with important distinctions and subtleties.',
            'Highly controversial and debated.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to the article, which of the following is a social concern linked to EV battery mineral extraction?',
          options: [
            'The high cost of batteries for consumers.',
            'Labor rights abuses in mining operations.',
            'The shortage of charging infrastructure in rural areas.',
            'The difficulty of recycling old batteries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'In which situation would an EV deliver the greatest reduction in lifetime carbon emissions?',
          options: [
            'In a country where petrol vehicles are heavily taxed.',
            'In a city with a well-developed public transportation system.',
            'In a country that has banned the sale of diesel vehicles.',
            'In a country where electricity is generated mainly from renewable sources.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the author\'s overall assessment of the transition to electric vehicles?',
          options: [
            'The transition is neither straightforward nor uniformly positive and requires parallel progress in several areas.',
            'Electric vehicles are clearly the best solution to climate change and should be adopted immediately.',
            'The benefits of electric vehicles are outweighed by the costs of battery production.',
            'The transition to EVs is primarily a political issue rather than an environmental one.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What does the phrase "parallel progress" in the final paragraph imply?',
          options: [
            'Countries should adopt EVs at the same time as each other.',
            'Progress in battery technology and EV production should happen simultaneously.',
            'EV adoption must be accompanied by advances in the electricity grid, mineral sourcing, and recycling.',
            'Governments and private companies must work at the same pace.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'Based on the article, what can be inferred about countries where electricity still comes mainly from coal?',
          options: [
            'EVs have no environmental value at all in those countries.',
            'EVs offer only limited emissions improvements compared to conventional vehicles in those contexts.',
            'Conventional petrol vehicles are actually cleaner than EVs in coal-powered grids.',
            'EVs cannot be charged using electricity from coal power plants.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The main purpose of this article is to:',
          options: [
            'Argue that electric vehicles should be subsidized by governments worldwide.',
            'Provide a balanced account of the environmental promise and limitations of electric vehicles.',
            'Discourage readers from purchasing electric vehicles.',
            'Explain the technical engineering behind lithium-ion batteries.',
          ],
          answer: 1,
        },
      ],
    },

    // ── Part 6 — Texto largo: inferencia (7 questions) ────────────────────────
    // Answers: 3, 0, 2, 1, 3, 0, 2
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the article carefully and answer the questions. Focus on implied meaning, author attitude, and text structure.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the central argument of the article?',
          options: [
            'Tropical deforestation is caused primarily by illegal logging rather than agriculture.',
            'International pressure on corporations is the only effective tool against deforestation.',
            'Deforestation is a natural process that cannot be stopped by policy.',
            'Tropical forest loss is a critical global crisis that is under-recognized but can be reversed with political will.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What does the article identify as the primary driver of tropical deforestation?',
          options: [
            'Agricultural expansion, including cattle ranching, soya, and palm oil production.',
            'Urban expansion into forested areas.',
            'Illegal logging by multinational timber companies.',
            'Climate change causing natural forest die-offs.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The term "flying rivers" as used in the third paragraph refers to:',
          options: [
            'Rivers that change course due to flooding caused by deforestation.',
            'The water vapor released by trees that regulates regional rainfall patterns.',
            'Aerial irrigation systems used in tropical agriculture.',
            'Cloud formations above the Amazon canopy.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What does the example of Brazil\'s deforestation decline between 2004 and 2012 serve to illustrate?',
          options: [
            'That Brazil has permanently solved its deforestation problem.',
            'That satellite monitoring is the single most effective anti-deforestation tool.',
            'That deforestation rates are impossible to reverse once they begin.',
            'That deforestation can be significantly reduced through deliberate policy combined with economic pressure.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The word "transpiration" in the third paragraph most likely refers to:',
          options: [
            'The absorption of carbon dioxide by forest leaves during photosynthesis.',
            'The transport of nutrients from soil through tree roots to branches.',
            'The movement of water vapor between forests and the ocean.',
            'The process by which trees release water vapor into the atmosphere.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the author\'s attitude toward tropical deforestation?',
          options: [
            'Deeply concerned about the scale of the problem but cautiously optimistic that policy solutions can work.',
            'Pessimistic that any meaningful change can occur given current economic pressures.',
            'Neutral and objective, presenting all perspectives without taking a position.',
            'Optimistic that technological solutions will solve the problem without policy changes.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What does the phrase "hidden in plain sight" in the title most likely suggest?',
          options: [
            'The forests are physically difficult to see because they are so remote.',
            'Deforestation data is classified by governments.',
            'Deforestation is an obvious and visible problem that nonetheless receives insufficient attention.',
            'The causes of deforestation are complex and not immediately apparent.',
          ],
          answer: 2,
        },
      ],
    },

    // ── Part 7 — Texto de opinión (6 questions) ───────────────────────────────
    // Answers: 1, 3, 0, 2, 1, 3
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      instructions: "Read the opinion piece and answer the questions about the author's argument, rhetorical choices, and implied meaning.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s main position in this article?',
          options: [
            'Individuals should take full personal responsibility for climate change.',
            'Both individual action and government-led systemic change are necessary, and effective policy should make sustainable choices accessible to everyone.',
            'Government action alone can solve climate change without any need for individual behavioral change.',
            'The climate debate between individuals and governments is irresolvable.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author characterize those who "dismiss individual action entirely"?',
          options: [
            'As pragmatic realists focused on the most effective solutions.',
            'As accurately representing the limitations of personal behavior change.',
            'As insufficiently motivated to make personal sacrifices.',
            'As promoting a form of passivity that is both empirically wrong and psychologically harmful.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'The author uses the example of a farmer "locked into a commodity market" to illustrate:',
          options: [
            'That agricultural workers are unwilling to adopt sustainable practices.',
            'That sustainable farming is not yet technologically possible.',
            'That structural conditions can prevent individuals from making sustainable choices even when they want to.',
            'That food production is a minor contributor to greenhouse gas emissions.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does Costa Rica\'s achievement in renewable energy generation demonstrate, according to the author?',
          options: [
            'That small countries can achieve environmental goals more easily than large ones.',
            'That individual consumers can drive a nation\'s energy transition through purchasing decisions.',
            'That tropical countries have a natural advantage in producing renewable energy.',
            'That sustained government investment over time can create conditions for remarkable environmental outcomes.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'The phrase "make sustainable choices the easiest, most affordable, and most natural option" implies that:',
          options: [
            'The goal of policy should be to design systems where sustainable behavior is the default, not an exceptional effort.',
            'Governments should offer financial rewards to individuals who adopt sustainable lifestyles.',
            'Sustainable options are currently more expensive and less convenient than conventional ones in all countries.',
            'People naturally prefer sustainable choices when given the option.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'The final sentence — "The task is to make them inseparable" — refers to making which two things inseparable?',
          options: [
            'Government regulation and corporate responsibility.',
            'Individual lifestyle changes and international climate agreements.',
            'Scientific research and public environmental education.',
            'Personal virtue and systemic reform as complementary, not competing, approaches to climate action.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which of the following best describes the overall structure of the author\'s argument?',
          options: [
            'The author presents only the government\'s perspective, ignoring the role of individuals.',
            'The author first dismisses individual action, then advocates exclusively for government regulation.',
            'The author acknowledges the limits of one approach before arguing that both systemic and individual action are needed together.',
            'The author concludes that climate change cannot be solved by current governments or individuals.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
