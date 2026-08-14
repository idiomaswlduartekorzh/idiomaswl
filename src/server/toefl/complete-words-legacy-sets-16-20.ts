import 'server-only';

// Exact archive of the ten CTW blocks superseded by the canonical Set 16–20
// objects. It stays outside the learner payload and official-family counts.
export const TOEFL_CTW_SETS_16_TO_20_LEGACY_SOURCES = [
  {
    id: 't16-r-cw1',
    template: "Hi Ben,\\n\\nI missed today's {{1}} because I had to take my dog to the {{2}}. Could you tell me what we {{3}} in class? Did the professor set any {{4}} for next week? If you have your {{5}}, would you mind sharing a photo of them? I'd really {{6}} it. Thanks so much!\\n\\nBest,\\nZoe",
    answers: ["seminar", "vet", "covered", "homework", "notes", "appreciate"],
  },
  {
    id: 't16-r-cw2',
    template: "Glaciers are enormous masses of {{1}} that form over many years as snow builds up and is pressed together. They move very {{2}}, often only a few centimeters a day, but over time they can carve deep {{3}} into the land. Glaciers store a large amount of the world's fresh {{4}}. Today, however, many glaciers are {{5}} because of rising temperatures, which causes sea levels to {{6}}.",
    answers: ["ice", "slowly", "valleys", "water", "shrinking", "rise"],
  },
  {
    id: 't17-r-cw1',
    template: "Dear Sir or Madam,\\n\\nI am a university student and I would like to open a {{1}} account with your bank. Could you please tell me what {{2}} I need to bring, such as identification and proof of {{3}}? I am also interested in whether there is a monthly {{4}} for students. Finally, does the account come with a debit {{5}}? I look forward to your {{6}}.\\n\\nYours faithfully,\\nDavid Park",
    answers: ["bank", "documents", "address", "fee", "card", "reply"],
  },
  {
    id: 't17-r-cw2',
    template: "Spiders are often feared, but most are completely {{1}} to humans and are in fact very useful. They help control the number of {{2}} such as flies and mosquitoes. Most spiders build {{3}} from silk they produce in their bodies, using them to catch {{4}}. The silk is remarkably {{5}} — some kinds are stronger than steel of the same thickness. Scientists are studying spider silk in the hope of creating new {{6}} for medicine and industry.",
    answers: ["harmless", "insects", "webs", "prey", "strong", "materials"],
  },
  {
    id: 't18-r-cw1',
    template: "Hi everyone,\\n\\nI'm organizing a small {{1}} for Ana's birthday next Saturday. I've booked a table at the Italian {{2}} on Green Street for eight o'clock. Please let me know if you can {{3}} so I can confirm the numbers. It's meant to be a {{4}}, so don't tell Ana! We're each paying for our own {{5}}, and I'll collect a little extra for a shared {{6}}. Hope to see you all there!\\n\\nMax",
    answers: ["party", "restaurant", "come", "surprise", "meal", "gift"],
  },
  {
    id: 't18-r-cw2',
    template: "The water cycle describes how water moves around our planet. Heat from the sun causes water in oceans and lakes to {{1}}, turning into vapor that rises into the air. As the vapor cools, it {{2}} to form clouds. Eventually the water falls back to Earth as rain or {{3}}. Some of this water soaks into the {{4}}, while some flows into rivers that carry it back to the {{5}}. This continuous cycle provides the fresh water that all living things {{6}} to survive.",
    answers: ["evaporate", "condenses", "snow", "ground", "ocean", "need"],
  },
  {
    id: 't19-r-cw1',
    template: "Dear Education Team,\\n\\nI am a teacher planning a class {{1}} to your museum next month. I would like to bring a {{2}} of thirty students, aged twelve. Could you tell me whether we need to {{3}} in advance and what the {{4}} price is for schools? We would also be interested in a guided {{5}} if one is available. Finally, is there a space where the students can eat their {{6}}?\\n\\nThank you,\\nMs. Flores",
    answers: ["visit", "group", "book", "ticket", "tour", "lunch"],
  },
  {
    id: 't19-r-cw2',
    template: "The human eye is an amazing organ that allows us to {{1}} the world around us. Light enters through the {{2}} at the front of the eye and is focused by the lens onto the {{3}} at the back. There, special cells turn the light into {{4}} that travel along the optic nerve to the {{5}}, which creates the images we see. Many people need glasses because their eyes cannot focus light {{6}}.",
    answers: ["see", "pupil", "retina", "signals", "brain", "correctly"],
  },
  {
    id: 't20-r-cw1',
    template: "Hi,\\n\\nI think I left my {{1}} in the library yesterday afternoon. It's a black backpack with a red {{2}}. Inside there are some books and a blue water {{3}}. I was sitting on the second {{4}}, near the windows, at around three o'clock. Could you please check the lost-and-{{5}}? I would be very {{6}} if you could let me know.\\n\\nThank you,\\nNina",
    answers: ["bag", "zip", "bottle", "floor", "found", "grateful"],
  },
  {
    id: 't20-r-cw2',
    template: "Renewable energy comes from sources that will not run out, such as the sun, wind, and moving {{1}}. Solar panels turn sunlight into {{2}}, while wind {{3}} use moving air to generate power. Unlike coal and oil, these sources produce little or no {{4}}, which makes them much cleaner for the {{5}}. As technology improves and costs fall, more countries are choosing to {{6}} in renewable energy.",
    answers: ["water", "electricity", "turbines", "pollution", "environment", "invest"],
  },
] as const;
