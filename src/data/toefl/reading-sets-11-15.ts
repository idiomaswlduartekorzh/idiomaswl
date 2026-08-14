import type {
  ToeflReadingExpansionItem,
  ToeflReadingExpansionObject,
  ToeflReadingExpansionOption,
} from './reading-sets-2-5';

interface PublicQuestion {
  prompt: string;
  options: readonly [string, string, string, string];
}

interface PublicSetDefinition {
  slug: string;
  title: string;
  text: string;
  questions: readonly [PublicQuestion, PublicQuestion, PublicQuestion, PublicQuestion, PublicQuestion];
  supplementary: PublicQuestion;
}

const CONTENT_VERSION = '2026-08-14.w6';
const DISCLOSURE = 'Práctica fija WeLearn. Reproduce una familia de lectura y corrección local; no es adaptativa ni genera una puntuación oficial de ETS.';

function options(itemId: string, values: readonly string[]): ToeflReadingExpansionOption[] {
  return values.map((text, index) => {
    const label = String.fromCharCode(65 + index);
    return { id: `${itemId}:option-${label.toLowerCase()}`, label, text };
  });
}

function createSet(setNumber: number, definition: PublicSetDefinition): ToeflReadingExpansionObject {
  const singleItems = definition.questions.map<ToeflReadingExpansionItem>((question, index) => {
    const number = index + 1;
    const id = `item:t${setNumber}-r-ap${number}-v2`;
    return {
      type: 'single-select', id, legacyId: `t${setNumber}-r-ap${number}`,
      contentVersion: CONTENT_VERSION, prompt: question.prompt,
      options: options(id, question.options), alignment: 'official-family-pilot',
    };
  });
  const multiId = `item:t${setNumber}-r-ap6-supplementary`;
  return {
    id: `toefl-reading-set${setNumber}-v2`,
    objectId: `object:toefl-reading-set${setNumber}-v2`,
    contentVersion: CONTENT_VERSION,
    scoringVersion: `toefl-reading-local-exact-set${setNumber}@${CONTENT_VERSION}`,
    disclosure: DISCLOSURE,
    academic: {
      id: `item:t${setNumber}-r-ap-${definition.slug}-v2`,
      title: definition.title,
      instructions: 'Read the passage and choose one answer for questions 1–5.',
      text: definition.text,
      items: [...singleItems, {
        type: 'multi-select', id: multiId, legacyId: `t${setNumber}-r-ap6`,
        contentVersion: CONTENT_VERSION, prompt: definition.supplementary.prompt,
        options: options(multiId, definition.supplementary.options), selectCount: 2,
        alignment: 'welearn-supplementary',
      }],
    },
  };
}

export const TOEFL_READING_SET11_V2 = createSet(11, {
  slug: "antibiotic-resistance", title: "Antibiotic Resistance",
  text: "Antibiotics transformed medicine by making many bacterial infections treatable. After penicillin entered widespread use, illnesses that had often been deadly could be controlled, and procedures such as surgery became safer.\n\nResistance develops in the microorganisms, not in the patient. Within a bacterial population, genetic changes may make some cells less vulnerable to a drug. Bacteria can also acquire resistance genes from other bacteria. When an antibiotic kills susceptible cells, resistant ones may survive, reproduce, and spread their genes.\n\nThis selection is a natural evolutionary process, but inappropriate use accelerates it. Antibiotics cannot treat viral infections such as colds, and using them when they are not needed creates avoidable pressure. Use in people, animals, and agriculture can all contribute when antibiotics are misused or overused.\n\nSome bacteria resist several medicines and are commonly called superbugs. They can make infections difficult or sometimes impossible to treat. Public-health specialists warn that without effective antibiotics, common infections and medical procedures become more dangerous. Solutions include prevention, accurate diagnosis, appropriate prescribing, surveillance, and research. New drugs help, but careful use is also necessary to preserve their effectiveness.",
  questions: [
    { prompt: "How did the introduction of antibiotics change medicine?", options: ["It replaced every other treatment.", "It made surgery impossible.", "It made many once-deadly bacterial infections treatable.", "It immediately eliminated infectious disease."] },
    { prompt: "How can resistant bacteria become more common during treatment?", options: ["Antibiotics teach each bacterium to adapt.", "Patients become immune to the medicine.", "Every bacterium changes in the same way.", "Susceptible cells die while resistant cells survive and reproduce."] },
    { prompt: "Which practice can accelerate antibiotic resistance?", options: ["Using antibiotics for viral infections they cannot treat", "Using diagnostic tests before treatment", "Preventing infections through hygiene", "Following appropriate professional guidance"] },
    { prompt: "What are superbugs?", options: ["Unusually large bacteria", "Bacteria resistant to several medicines", "A new class of antibiotics", "All harmless bacteria"] },
    { prompt: "What risk does the passage associate with ineffective antibiotics?", options: ["New antibiotics would be discovered every day.", "No one would need surgery.", "Common infections and medical procedures could become more dangerous.", "Viruses would disappear."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["Antibiotic resistance is an example of evolutionary selection.", "Antibiotics are effective against viral colds.", "Misuse in people, animals, or agriculture can add selection pressure.", "New antibiotics alone permanently solve resistance."] },
});

export const TOEFL_READING_SET12_V2 = createSet(12, {
  slug: "great-barrier-reef", title: "The Great Barrier Reef",
  text: "The Great Barrier Reef is not a single organism. It is a vast system of reefs and islands built partly through the repeated activity of tiny coral polyps. Many reef-building polyps produce calcium-carbonate skeletons that remain after they die.\n\nNew polyps can grow on older skeletal material, so colonies gradually add to the three-dimensional reef. This structure provides shelter, feeding areas, and nursery habitat for many other organisms. Because corals create physical conditions used by whole communities, scientists often describe them as habitat-forming species or ecosystem engineers.\n\nThe process is slow, but damage can occur rapidly. Reef-building corals tolerate a limited range of local conditions. Marine heatwaves can cause bleaching, while ocean acidification makes calcification more difficult. Severe storms, poor water quality, and outbreaks of coral-eating crown-of-thorns starfish add further pressure.\n\nA reef can recover from some disturbances when surviving corals reproduce and conditions improve, but repeated stress reduces recovery time. This creates a troubling contrast: structures accumulated over thousands of years may lose living coral within much shorter periods. Local management can improve water quality and control some threats, while limiting ocean warming requires reductions in global greenhouse-gas emissions.",
  questions: [
    { prompt: "What does the first paragraph emphasize?", options: ["The reef is a single animal.", "A vast structure results partly from repeated activity by tiny polyps.", "The reef consists only of islands.", "Coral skeletons disappear immediately."] },
    { prompt: "How does reef structure grow over time?", options: ["Fish carry rocks into place.", "One polyp expands without limit.", "New polyps add skeletons on older skeletal material.", "Waves manufacture calcium carbonate."] },
    { prompt: "Why are corals called ecosystem engineers?", options: ["They regulate all ocean temperatures.", "They design machines.", "They consume every competing species.", "Their structure creates habitat used by many organisms."] },
    { prompt: "Why are reef-building corals vulnerable?", options: ["They tolerate a limited range of conditions and face heat and chemistry changes.", "They cannot live in seawater.", "They grow only on metal.", "They are unaffected by storms."] },
    { prompt: "What contrast does the passage identify?", options: ["The reef is both one organism and many organisms.", "Long-built structures can lose living coral over much shorter periods.", "Local action can stop global warming by itself.", "Bleaching always causes immediate recovery."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["Reef structure creates varied habitat for other organisms.", "The Great Barrier Reef is one single organism.", "Reducing global warming requires action beyond local reef management.", "Corals are unaffected by changing water temperature."] },
});

export const TOEFL_READING_SET13_V2 = createSet(13, {
  slug: "gps", title: "How GPS Works",
  text: "A Global Positioning System receiver estimates location from radio signals sent by satellites whose positions are known. Each signal includes precise timing information. Because radio waves travel at the speed of light, the receiver can estimate its distance from a satellite by measuring signal travel time.\n\nDistances from several satellites define overlapping spheres around them. Comparing these distances is called trilateration. Three distances can locate a point geometrically, but an ordinary receiver also has an unknown clock error. Signals from at least four satellites allow it to solve for three-dimensional position and correct its clock at the same time.\n\nTiming must be extraordinarily precise. Light travels about 300,000 kilometers in one second, so even a tiny timing error produces a substantial distance error. GPS satellites therefore carry atomic clocks, while receivers continually synchronize their calculations with the transmitted time.\n\nRelativity also matters. Motion makes an orbiting clock run slightly slower than a stationary one, while weaker gravity at satellite altitude makes it run faster. Engineers correct the combined effect; without those corrections, navigation errors would quickly grow. GPS therefore joins geometry, atomic timekeeping, orbital prediction, and fundamental physics in a technology used every day.",
  questions: [
    { prompt: "How does a receiver estimate its distance from a GPS satellite?", options: ["It combines signal travel time with the known speed of radio waves.", "It measures the satellite's brightness.", "It uses a magnetic compass.", "It counts all satellites in orbit."] },
    { prompt: "What is trilateration in the passage?", options: ["Sending a signal back to one satellite", "Using distances from known satellite positions to locate the receiver", "Measuring satellite temperature", "Drawing a map without timing data"] },
    { prompt: "Why is extremely accurate timing necessary?", options: ["It reduces battery weight.", "It keeps satellites warm.", "A tiny timing error creates a substantial distance error.", "It changes the speed of light."] },
    { prompt: "Why must GPS calculations account for relativity?", options: ["Radio signals exceed the speed of light.", "Earth has a curved surface.", "Satellites are too heavy.", "Motion and weaker gravity change satellite clock rates."] },
    { prompt: "What is the passage's main conclusion?", options: ["GPS combines fundamental science with an everyday technology.", "GPS is useful only to the military.", "Einstein invented satellite navigation.", "Receivers contain no clocks."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["An ordinary GPS receiver generally needs signals from at least four satellites to solve position and clock error.", "GPS was created for shopping applications.", "Small timing errors can cause large position errors.", "Satellite clocks require no correction."] },
});

export const TOEFL_READING_SET14_V2 = createSet(14, {
  slug: "bees-pollination", title: "Bees and Pollination",
  text: "Bees are known for honey and wax, but their broader ecological importance comes from pollination. While collecting nectar or pollen, a bee may carry pollen from the male part of one flower to the female part of another. This transfer allows many wild plants and crops to produce seeds or fruit.\n\nBees often show flower constancy during a foraging trip: an individual tends to visit flowers of one plant species before switching. That behavior increases the chance that pollen reaches a compatible flower instead of being deposited on an unrelated species. Plants gain more effective pollen transfer, while bees collect food.\n\nPollination depends on diverse animals, not only managed honey bees. Wild bees and other insects also contribute, and different crops rely on pollinators to different degrees. Protecting varied habitats therefore supports more than one species.\n\nBee health faces interacting pressures. Habitat loss can reduce food and nesting sites; parasites, pathogens, pesticides, poor nutrition, climate conditions, and management practices can also matter. Colony collapse disorder describes a particular pattern of losses in managed honey-bee colonies, not a single proven cause of every bee decline. Preserving flowering habitat and reducing avoidable risks can support pollinator communities and the plants that depend on them.",
  questions: [
    { prompt: "What contribution of bees does the passage emphasize?", options: ["Making wax", "Controlling every crop pest", "Producing honey", "Pollinating wild plants and crops"] },
    { prompt: "What is flower constancy?", options: ["An individual bee tending to visit one plant species during a foraging trip", "A flower that never changes", "A pesticide treatment", "A bee visiting every species in random order"] },
    { prompt: "Why can flower constancy benefit plants?", options: ["It prevents flowers from producing pollen.", "It makes compatible pollen transfer more likely.", "It eliminates the need for water.", "It guarantees fruit in every flower."] },
    { prompt: "What does the passage say about bee declines and colony collapse disorder?", options: ["They have no connection to environmental conditions.", "Every decline has one proven cause.", "Multiple interacting pressures can affect bee health.", "Only cold weather matters."] },
    { prompt: "What broader point does the passage make?", options: ["Only honey bees perform pollination.", "Every crop depends equally on bees.", "Pollinator protection requires removing all insects.", "Healthy pollinator communities support plants and human food systems."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["Many wild plants and crops benefit from animal pollination.", "Colony collapse disorder has one proven cause.", "Preserving flowering habitat can support pollinators.", "Bees always visit many plant species during one trip."] },
});

export const TOEFL_READING_SET15_V2 = createSet(15, {
  slug: "child-language", title: "How Children Learn Language",
  text: "Most children acquire a complex spoken or signed language early in life without formal grammar lessons. They learn words, combine them into sentences, and generalize patterns from the language used around them. How biology and experience make this possible remains an active scientific debate.\n\nOne influential nativist account proposes that humans begin with specialized constraints or capacities for language. Children sometimes produce forms they were not taught, such as “goed” instead of “went.” This overregularization shows that they are applying a pattern, although it does not by itself prove one theory about where the pattern comes from.\n\nUsage-based and statistical-learning accounts emphasize information in the input. Infants can detect regularities in speech, and children use frequency, context, meaning, and multiple cues as they learn. Social interaction also matters: shared attention and responsive conversation help connect words with speakers, objects, and intentions.\n\nThese approaches need not treat biology and learning as simple opposites. Human brains develop capacities for communication, while the language a child acquires depends on exposure and interaction. Researchers still disagree about which mechanisms are language-specific and how much each contributes. Evidence increasingly examines how prepared learners combine statistical patterns, social information, memory, and developing cognitive abilities in a language-rich environment.",
  questions: [
    { prompt: "What central puzzle does the passage address?", options: ["Why adults forget all languages", "Why every language has identical grammar", "How children acquire complex language without formal grammar lessons", "How schools should grade writing"] },
    { prompt: "What does the nativist account propose?", options: ["Children have better hearing than adults.", "Speech depends on one special muscle.", "Vocabulary is present at birth.", "Humans begin with specialized constraints or capacities for language."] },
    { prompt: "What does a form such as “goed” demonstrate?", options: ["A child is generalizing a pattern rather than only copying a heard form.", "A child has learned no grammar.", "Adults routinely say the same form.", "The child cannot detect patterns."] },
    { prompt: "What do usage-based and statistical accounts emphasize?", options: ["Language develops without input.", "Children learn from regularities, context, and interaction.", "Only formal lessons produce language.", "Social information prevents learning."] },
    { prompt: "What conclusion does the passage support?", options: ["Biology has no role.", "One theory has settled every question.", "Language emerges through prepared learners interacting with structured input and people.", "Language is purely imitation."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["Children acquire complex language largely without formal grammar instruction.", "Environment has no effect on which language a child acquires.", "Research examines contributions from statistical, social, memory, and biological processes.", "Overregularization alone proves one specific theory."] },
});

export const TOEFL_READING_SETS_11_TO_15 = [
  TOEFL_READING_SET11_V2,
  TOEFL_READING_SET12_V2,
  TOEFL_READING_SET13_V2,
  TOEFL_READING_SET14_V2,
  TOEFL_READING_SET15_V2,
];
