import 'server-only';

// Editorial archive for the Academic Passage blocks superseded in W5. Keeping
// the exact passages and their answer identities server-side makes the change
// reversible without returning keys or outdated claims to the learner bundle.
export const TOEFL_READING_SETS_6_TO_10_LEGACY_SOURCES = [
  {
    id: 'source:t6-r-ap-origins-writing-v1',
    passage: `The invention of writing ranks among the most transformative developments in human history, yet it was not invented for literature, philosophy, or record-keeping of grand events. The earliest known writing system, cuneiform, emerged in ancient Mesopotamia around 3200 BCE, and its first use was strikingly practical: accounting. Temple administrators needed a reliable way to track goods—quantities of grain, livestock, and textiles—as economies grew too complex to manage by memory alone.

Cuneiform began not as abstract symbols but as pictures. A simple drawing of an ox head stood for an ox; a stylized ear of barley meant grain. Over centuries, these pictures were simplified into wedge-shaped marks pressed into wet clay with a reed stylus—the word "cuneiform" itself derives from the Latin for "wedge." This simplification made writing faster to produce, though it also made the symbols less recognizable as pictures of the things they represented.

A crucial breakthrough came when scribes began using signs to represent sounds rather than objects. This is known as the rebus principle: a sign for a word could stand for any word that sounded the same, much as a picture of an eye might represent the word "I" in English. This shift freed writing from the limitation of depicting only concrete objects and allowed it to record abstract ideas, names, and grammatical relationships—everything spoken language could express.

Writing systems arose independently in at least three other places: Egypt, China, and Mesoamerica. The fact that this invention occurred more than once suggests it was not a fluke but a response to shared pressures—particularly the administrative demands of large, settled societies. Once established, writing became far more than an accounting tool. It preserved laws, epics, and scientific observations across generations, enabling the accumulation of knowledge that no single human memory could hold.`,
    items: [{ id: 't6-r-ap1', answer: 0 }, { id: 't6-r-ap2', answer: 1 }, { id: 't6-r-ap3', answer: 1 }, { id: 't6-r-ap4', answer: 3 }, { id: 't6-r-ap5', answer: 0 }, { id: 't6-r-ap6', answers: ['B', 'C'] }],
  },
  {
    id: 'source:t7-r-ap-coral-reefs-v1',
    passage: `Coral reefs are often called the "rainforests of the sea," and the comparison is apt. Though they cover less than one percent of the ocean floor, they support roughly a quarter of all marine species. This extraordinary biodiversity rests on an unlikely foundation: a partnership between tiny animals called coral polyps and even tinier algae that live inside their tissues.

The algae, known as zooxanthellae, carry out photosynthesis, converting sunlight into energy. They share this energy with the coral, which in return provides the algae with shelter and the compounds they need. This mutually beneficial relationship, called symbiosis, is what allows corals to build the massive calcium-carbonate structures we recognize as reefs. It also explains the corals' brilliant colors, which come largely from the algae.

But this partnership is fragile. When water temperatures rise even slightly above normal for a sustained period, the coral expels its algae in a stress response. Without the algae, the coral loses both its color and its main energy source—a phenomenon known as coral bleaching. A bleached coral is not dead, but it is starving, and if normal conditions do not return quickly, it will die.

The threat is not only heat. Ocean acidification, caused by seawater absorbing carbon dioxide from the atmosphere, makes it harder for corals to build their skeletons. Combined with pollution and overfishing, these pressures have led scientists to warn that many of the world's reefs could disappear within decades. Yet there is cause for cautious hope: some coral populations show signs of adapting to warmer water, and restoration projects have successfully regrown damaged reefs in several regions.`,
    items: [{ id: 't7-r-ap1', answer: 3 }, { id: 't7-r-ap2', answer: 0 }, { id: 't7-r-ap3', answer: 1 }, { id: 't7-r-ap4', answer: 2 }, { id: 't7-r-ap5', answer: 3 }, { id: 't7-r-ap6', answers: ['B', 'D'] }],
  },
  {
    id: 'source:t8-r-ap-continental-drift-v1',
    passage: `For centuries, people believed that the continents had always sat exactly where they are today. In the early twentieth century, a German scientist named Alfred Wegener proposed a radical alternative: that the continents had once been joined in a single landmass, which he called Pangaea, and had slowly drifted apart over millions of years. His idea, known as continental drift, was initially met with ridicule.

Wegener assembled an impressive collection of evidence. He noticed that the coastlines of South America and Africa seemed to fit together like puzzle pieces. He pointed to matching rock formations and mountain ranges on continents now separated by oceans. Most strikingly, he found identical fossils of plants and animals on continents thousands of kilometers apart—organisms that could not possibly have swum across an ocean.

Despite this evidence, most geologists rejected Wegener's theory for one simple reason: he could not explain what force could possibly move entire continents. Without a mechanism, the idea seemed like a fantasy, however neatly the puzzle pieces fit.

The answer arrived decades later, after Wegener's death, when scientists mapped the ocean floor. They discovered vast underwater mountain ranges where molten rock rises from within the Earth, cools, and pushes the seafloor outward on either side. This process, called seafloor spreading, provided the missing mechanism. The continents do not plow through the ocean, as Wegener had imagined; rather, they ride atop enormous rigid plates that move as the seafloor spreads. This unified theory, known as plate tectonics, now underlies virtually all of modern geology and explains earthquakes, volcanoes, and the shape of the world itself.`,
    items: [{ id: 't8-r-ap1', answer: 2 }, { id: 't8-r-ap2', answer: 0 }, { id: 't8-r-ap3', answer: 0 }, { id: 't8-r-ap4', answer: 1 }, { id: 't8-r-ap5', answer: 2 }, { id: 't8-r-ap6', answers: ['B', 'C'] }],
  },
  {
    id: 'source:t9-r-ap-printing-press-v1',
    passage: `The printing press, developed by Johannes Gutenberg in the mid-fifteenth century, is often described as one of the most important inventions in human history. But to understand why, we must look beyond the machine itself to the transformation it unleashed. Before Gutenberg, books in Europe were copied by hand, usually by monks, a process so slow and costly that a single book could take months to produce and cost as much as a small house. As a result, books were rare, and literacy was largely confined to the clergy and the wealthy.

Gutenberg's key innovation was movable type: individual metal letters that could be arranged to form a page, used to print hundreds of copies, and then rearranged for the next page. Combined with an oil-based ink and a press adapted from those used to make wine, this system made it possible to produce books quickly and in large numbers. The cost of a book fell dramatically.

The consequences rippled far beyond publishing. As books became affordable, literacy spread. Ideas that once circulated slowly among a small elite could now reach thousands of readers within months. This had profound political and religious effects: the Protestant Reformation, for instance, spread with unprecedented speed because reformers could print and distribute pamphlets faster than authorities could suppress them.

The press also transformed the nature of knowledge itself. When every copy of a book was made by hand, errors crept in with each copying, and no two copies were quite alike. Printing produced identical copies, allowing scholars in different cities to refer to exactly the same text, page by page. This standardization laid the groundwork for the scientific revolution, in which the precise sharing and checking of results became essential. In this sense, Gutenberg did not merely make books cheaper—he changed how humanity accumulates and verifies knowledge.`,
    items: [{ id: 't9-r-ap1', answer: 1 }, { id: 't9-r-ap2', answer: 2 }, { id: 't9-r-ap3', answer: 3 }, { id: 't9-r-ap4', answer: 0 }, { id: 't9-r-ap5', answer: 1 }, { id: 't9-r-ap6', answers: ['A', 'C'] }],
  },
  {
    id: 'source:t10-r-ap-photosynthesis-v1',
    passage: `Photosynthesis is the process by which plants, algae, and certain bacteria convert light energy into chemical energy, and it is arguably the most important chemical reaction on Earth. Nearly all life depends on it, either directly or indirectly, because it is the ultimate source of the food we eat and the oxygen we breathe.

In simple terms, photosynthesis takes carbon dioxide from the air and water from the soil and, using energy captured from sunlight, transforms them into glucose—a sugar the plant uses for energy and growth—while releasing oxygen as a by-product. The green pigment that captures light, chlorophyll, is what gives most plants their color and is essential to the process.

What makes photosynthesis so significant is its role in two global cycles. First, it is the foundation of nearly every food chain. Plants, as producers, convert sunlight into energy that herbivores consume, and that energy passes up the chain to predators. Without photosynthesis, these food chains would collapse. Second, photosynthesis is central to the carbon cycle. By absorbing carbon dioxide, plants help regulate the amount of this heat-trapping gas in the atmosphere. This is one reason forests are so important in discussions of climate change: they act as carbon "sinks," storing carbon that would otherwise contribute to warming.

Interestingly, the oxygen-rich atmosphere we depend on is itself a product of photosynthesis. Billions of years ago, the Earth's atmosphere contained almost no free oxygen. It was early photosynthetic bacteria that gradually filled the air with oxygen, an event so transformative that scientists call it the Great Oxidation. In a very real sense, the air we breathe was manufactured by living organisms over an immense span of time—and continues to be renewed by them today.`,
    items: [{ id: 't10-r-ap1', answer: 3 }, { id: 't10-r-ap2', answer: 0 }, { id: 't10-r-ap3', answer: 1 }, { id: 't10-r-ap4', answer: 2 }, { id: 't10-r-ap5', answer: 3 }, { id: 't10-r-ap6', answers: ['A', 'C'] }],
  },
] as const;
