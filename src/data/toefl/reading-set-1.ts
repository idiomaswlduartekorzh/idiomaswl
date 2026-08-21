export type ToeflReadingSet1Scope = 'daily-life' | 'academic';
export type ToeflReadingSet1Alignment = 'official-family-pilot' | 'welearn-supplementary';

export interface ToeflReadingOption {
  id: string;
  label: string;
  text: string;
}

export interface ToeflReadingSingleItem {
  type: 'single-select';
  id: string;
  legacyId: string;
  contentVersion: string;
  prompt: string;
  options: ToeflReadingOption[];
  alignment: 'official-family-pilot';
}

export interface ToeflReadingMultiItem {
  type: 'multi-select';
  id: string;
  legacyId: string;
  contentVersion: string;
  prompt: string;
  options: ToeflReadingOption[];
  selectCount: number;
  alignment: 'welearn-supplementary';
}

export type ToeflReadingSet1Item = ToeflReadingSingleItem | ToeflReadingMultiItem;

export interface ToeflReadingSet1Block {
  id: string;
  scope: ToeflReadingSet1Scope;
  title: string;
  genre: string;
  instructions: string;
  text: string;
  items: ToeflReadingSet1Item[];
}

function option(itemId: string, label: string, text: string): ToeflReadingOption {
  return { id: `${itemId}:option-${label.toLowerCase()}`, label, text };
}

const BOOKSHOP_ID = 'item:t1-r-dl-bookshop';
const DELIVERY_ID = 'item:t1-r-dl-delivery';
const ACADEMIC_ID = 'item:t1-r-ap-green-sahara-v2';

export const TOEFL_READING_SET1: {
  id: string;
  objectId: string;
  contentVersion: string;
  scoringVersion: string;
  officialRegistryVersion: string;
  disclosure: string;
  blocks: ToeflReadingSet1Block[];
} = {
  id: 'toefl-reading-set1-v2',
  objectId: 'object:toefl-reading-set1-v2',
  contentVersion: '2026-08-14.v1',
  scoringVersion: 'toefl-reading-local-exact-set@2026-08-14.v1',
  officialRegistryVersion: 'toefl-ibt-2026@2026-08-14.t13',
  disclosure:
    'Práctica fija WeLearn. Reproduce familias de lectura y corrección local; no es adaptativa ni genera una puntuación oficial de ETS.',
  blocks: [
    {
      id: BOOKSHOP_ID,
      scope: 'daily-life',
      title: 'Bookshop notice',
      genre: 'notice',
      instructions: 'Read the notice and choose one answer for each question.',
      text: `CORNER BOOKSHOP — SUMMER SALE

• All fiction: buy two, get one free (cheapest book free).
• Children's books: 25% off.
• Members receive an extra 10% off all purchases.
• The sale runs from July 1 to July 31.
• Special orders and gift cards are not included in the sale.

Not a member yet? Ask at the counter — joining is free and takes a minute.`,
      items: [
        {
          type: 'single-select', id: 'item:t1-r-dl1', legacyId: 't1-r-dl1', contentVersion: '2026-08-14.v2',
          prompt: 'What is the offer on fiction?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-dl1', 'A', 'Every fiction book is discounted by 25%.'),
            option('item:t1-r-dl1', 'B', 'The cheapest of three fiction books is free.'),
            option('item:t1-r-dl1', 'C', 'Members receive one free fiction book each month.'),
            option('item:t1-r-dl1', 'D', 'All fiction costs half its usual price in July.'),
          ],
        },
        {
          type: 'single-select', id: 'item:t1-r-dl2', legacyId: 't1-r-dl2', contentVersion: '2026-08-14.v2',
          prompt: 'What extra benefit do members receive?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-dl2', 'A', 'They can place special orders without paying.'),
            option('item:t1-r-dl2', 'B', 'They receive free delivery throughout the sale.'),
            option('item:t1-r-dl2', 'C', 'They can buy gift cards at a lower price.'),
            option('item:t1-r-dl2', 'D', 'They receive an additional 10% discount.'),
          ],
        },
        {
          type: 'single-select', id: 'item:t1-r-dl3', legacyId: 't1-r-dl3', contentVersion: '2026-08-14.v2',
          prompt: 'Which purchases are excluded from the sale?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-dl3', 'A', 'Fiction books and monthly member purchases'),
            option('item:t1-r-dl3', 'B', "Children's books and the cheapest fiction book"),
            option('item:t1-r-dl3', 'C', 'Special orders and gift cards'),
            option('item:t1-r-dl3', 'D', 'Books purchased during the final week of July'),
          ],
        },
      ],
    },
    {
      id: DELIVERY_ID,
      scope: 'daily-life',
      title: 'Delivery messages',
      genre: 'message chain',
      instructions: 'Read the messages and choose one answer for each question.',
      text: `DELIVERY APP: Your parcel will arrive today between 3 and 5 p.m. A signature is required.

YOU: I won't be home until 6. Can it be left with a neighbor?

DELIVERY APP: Yes. Reply with the house number of a neighbor who can accept it, or choose "deliver tomorrow" in the app.

YOU: Please leave it at number 14. Thank you.

DELIVERY APP: Confirmed. Your parcel will be delivered to number 14 and a photo will be sent as proof.`,
      items: [
        {
          type: 'single-select', id: 'item:t1-r-dl4', legacyId: 't1-r-dl4', contentVersion: '2026-08-14.v2',
          prompt: 'Why can the customer not accept the parcel?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-dl4', 'A', 'The customer will not be home before 6 p.m.'),
            option('item:t1-r-dl4', 'B', 'The customer no longer lives at that address.'),
            option('item:t1-r-dl4', 'C', 'The delivery requires a payment in person.'),
            option('item:t1-r-dl4', 'D', 'The parcel is arriving on the following day.'),
          ],
        },
        {
          type: 'single-select', id: 'item:t1-r-dl5', legacyId: 't1-r-dl5', contentVersion: '2026-08-14.v2',
          prompt: 'What will the app provide after delivery?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-dl5', 'A', 'A refund for changing the delivery address'),
            option('item:t1-r-dl5', 'B', 'A photograph confirming the delivery'),
            option('item:t1-r-dl5', 'C', 'A new delivery window for the next day'),
            option('item:t1-r-dl5', 'D', 'A message from the customer at number 14'),
          ],
        },
      ],
    },
    {
      id: ACADEMIC_ID,
      scope: 'academic',
      title: 'The Green Sahara',
      genre: 'short expository passage',
      instructions: 'Read the passage and choose one answer for questions 1–5.',
      text: `The Sahara is often imagined as a timeless sea of sand, but geological and archaeological evidence shows that it has repeatedly shifted between dry desert and greener landscapes. Scientists call the wetter phases African Humid Periods.

During these periods, lakes, rivers, and grasslands spread across parts of North Africa. Rock art shows people herding cattle and animals such as giraffes and hippos. Fish and crocodile remains found beneath today's desert also point to a much wetter environment.

These changes are linked to slow variations in Earth's orbit and axial tilt. Over tens of thousands of years, those variations alter the strength of summer sunlight in the Northern Hemisphere. Stronger summer heating can intensify the African monsoon and carry more rain northward; when the pattern shifts, rainfall retreats. The most recent humid period ended roughly five thousand years ago.

The change also affected people. As lakes and grasslands disappeared, some communities moved toward areas with more dependable water, including the Nile Valley. Researchers continue to debate exactly how climate influenced later societies, but the Sahara's history demonstrates that landscapes that appear permanent can change substantially over long timescales.`,
      items: [
        {
          type: 'single-select', id: 'item:t1-r-ap1-v2', legacyId: 't1-r-ap1', contentVersion: '2026-08-14.v2',
          prompt: 'What is the main idea of the passage?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-ap1-v2', 'A', 'The Sahara became dry only because people moved toward the Nile Valley.'),
            option('item:t1-r-ap1-v2', 'B', 'Archaeologists disagree about whether the Sahara ever contained rivers.'),
            option('item:t1-r-ap1-v2', 'C', 'The Sahara has alternated between wetter and drier conditions over long periods.'),
            option('item:t1-r-ap1-v2', 'D', 'The African monsoon has remained unchanged for thousands of years.'),
          ],
        },
        {
          type: 'single-select', id: 'item:t1-r-ap2-v2', legacyId: 't1-r-ap2', contentVersion: '2026-08-14.v2',
          prompt: 'Which evidence supports the existence of a wetter Sahara?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-ap2-v2', 'A', 'Rock art and remains of animals associated with water'),
            option('item:t1-r-ap2-v2', 'B', 'Modern photographs of permanent rivers across the desert'),
            option('item:t1-r-ap2-v2', 'C', 'Written weather reports from the earliest human communities'),
            option('item:t1-r-ap2-v2', 'D', 'Measurements showing that axial tilt no longer changes'),
          ],
        },
        {
          type: 'single-select', id: 'item:t1-r-ap3-v2', legacyId: 't1-r-ap3', contentVersion: '2026-08-14.v2',
          prompt: 'The word "intensify" in paragraph 3 is closest in meaning to', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-ap3-v2', 'A', 'measure precisely'),
            option('item:t1-r-ap3-v2', 'B', 'move southward'),
            option('item:t1-r-ap3-v2', 'C', 'end suddenly'),
            option('item:t1-r-ap3-v2', 'D', 'become stronger'),
          ],
        },
        {
          type: 'single-select', id: 'item:t1-r-ap4-v2', legacyId: 't1-r-ap4', contentVersion: '2026-08-14.v2',
          prompt: 'What can be inferred when the monsoon carries less rain northward?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-ap4-v2', 'A', 'Summer sunlight immediately stops reaching North Africa.'),
            option('item:t1-r-ap4-v2', 'B', 'Parts of the Sahara are likely to become drier.'),
            option('item:t1-r-ap4-v2', 'C', 'Crocodiles and fish become more common in the desert.'),
            option('item:t1-r-ap4-v2', 'D', 'All communities move to the Nile Valley at the same time.'),
          ],
        },
        {
          type: 'single-select', id: 'item:t1-r-ap5-v2', legacyId: 't1-r-ap5', contentVersion: '2026-08-14.v2',
          prompt: 'Why does the author discuss human movement in the final paragraph?', alignment: 'official-family-pilot',
          options: [
            option('item:t1-r-ap5-v2', 'A', 'To prove that climate was the only cause of every later society'),
            option('item:t1-r-ap5-v2', 'B', 'To argue that the Nile Valley was always too dry for settlement'),
            option('item:t1-r-ap5-v2', 'C', 'To connect environmental change with possible changes in where people lived'),
            option('item:t1-r-ap5-v2', 'D', 'To explain why archaeological evidence from the Sahara is unreliable'),
          ],
        },
        {
          type: 'multi-select', id: 'item:t1-r-ap6-supplementary', legacyId: 't1-r-ap6', contentVersion: '2026-08-14.v2',
          prompt: 'Select the TWO statements supported by the passage.', selectCount: 2,
          alignment: 'welearn-supplementary',
          options: [
            option('item:t1-r-ap6-supplementary', 'A', 'Parts of the Sahara contained lakes and grasslands during wetter periods.'),
            option('item:t1-r-ap6-supplementary', 'B', 'The most recent humid period ended less than one hundred years ago.'),
            option('item:t1-r-ap6-supplementary', 'C', 'Orbital variations can influence how far monsoon rain travels northward.'),
            option('item:t1-r-ap6-supplementary', 'D', 'Every community in North Africa moved permanently to the Nile Valley.'),
          ],
        },
      ],
    },
  ],
};

export const TOEFL_READING_SET1_ITEMS = TOEFL_READING_SET1.blocks.flatMap((block) => block.items);

export function getToeflReadingSet1Items(scope?: ToeflReadingSet1Scope) {
  return TOEFL_READING_SET1.blocks
    .filter((block) => !scope || block.scope === scope)
    .flatMap((block) => block.items);
}
