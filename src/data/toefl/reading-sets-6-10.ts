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

const CONTENT_VERSION = '2026-08-14.w5';
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

export const TOEFL_READING_SET6_V2 = createSet(6, {
  slug: 'origins-of-writing', title: 'The Origins of Writing',
  text: `Writing developed gradually in ancient Mesopotamia as growing cities needed dependable records. Around the late fourth millennium BCE, administrators at places such as Uruk used clay tablets to track grain, animals, labor, and other goods. The earliest signs were therefore closely tied to accounting rather than literature.

Early signs often resembled the objects they represented. Scribes later pressed a cut reed into wet clay, producing faster wedge-shaped marks. As the signs became standardized and abstract, they were less recognizable as pictures.

A major development was the rebus principle: a sign could represent the sound of a word rather than only the pictured object. Like using a picture of an eye for the English word “I,” this approach helped writing express names, actions, and abstract ideas.

Independent inventions are generally recognized in Mesopotamia, China, and Mesoamerica, while scholars debate influences on some early systems. Repeated invention suggests that large settled societies faced similar needs for administration and communication. Once established, writing expanded beyond accounts. It preserved laws, stories, rituals, and observations, allowing information to travel across distances and generations without depending on one human memory.`,
  questions: [
    { prompt: 'What was an early use of writing in Mesopotamia?', options: ['Tracking goods and administrative accounts', 'Writing novels for entertainment', 'Sending private letters across oceans', 'Recording only military victories'] },
    { prompt: 'Why did later cuneiform signs look less like pictures?', options: ['Scribes wanted to hide their meaning.', 'They were standardized as faster wedge-shaped marks.', 'Clay erased every curved line.', 'Different cities prohibited pictures.'] },
    { prompt: 'What is the rebus principle?', options: ['Translating a text into another language', 'Using a sign for the sound of a word, not only the pictured object', 'Pressing clay into a wooden mold', 'Drawing only objects that can be touched'] },
    { prompt: 'Why does the passage mention independent inventions of writing?', options: ['To show that every system used identical signs', 'To claim that chronology is fully settled', 'To prove that literature caused urban growth', 'To suggest that different settled societies faced similar needs'] },
    { prompt: 'What did writing make possible after it expanded beyond accounting?', options: ['Preserving and transmitting information across distances and generations', 'Replacing every form of spoken language', 'Ending disagreement about history', 'Removing the need for administration'] },
  ],
  supplementary: { prompt: 'Select the TWO statements supported by the passage.', options: ['The earliest Mesopotamian writing was primarily literary.', 'The rebus principle helped signs express sounds and abstract ideas.', 'Writing developed independently in more than one region.', 'Cuneiform signs always remained recognizable pictures.'] },
});

export const TOEFL_READING_SET7_V2 = createSet(7, {
  slug: 'coral-reefs', title: 'Coral Reefs',
  text: `Coral reefs occupy a small portion of the ocean floor but support an exceptionally diverse community of marine life. Their structure is built by coral polyps, small animals that produce calcium-carbonate skeletons. Many reef-building corals live in partnership with photosynthetic algae commonly called zooxanthellae.

The algae use sunlight to make organic material and transfer much of it to the coral. In return, the coral provides shelter and access to compounds the algae need. The algae also give many corals their color.

This partnership is sensitive to environmental stress. Prolonged high temperatures can cause polyps to expel their algae. The white skeleton then becomes visible through the tissue, a condition called bleaching. A bleached coral is not necessarily dead, but without enough nutrition from its algae it is more vulnerable and may die if stress continues.

Carbon dioxide absorbed by seawater causes ocean acidification, which makes it harder for stony corals to build and maintain skeletons. Pollution and physical damage add further pressure. Researchers have found differences in heat tolerance among corals and their algae, while restoration projects can rebuild colonies locally. These findings offer limited hope, but they do not remove the need to reduce large-scale threats.`,
  questions: [
    { prompt: 'Why are coral reefs notable despite occupying a small area?', options: ['They contain no animal life.', 'They form only in deep water.', 'They are made entirely by algae.', 'They support exceptionally diverse marine communities.'] },
    { prompt: 'What do zooxanthellae provide to reef-building corals?', options: ['Organic material produced through photosynthesis', 'Protection from every predator', 'A supply of calcium-carbonate rocks', 'Cold water from the deep ocean'] },
    { prompt: 'What is coral bleaching?', options: ['The normal growth of a white skeleton', 'The visible whitening that follows the loss of symbiotic algae under stress', 'A disease that always kills coral immediately', 'A method used in reef restoration'] },
    { prompt: 'How does ocean acidification affect stony corals?', options: ['It increases sunlight.', 'It removes all pollution.', 'It makes skeleton building and maintenance harder.', 'It guarantees faster growth.'] },
    { prompt: 'What limited source of hope does the passage identify?', options: ['All reefs have already adapted.', 'Ocean acidification has ended.', 'Restoration removes every large-scale threat.', 'Heat tolerance varies, and restoration can rebuild some colonies locally.'] },
  ],
  supplementary: { prompt: 'Select the TWO statements supported by the passage.', options: ['Bleached coral is always immediately dead.', 'Corals and zooxanthellae have a mutually beneficial relationship.', 'Acidification makes calcium-carbonate skeletons easier to build.', 'Prolonged high temperatures can cause corals to expel their algae.'] },
});

export const TOEFL_READING_SET8_V2 = createSet(8, {
  slug: 'continental-drift', title: 'Continental Drift and Plate Tectonics',
  text: `In 1912, Alfred Wegener argued that the present continents were once joined and later moved apart. He called the former landmass Pangaea and described the process as continental drift.

Wegener assembled several lines of evidence. The outlines of South America and Africa appeared to fit, related fossils occurred on continents now separated by oceans, and matching rocks and mountain belts continued across those oceans. Ancient climate indicators also suggested that continents had occupied different positions.

Many geologists remained unconvinced because Wegener lacked a physically plausible mechanism. He imagined continents moving through oceanic crust but could not show what force would drive them.

Evidence gathered after the Second World War changed the debate. Mapping revealed young ocean crust and long mid-ocean ridges. Scientists also documented magnetic reversals recorded in seafloor rocks and developed the idea of seafloor spreading, in which new crust forms at ridges and moves outward.

Modern plate tectonics does not treat continents as isolated rafts. Continents form parts of rigid plates that move relative to one another, while crust is created and recycled. The theory now connects continental movement with earthquakes, volcanoes, mountain building, and many features of the ocean floor.`,
  questions: [
    { prompt: 'What did Alfred Wegener propose?', options: ['Earthquakes are caused by the Moon.', 'Continents have always remained fixed.', 'Continents were once joined and later moved apart.', 'Ocean basins are continuously shrinking.'] },
    { prompt: 'Which evidence is NOT listed as part of Wegener’s case?', options: ['Written records from ancient sailors', 'Related fossils on separated continents', 'Matching rocks and mountain belts', 'Continental outlines that appeared to fit'] },
    { prompt: 'Why did many geologists remain unconvinced by continental drift?', options: ['Wegener lacked a plausible mechanism for moving continents.', 'Every fossil had been misidentified.', 'The continental outlines did not fit at all.', 'Ancient climates never changed.'] },
    { prompt: 'Which later development helped supply the missing mechanism?', options: ['Discovery of a new continent', 'Evidence for seafloor spreading at mid-ocean ridges', 'Translation of ancient maps', 'Measurements of lunar gravity'] },
    { prompt: 'How do continents move in modern plate tectonics?', options: ['They float freely on ocean water.', 'They are pushed only by surface currents.', 'They form parts of rigid plates that move relative to one another.', 'They remain fixed while oceans move around them.'] },
  ],
  supplementary: { prompt: 'Select the TWO statements supported by the passage.', options: ['Wegener’s proposal was immediately accepted.', 'Related fossils occur on continents now separated by oceans.', 'Plate tectonics connects continental movement with earthquakes and volcanoes.', 'Seafloor spreading was documented before Wegener proposed drift.'] },
});

export const TOEFL_READING_SET9_V2 = createSet(9, {
  slug: 'printing-press', title: 'The Printing Press',
  text: `Before mechanical printing spread in Europe, producing a book required extensive labor. Scribes copied texts by hand, so books were slow and costly to make and individual copies could contain different errors.

In the mid-fifteenth century, Johannes Gutenberg combined several techniques into an effective printing system. Its central feature was movable metal type: individual letters could be arranged for a page, inked, printed repeatedly, and then rearranged. A press applied even pressure, while suitable ink adhered to the metal type. This system made it practical to produce many copies from one setting.

Printing did more than lower production costs. Readers in different places could consult substantially standardized editions, and authors or reformers could circulate arguments much more quickly. During the Protestant Reformation, printing helped the writings of Martin Luther and his supporters reach a broad public and turned religious controversy into a major media event.

Standardized copies also aided scholarship. Researchers could refer to the same passages, compare observations, and identify corrections across editions. Printing did not instantly make every person literate or eliminate errors, but it changed the scale and speed at which texts circulated. The achievement by Gutenberg therefore reshaped how societies store, debate, and verify knowledge.`,
  questions: [
    { prompt: 'Why were books slow and costly to produce before mechanical printing?', options: ['Readers did not want them.', 'Scribes copied texts by hand.', 'Paper did not exist in Europe.', 'Every book required a new alphabet.'] },
    { prompt: 'What was the central feature of Gutenberg’s system?', options: ['A new spoken language', 'A press made only for pictures', 'Movable metal type that could be rearranged', 'A faster form of handwriting'] },
    { prompt: 'How did printing affect the Protestant Reformation?', options: ['It prevented religious debate.', 'It made Luther stop writing.', 'It limited texts to a small private group.', 'It helped reformers reach a broad public quickly.'] },
    { prompt: 'How did substantially standardized editions aid scholarship?', options: ['Researchers could consult the same passages and compare corrections.', 'Every printed copy contained different wording.', 'Researchers no longer needed evidence.', 'Books became impossible to revise.'] },
    { prompt: 'What is the main conclusion of the passage?', options: ['Printing only reduced the price of paper.', 'Printing changed the scale and speed of storing, debating, and checking knowledge.', 'Gutenberg invented literacy.', 'Printing eliminated every textual error.'] },
  ],
  supplementary: { prompt: 'Select the TWO statements supported by the passage.', options: ['Hand copying made books laborious and costly to produce.', 'Printing made each copy intentionally different.', 'Printing supported wider circulation and more standardized editions.', 'Mechanical printing immediately made everyone literate.'] },
});

export const TOEFL_READING_SET10_V2 = createSet(10, {
  slug: 'photosynthesis', title: 'Photosynthesis',
  text: `Photosynthesis converts light energy into chemical energy. Plants, algae, and some bacteria use it to build energy-rich organic compounds, making photosynthetic organisms the producers at the base of most food webs. Other organisms obtain that stored energy by eating producers or organisms that consumed them.

In oxygenic photosynthesis, light helps drive reactions that use water and carbon dioxide to form sugars. Oxygen is released as a by-product. Chlorophyll and related pigments absorb light, while a series of reactions transfers and stores the captured energy.

Photosynthesis also affects the global carbon cycle. Growing vegetation removes carbon dioxide from the air and stores carbon in living tissue and soils. A forest can therefore act as a carbon sink when it absorbs more carbon than it releases, although fires, decay, and land-use change can reverse that balance.

Oxygenic photosynthesis also transformed the atmosphere of Earth. Geological evidence shows a major, persistent rise in atmospheric oxygen about 2.4 billion years ago, known as the Great Oxidation Event. Oxygen-producing microorganisms existed by that time, although researchers continue to debate exactly when the process evolved and why oxygen accumulated when it did. The modern atmosphere and most ecosystems remain deeply dependent on photosynthetic life.`,
  questions: [
    { prompt: 'Why is photosynthesis essential to most food webs?', options: ['It occurs only in deep oceans.', 'It consumes all atmospheric oxygen.', 'It is performed by animals.', 'It stores light energy in compounds made by producers.'] },
    { prompt: 'What does oxygenic photosynthesis form and release?', options: ['It forms sugars and releases oxygen as a by-product.', 'It forms only carbon dioxide.', 'It creates chlorophyll from oxygen.', 'It releases only water.'] },
    { prompt: 'When can a forest act as a carbon sink?', options: ['When it releases more carbon than it absorbs', 'When it absorbs more carbon than it releases', 'Only after every tree dies', 'When photosynthesis stops'] },
    { prompt: 'What was the Great Oxidation Event?', options: ['The disappearance of oxygen from the atmosphere', 'The first use of carbon by forests', 'A major persistent rise in atmospheric oxygen about 2.4 billion years ago', 'The human invention of oxygenic photosynthesis'] },
    { prompt: 'What uncertainty does the passage acknowledge?', options: ['Whether light exists', 'Whether plants contain pigments', 'Whether photosynthesis affects food webs', 'Exactly when oxygenic photosynthesis evolved and why oxygen accumulated when it did'] },
  ],
  supplementary: { prompt: 'Select the TWO statements supported by the passage.', options: ['Photosynthetic organisms form the base of most food webs.', 'Plants absorb oxygen and release carbon dioxide during photosynthesis.', 'Oxygen-producing microorganisms helped transform the atmosphere.', 'A forest always remains a carbon sink under every condition.'] },
});

export const TOEFL_READING_SETS_6_TO_10 = [
  TOEFL_READING_SET6_V2,
  TOEFL_READING_SET7_V2,
  TOEFL_READING_SET8_V2,
  TOEFL_READING_SET9_V2,
  TOEFL_READING_SET10_V2,
];
