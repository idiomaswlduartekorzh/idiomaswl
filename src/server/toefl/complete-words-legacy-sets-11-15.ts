import 'server-only';

// Exact archive of the ten CTW blocks superseded by the canonical Set 11–15
// objects. It stays outside the learner payload and official-family counts.
export const TOEFL_CTW_SETS_11_TO_15_LEGACY_SOURCES = [
  {
    id: 't11-r-cw1',
    template: "Hi Daniel,\\n\\nI saw the poster for the photography {{1}} and I would love to {{2}}. I am a complete {{3}}, though — I have never used a professional camera. Is that okay, or do I need {{4}}? Also, could you tell me how much the {{5}} fee is and whether equipment is {{6}}? Thanks a lot.\\n\\nBest,\\nPriya",
    answers: ['club', 'join', 'beginner', 'experience', 'membership', 'provided'],
  },
  {
    id: 't11-r-cw2',
    template: "Deserts are regions that receive very little {{1}}, usually less than 250 millimeters a year. Despite the harsh conditions, many plants and animals have {{2}} to survive there. Cacti, for example, store water in their thick {{3}}, while some animals stay underground during the day to avoid the {{4}}. Deserts are not always hot; some, like those near the poles, are extremely {{5}}. Scientists worry that human activity is causing some fertile land to turn into desert, a process called {{6}}.",
    answers: ['rainfall', 'adapted', 'stems', 'heat', 'cold', 'desertification'],
  },
  {
    id: 't12-r-cw1',
    template: "Dear Aunt Rosa,\\n\\nThank you so much for the {{1}} you sent for my birthday. It was so {{2}} of you to remember. I have already used the money to buy a new {{3}} for my studies. I am doing well at university, though the courses keep me very {{4}}. I hope to {{5}} you during the summer holidays. Please give my {{6}} to Uncle Pedro.\\n\\nWith love,\\nCarla",
    answers: ['gift', 'kind', 'laptop', 'busy', 'visit', 'regards'],
  },
  {
    id: 't12-r-cw2',
    template: "The Moon is the Earth's only natural {{1}}. It has no atmosphere and no liquid water on its {{2}}, which is covered in craters formed by ancient {{3}}. The Moon's gravity is much weaker than the Earth's, which is why astronauts can {{4}} so high. The pull of the Moon's gravity also causes the ocean {{5}} on Earth. Scientists believe the Moon {{6}} billions of years ago when a huge object struck the young Earth.",
    answers: ['satellite', 'surface', 'impacts', 'jump', 'tides', 'formed'],
  },
  {
    id: 't13-r-cw1',
    template: "We stayed at the Bay Hotel for three nights and had a wonderful {{1}}. The room was clean and the staff were extremely {{2}}, always ready to help. Breakfast was {{3}} in the price and offered plenty of choice. The location was {{4}}, just a short walk from the beach. The only small {{5}} was that the Wi-Fi was slow. Overall, I would happily {{6}} this hotel to friends.",
    answers: ['stay', 'helpful', 'included', 'convenient', 'downside', 'recommend'],
  },
  {
    id: 't13-r-cw2',
    template: "Rainforests are among the most {{1}} ecosystems on Earth, home to more than half of all plant and animal {{2}}. The tall trees form a thick {{3}} that blocks most sunlight from reaching the ground. Rainforests also play a key role in the {{4}} cycle, releasing huge amounts of water vapor into the air. Unfortunately, large areas are cut down every year, a process called {{5}}, which threatens countless species and contributes to climate {{6}}.",
    answers: ['diverse', 'species', 'canopy', 'water', 'deforestation', 'change'],
  },
  {
    id: 't14-r-cw1',
    template: "Dear Mr. Owens,\\n\\nI am writing about the {{1}} I signed for the apartment on Elm Street. I would like to {{2}} it for another year, as I am very happy living here. Before I do, could you please confirm whether the monthly {{3}} will stay the same? I would also like to {{4}} a small problem: the kitchen window does not close {{5}}. I would be grateful if this could be {{6}} soon.\\n\\nKind regards,\\nOmar",
    answers: ['lease', 'renew', 'rent', 'mention', 'properly', 'repaired'],
  },
  {
    id: 't14-r-cw2',
    template: "Some islands are formed by {{1}} activity beneath the ocean. Over thousands of years, layers of {{2}} rock build up until they rise above the water's {{3}}. At first, these islands are bare rock, but over time, seeds carried by wind, waves, and {{4}} allow plants to grow. Animals eventually arrive too, creating new {{5}}. Because they are so isolated, such islands often develop {{6}} species found nowhere else on Earth.",
    answers: ['volcanic', 'cooled', 'surface', 'birds', 'ecosystems', 'unique'],
  },
  {
    id: 't15-r-cw1',
    template: "Hi Professor Ahmed,\\n\\nI hope you are well. I am writing to ask if I could {{1}} a meeting with you this week to discuss my final {{2}}. I have chosen a topic but I am not sure it is {{3}} enough. I am {{4}} on Tuesday and Thursday afternoons. Please let me know a time that {{5}} you. I really {{6}} your guidance.\\n\\nBest wishes,\\nLina",
    answers: ['arrange', 'project', 'focused', 'available', 'suits', 'appreciate'],
  },
  {
    id: 't15-r-cw2',
    template: "Electric cars are becoming more {{1}} as people look for cleaner ways to travel. Unlike traditional cars, they produce no exhaust {{2}}, which helps reduce air pollution in cities. Instead of petrol, they run on {{3}} stored in large batteries. One challenge is that drivers need places to {{4}} their cars, so governments are building more charging {{5}}. As battery technology improves, electric cars can travel greater {{6}} on a single charge.",
    answers: ['popular', 'fumes', 'electricity', 'charge', 'stations', 'distances'],
  },
] as const;
