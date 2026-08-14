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

const CONTENT_VERSION = '2026-08-14.w7';
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

export const TOEFL_READING_SET16_V2 = createSet(16, {
  slug: "brain-myth", title: "The Ten-Percent Brain Myth",
  text: "The claim that people use only ten percent of their brains is a myth, not a result of neuroscience. The brain does not activate every cell at its maximum rate simultaneously, but that is different from leaving ninety percent permanently idle.\n\nImaging studies measure changes in blood flow or metabolism while people rest or perform tasks. They show activity distributed across many networks, with different regions becoming more or less active as demands change. An area that is quiet during one brief task may participate in another process later.\n\nEnergy use also contradicts the picture of a tiny active portion. The brain maintains a substantial and relatively steady baseline demand even when a person is resting. Many neurons fire only when relevant signals arrive, which helps the organ operate efficiently rather than proving that those cells are useless.\n\nBrain injuries and clinical studies link regions and networks to movement, language, attention, memory, emotion, and basic body regulation. Effects vary and the brain can sometimes adapt, so scientists do not claim every small injury has an obvious result. The evidence still leaves no hidden, unused ninety percent waiting to be unlocked.",
  questions: [
    { prompt: "What is the passage's main claim?", options: ["Brain imaging is unreliable.", "The ten-percent claim is a neuroscience myth.", "Every neuron fires at maximum speed all day.", "Most of the brain has no known role."] },
    { prompt: "Why does low activity during one task not show that a region is unused?", options: ["Blood flow never changes.", "Only movement activates the brain.", "The region may participate in a different process later.", "Rest permanently switches off most networks."] },
    { prompt: "How does energy use challenge the myth?", options: ["The brain consumes no energy at rest.", "Only active muscles use energy.", "The brain uses all energy in the body.", "The brain maintains a substantial baseline demand rather than powering only a tiny portion."] },
    { prompt: "Why does the passage qualify the evidence from brain injuries?", options: ["Effects vary and the brain can sometimes adapt.", "Brain injury always improves function.", "No region is connected with behavior.", "Every tiny injury has the same result."] },
    { prompt: "What conclusion does the evidence support?", options: ["A hidden reserve can be unlocked by training.", "There is no permanently unused ninety percent waiting to be activated.", "Imaging can measure individual thoughts exactly.", "Neurons should all fire simultaneously."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["Imaging shows changing activity across distributed networks.", "A region quiet in one task is permanently useless.", "Selective firing can help neurons use energy efficiently.", "Every brain injury produces an obvious identical effect."] },
});

export const TOEFL_READING_SET17_V2 = createSet(17, {
  slug: "flow", title: "The Psychology of Flow",
  text: "Psychologists use the term flow for a gratifying state of deep involvement in an activity. People in flow often report intense concentration, reduced self-consciousness, a sense of control, and an altered experience of time. These features describe subjective experience; they do not mean that performance is literally effortless or always reaches its maximum.\n\nA prominent model proposes that flow is more likely when a demanding task is matched to a person's perceived skills. Clear goals and prompt, understandable feedback can also support continued attention. In the model, a challenge far beyond perceived ability is associated with anxiety, while a task far below it may encourage boredom.\n\nChallenge-skill balance is influential, but research does not treat it as a guaranteed switch. Interest, autonomy, self-efficacy, personal importance, and context can also matter. Some studies do not reproduce the same physiological or neural patterns, and researchers continue to debate how flow should be measured.\n\nFlow has been studied in work, music, sport, games, education, and rehabilitation. Much evidence relies on reports collected during or after activities, which makes cause and effect difficult to establish. The safest conclusion is that task structure and personal perception can make deep absorption more likely, not that anyone can command it on demand.",
  questions: [
    { prompt: "What is flow in the passage?", options: ["A reported state of deep involvement in an activity", "A guaranteed method for maximum performance", "A medical sleep stage", "A form of boredom"] },
    { prompt: "What experience is commonly associated with flow?", options: ["Complete loss of task control", "Intense concentration and an altered sense of time", "Literal absence of effort", "Inability to remember the activity"] },
    { prompt: "What does a prominent flow model emphasize?", options: ["Avoiding all feedback", "Keeping every task easy", "Matching high challenge to perceived skill, with clear goals and feedback", "Measuring only physical strength"] },
    { prompt: "What limitation does the passage identify?", options: ["Flow occurs only in sport.", "Challenge-skill balance explains every case.", "Neural studies all show one pattern.", "Balance can help but does not guarantee flow, and findings vary."] },
    { prompt: "What conclusion does the author consider safest?", options: ["Task structure and personal perception can make deep absorption more likely.", "Anyone can command flow immediately.", "Flow always proves exceptional performance.", "Context and interest do not matter."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["Flow is often described through concentration, control, and altered time.", "A challenge far below skill always produces flow.", "Autonomy, interest, and self-efficacy may influence flow.", "Researchers have established one universal neural signature."] },
});

export const TOEFL_READING_SET18_V2 = createSet(18, {
  slug: "vaccines", title: "How Vaccines Work",
  text: "Vaccines prepare the immune system to respond to a particular infectious threat without exposing a person to the full dangers of the disease. Different vaccines present the immune system with a weakened or killed microbe, a harmless component, genetic instructions, or another form of antigen.\n\nAfter recognizing the antigen, immune cells produce a targeted response. Some B cells and T cells persist as memory cells. If the real pathogen appears later, this memory can help the body respond more quickly and reduce the chance of serious illness.\n\nProtection is not identical for every vaccine or every person. Some vaccines require several doses, immunity can take time to develop, and protection may fade or be reduced when a pathogen changes. Recommended boosters or updated vaccines help maintain protection in those cases.\n\nVaccination can also reduce opportunities for some person-to-person infections to spread through a community. This indirect protection is sometimes called community or herd immunity. Its strength depends on the disease, the vaccine, population coverage, and how well vaccination limits transmission; there is no universal threshold. Reduced spread can help protect people who cannot receive a particular vaccine or may respond poorly, but it does not guarantee that every vulnerable person is safe.",
  questions: [
    { prompt: "What is the main purpose of vaccination described here?", options: ["To eliminate every microbe from the body", "To replace the immune system", "To guarantee that infection is impossible", "To prepare a targeted immune response without the full dangers of disease"] },
    { prompt: "What role do memory cells play?", options: ["They can help the body respond more quickly to a later encounter.", "They prevent the immune system from recognizing antigens.", "They make every vaccine last for life.", "They remove the need for recommended doses."] },
    { prompt: "Why can a vaccine schedule include several doses or boosters?", options: ["All vaccines disappear within one hour.", "Protection varies and may take time, fade, or need updating.", "A booster exposes everyone to full disease.", "Immune memory never develops."] },
    { prompt: "What is community immunity in this passage?", options: ["Immunity that exists only in animals", "A single threshold shared by all diseases", "Reduced spread that can indirectly protect others under disease-specific conditions", "A guarantee that no vulnerable person will be infected"] },
    { prompt: "What important qualification closes the passage?", options: ["Vaccination affects only vaccinated people.", "Coverage never influences transmission.", "Every vaccine blocks transmission completely.", "Indirect protection can help vulnerable people but cannot guarantee complete safety."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["Vaccines can use several different forms of antigen.", "Every vaccine provides perfect lifelong protection after one dose.", "Community protection depends on the disease, vaccine, coverage, and transmission effects.", "One universal vaccination percentage applies to every infection."] },
});

export const TOEFL_READING_SET19_V2 = createSet(19, {
  slug: "dreams", title: "Why Do We Dream?",
  text: "Dreams are experiences of images, thoughts, and emotions during sleep. They can occur in both rapid-eye-movement, or REM, sleep and non-REM sleep, although REM dreams are often reported as longer, more vivid, and more story-like. Because many dreams are forgotten, reports provide an incomplete record.\n\nScientists agree that the sleeping brain remains active, but they do not agree on one function for dreaming. In the activation-synthesis account, internally generated activity during REM sleep reaches the forebrain, which organizes elements of that activity into a conscious experience. Later models add details about changing brain chemistry and activity across regions.\n\nOther hypotheses connect dreaming with memory, emotional processing, threat simulation, or creative association. Sleep clearly supports important forms of memory and emotional regulation, yet those benefits do not by themselves prove that the remembered dream story caused them. A person may also dream outside REM, which prevents REM activity from serving as a complete explanation.\n\nResearchers study brain activity, awaken sleepers for reports, and compare dream content with waking experience. Each method has limits: neural measurements cannot reveal an entire story, and a report depends on recall. Dreaming is therefore a productive research problem rather than a mystery already solved by one theory.",
  questions: [
    { prompt: "What does the passage say about the function of dreams?", options: ["It is completely explained by memory consolidation.", "Dreams have no relationship to brain activity.", "No single function has gained general agreement.", "Dreaming occurs only in childhood."] },
    { prompt: "What does activation-synthesis propose?", options: ["Dreams replay daily events exactly.", "Dream stories predict future events.", "Only non-REM sleep produces dreams.", "The forebrain organizes internally generated activity into conscious experience."] },
    { prompt: "Why does the author separate sleep benefits from dream stories?", options: ["Benefits of sleep do not by themselves prove that remembered dream narratives caused them.", "Sleep has no role in memory.", "People remember every dream accurately.", "REM sleep is a passive state."] },
    { prompt: "What limitation affects methods that study dreams?", options: ["Brain measurements provide a complete transcript.", "Neural data cannot reveal the whole story, and reports depend on recall.", "Researchers cannot wake sleeping participants.", "Dreams never occur outside REM."] },
    { prompt: "What is the passage's final conclusion?", options: ["Activation-synthesis has solved every question.", "Dreams are meaningless noise.", "Dreaming remains an active research problem with competing explanations.", "Only one measurement method is needed."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["Dreams can occur during REM and non-REM sleep.", "Every dream is remembered after waking.", "Hypotheses connect dreaming with memory and emotional processing.", "Scientists can reconstruct a complete dream from neural data alone."] },
});

export const TOEFL_READING_SET20_V2 = createSet(20, {
  slug: "dark-cosmos", title: "Dark Matter and Dark Energy",
  text: "In the standard cosmological model, ordinary matter accounts for about five percent of the universe's total mass-energy. Current estimates assign roughly twenty-seven percent to dark matter and sixty-eight percent to dark energy. These proportions come from several astronomical observations and may be refined as models and measurements improve.\n\nDark matter is inferred from gravity. Stars and gas move within galaxies, galaxies move within clusters, and light bends around massive structures in ways that visible matter alone cannot fully explain. The proposed matter does not emit, absorb, or reflect enough light to be detected directly, and its particle composition remains unknown.\n\nDark energy addresses a separate observation. Measurements of distant supernovae and other evidence indicate that cosmic expansion has accelerated. “Dark energy” names the leading component used to explain that acceleration, but scientists do not yet know its physical nature. Alternatives can involve changing how gravity is described on cosmic scales.\n\nDark matter helps explain how structures are held together and grow, whereas dark energy is associated with large-scale expansion. Neither term means ordinary darkness, and neither identifies a confirmed substance. Together they show that a successful model can predict observations while leaving fundamental questions about its components open.",
  questions: [
    { prompt: "About how much ordinary matter appears in the standard cosmological model?", options: ["About five percent", "About twenty-seven percent", "About sixty-eight percent", "About ninety-five percent"] },
    { prompt: "Why do scientists infer dark matter?", options: ["It produces visible rainbows.", "Observed gravitational behavior cannot be explained by visible matter alone.", "It has been collected in a laboratory container.", "It causes every star to accelerate away from Earth."] },
    { prompt: "Why is dark matter called dark?", options: ["It exists only at night.", "It is ordinary black dust.", "It does not emit, absorb, or reflect enough light for direct detection.", "It blocks all light from galaxies."] },
    { prompt: "What observation is dark energy used to address?", options: ["The color of nearby planets", "The temperature of stars", "The rotation of Earth", "The accelerated expansion of the universe"] },
    { prompt: "How does the passage distinguish the two concepts?", options: ["Dark matter helps explain gravitational structure, while dark energy addresses expansion; both remain physically uncertain.", "They are two confirmed forms of the same particle.", "Dark energy holds galaxies together and dark matter causes all expansion.", "Both are types of ordinary visible matter."] },
  ],
  supplementary: { prompt: "Select the TWO statements supported by the passage.", options: ["The 5/27/68 proportions are model-based estimates that measurements may refine.", "Dark matter has a confirmed particle composition.", "Dark energy is a name for the leading component used to explain accelerated expansion.", "The word dark means both components are ordinary black substances."] },
});

export const TOEFL_READING_SETS_16_TO_20 = [
  TOEFL_READING_SET16_V2,
  TOEFL_READING_SET17_V2,
  TOEFL_READING_SET18_V2,
  TOEFL_READING_SET19_V2,
  TOEFL_READING_SET20_V2,
];
