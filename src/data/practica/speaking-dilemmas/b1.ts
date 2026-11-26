import type { SpeakingDilemma } from './types'

const CONNECTORS: SpeakingDilemma['vocabulary']['connectors'] = [
  ['although', 'introduces a fact that makes the main point less simple', 'Although the trip is long, it is affordable.'],
  ['for instance', 'introduces a specific example', 'For instance, we could try it on Friday.'],
  ['as a result', 'introduces an effect or consequence', 'The bus came late. As a result, we missed the start.'],
  ['on the other hand', 'introduces a different side of an issue', 'On the other hand, the later train is cheaper.'],
]

export const B1_DILEMMAS: readonly SpeakingDilemma[] = [
  {
    slug: 'central-or-quiet-flat',
    title: 'Rent near work or on a quiet street?',
    prompt: 'Two flats cost about the same. One is close to work but on a busy street. The other is quiet but adds forty minutes to your day. Where would you live?',
    options: [
      { label: 'Near work', description: 'Walk to work in ten minutes and accept more street noise.' },
      { label: 'A quiet street', description: 'Enjoy a quieter flat and take two buses to work.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['commute', 'a regular trip to and from work', 'My commute takes forty minutes.'],
        ['neighbourhood', 'the area around where you live', 'The neighbourhood has several shops.'],
        ['rent', 'money paid to use a flat or house', 'The rent includes water.'],
        ['noise', 'unwanted or unpleasant sound', 'Street noise woke me up.'],
      ],
      phrasalVerbs: [
        ['put up with', 'accept something unpleasant', 'I can put up with some noise.'],
        ['get to', 'reach a place', 'I get to work before nine.'],
        ['settle in', 'start to feel at home', 'We settled in quickly.'],
        ['move out', 'leave a place where you live', 'They moved out in April.'],
      ],
      adjectives: [
        ['central', 'near the centre of a town', 'It is a central flat.'],
        ['peaceful', 'calm and quiet', 'The street feels peaceful at night.'],
        ['tiring', 'making you feel tired', 'A long trip every day is tiring.'],
        ['affordable', 'possible to pay for', 'The rent is affordable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d pick the **central** flat. **Although** there’s more **noise**, a short **commute** gives me time to cook or meet people after work.',
        'I can **put up with** traffic during the day if the bedroom is quiet at night.',
        'I’d visit after nine to see whether that is realistic.',
      ],
      b: [
        'I’d rent on the **peaceful** street. My home is where I rest, and constant **noise** would make it hard to **settle in**.',
        '**On the other hand**, forty minutes every day can be **tiring**.',
        'I’d test the bus at my usual travel time before signing anything.',
      ],
      conditional: [
        'I’d choose the **central** flat if I can **put up with** the **noise** at night. **For instance**, a bedroom at the back could make a difference.',
        'If it is loud in the bedroom too, I’d accept a longer **commute**.',
        'I’d choose a **peaceful** home if I work from home several days.',
      ],
    },
  },
  {
    slug: 'bus-pass-or-bike-at-work',
    title: 'Buy a bus pass or cycle to work?',
    prompt: 'Your workplace is five kilometres away. Do you buy a monthly bus pass or cycle most days?',
    options: [
      { label: 'A bus pass', description: 'Use the bus in any weather and pay one fixed price.' },
      { label: 'Cycling', description: 'Use your own bike and choose a route with less traffic.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['bus pass', 'a ticket allowing repeated trips for a period', 'My bus pass lasts a month.'],
        ['cycle lane', 'part of a road for people on bikes', 'There is a cycle lane along the river.'],
        ['traffic', 'vehicles moving along a road', 'There is heavy traffic at eight.'],
        ['maintenance', 'work that keeps something in good condition', 'The bike needs regular maintenance.'],
      ],
      phrasalVerbs: [
        ['get around', 'travel from place to place', 'It is easy to get around by bus.'],
        ['set off', 'leave at the start of a journey', 'I set off before the rush hour.'],
        ['lock up', 'secure something with a lock', 'I lock up my bike behind work.'],
        ['fall back on', 'use another option when the first fails', 'I fall back on the bus when it rains.'],
      ],
      adjectives: [
        ['reliable', 'working well when needed', 'The bus is usually reliable.'],
        ['fit', 'healthy and able to exercise', 'Cycling helps me stay fit.'],
        ['exposed', 'without much protection around it', 'The road is exposed to strong winds.'],
        ['predictable', 'easy to expect or plan for', 'The monthly cost is predictable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d buy a **bus pass** if I had to arrive at the same time every day. **For instance**, the bus stop is right outside my building.',
        'The service is **reliable** on my route, and I can **get around** without dealing with bike **maintenance**.',
        'On dry days I could still cycle, but I like having a **predictable** monthly cost.',
      ],
      b: [
        'I’d cycle to stay **fit** and avoid sitting in **traffic**. There’s a **cycle lane** most of the way, so I can **set off** at a time that suits me.',
        '**Although** I’d need a place to **lock up** the bike, that seems manageable.',
        'I’d try the route on a quiet weekend first.',
      ],
      conditional: [
        'I’d choose cycling if there’s a safe **cycle lane** and somewhere to **lock up** at work.',
        '**On the other hand**, if the route is **exposed** or I need to carry equipment, I’d get a **bus pass**.',
        'I could cycle most days and **fall back on** the bus when I need it.',
      ],
    },
  },
  {
    slug: 'fixed-or-open-trip',
    title: 'Plan a weekend in detail or decide as you go?',
    prompt: 'Three friends have a weekend in a new city. Should they book most activities in advance or leave most of the time open?',
    options: [
      { label: 'Plan ahead', description: 'Book two main activities and agree on meeting times.' },
      { label: 'Decide as you go', description: 'Keep the weekend open and choose activities after you arrive.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['itinerary', 'a plan of the places and times for a trip', 'Our itinerary includes two museums.'],
        ['booking', 'an arrangement to keep a place for you', 'We made a booking for Saturday.'],
        ['delay', 'a situation where you have to wait longer', 'There was a delay at the station.'],
        ['priority', 'something more important than other things', 'Lunch together is our priority.'],
      ],
      phrasalVerbs: [
        ['pencil in', 'make a plan that can still change', 'We pencilled in a visit on Sunday.'],
        ['fill up', 'become full', 'The tour fills up fast.'],
        ['miss out on', 'lose the chance to do something', 'We missed out on the boat trip.'],
        ['work around', 'change a plan to deal with a problem', 'We worked around a train delay.'],
      ],
      adjectives: [
        ['flexible', 'able to change easily', 'The plan is flexible.'],
        ['fixed', 'decided and difficult to change', 'The booking time is fixed.'],
        ['popular', 'liked by many people', 'The museum is popular at weekends.'],
        ['rushed', 'done with too little time', 'The visit felt rushed.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d book what matters most. **For instance**, a **popular** tour can **fill up** before you arrive, and I don’t want to **miss out on** it.',
        'I’d add it to the **itinerary** and leave the rest of the day open.',
        'That gives the group something to look forward to without making everything **fixed**.',
      ],
      b: [
        'I’d keep the trip **flexible**. **Although** every **booking** saves time later, it makes the day feel **rushed** if we suddenly find a place we like.',
        'We can **pencil in** a few ideas instead.',
        'If there’s a **delay**, we can **work around** it without paying for something we missed.',
      ],
      conditional: [
        'I’d book the group’s main **priority** if it’s **popular** and could **fill up**.',
        '**On the other hand**, a whole **itinerary** with **fixed** times might be too much for just two days.',
        'I’d **pencil in** one idea for Sunday and leave time for a new plan.',
      ],
    },
  },
  {
    slug: 'group-trip-room-sharing',
    title: 'Share a room or pay for your own?',
    prompt: 'Your group is going away for two nights. Sharing a room cuts the price, but some people get up at different times. Would you share or book separately?',
    options: [
      { label: 'Share a room', description: 'Save money and agree on quiet hours.' },
      { label: 'Your own room', description: 'Pay more for privacy and your own schedule.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['roommate', 'someone you share a room with', 'My roommate gets up early.'],
        ['privacy', 'having a space or time to yourself', 'I like some privacy when I travel.'],
        ['schedule', 'a plan of what happens at different times', 'Our schedules are different.'],
        ['charge', 'an amount you have to pay', 'There is an extra charge for a single room.'],
      ],
      phrasalVerbs: [
        ['split the cost', 'divide what you pay among people', 'We split the cost of the room.'],
        ['keep someone up', 'stop someone from sleeping', 'The light kept me up.'],
        ['get along', 'have a good relationship', 'We get along well on trips.'],
        ['turn in', 'go to bed', 'I turned in after dinner.'],
      ],
      adjectives: [
        ['restful', 'helping you feel rested', 'It was a restful night.'],
        ['considerate', 'thinking about what other people need', 'My roommate is considerate.'],
        ['separate', 'kept apart from something else', 'We booked separate rooms.'],
        ['worthwhile', 'worth the time or money spent', 'The extra night was worthwhile.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d share with someone **considerate**. **Although** a **roommate** can **keep you up**, friends can agree on quiet hours.',
        'I can **split the cost** and use the savings for a meal together.',
        'I’d ask about alarms before booking, so we both know what to expect.',
      ],
      b: [
        'I’d book a **separate** room. I sleep better with **privacy**, and a **restful** night makes the rest of the trip easier.',
        '**For instance**, I can **turn in** early without asking a roommate to stop talking.',
        'I’d check whether the extra **charge** is still within my budget.',
      ],
      conditional: [
        'I’d share if I **get along** with my **roommate** and our **schedules** are similar.',
        '**On the other hand**, if one of us has an early start, a **separate** room might be **worthwhile**.',
        'I’d compare the extra **charge** with the value of getting a **restful** night.',
      ],
    },
  },
  {
    slug: 'volunteer-or-buy-a-festival-ticket',
    title: 'Volunteer at a festival or buy a ticket?',
    prompt: 'A music festival offers free entry to people who work a three-hour shift. Would you volunteer or pay for a ticket and spend all day as a visitor?',
    options: [
      { label: 'Volunteer', description: 'Help with entry in the afternoon and see some of the shows.' },
      { label: 'Buy a ticket', description: 'Pay for entry so you can choose exactly what to see.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['shift', 'a block of time when someone works', 'My shift starts at two.'],
        ['line-up', 'the list of performers at an event', 'The line-up includes a local band.'],
        ['entry', 'the chance or right to go in', 'The ticket includes entry to both stages.'],
        ['crowd', 'a large group of people in one place', 'The crowd waited by the gates.'],
      ],
      phrasalVerbs: [
        ['sign up', 'register to take part', 'I signed up for a short shift.'],
        ['check in', 'tell organisers you have arrived', 'Volunteers check in at the gate.'],
        ['miss out on', 'lose an opportunity', 'I missed out on the main show.'],
        ['help out', 'give help with a task', 'We helped out at the entrance.'],
      ],
      adjectives: [
        ['enjoyable', 'pleasant or fun to do', 'The evening was enjoyable.'],
        ['demanding', 'requiring a lot of effort', 'The afternoon shift was demanding.'],
        ['worthwhile', 'giving enough benefit for your effort', 'The experience was worthwhile.'],
        ['affordable', 'possible to pay for', 'The early ticket was affordable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **sign up** to volunteer. **For instance**, I might meet festival staff while I **help out** with **entry**.',
        'A three-hour **shift** sounds **worthwhile** if I can still see my favourite band.',
        'I’d check the **line-up** before agreeing to a time.',
      ],
      b: [
        'I’d buy an **affordable** ticket if I can. **Although** a **shift** might be fun, I don’t want to **miss out on** parts of the **line-up**.',
        'I’d rather move between stages when the **crowd** changes.',
        'I have one day there, and I want it to feel **enjoyable**.',
      ],
      conditional: [
        'I’d **sign up** if the organisers can give me a **shift** before the shows I want to see.',
        '**On the other hand**, it would be **demanding** to work through the busiest part of the festival.',
        'I’d compare the **line-up** with my hours before deciding whether to buy **entry**.',
      ],
    },
  },
  {
    slug: 'mend-or-replace-headphones',
    title: 'Repair your headphones or buy new ones?',
    prompt: 'One side of your headphones has stopped working. A repair shop can try to fix them, or you can buy a new pair. What would you do?',
    options: [
      { label: 'Repair them', description: 'Pay for an inspection and repair them if the shop can find the fault.' },
      { label: 'Replace them', description: 'Buy a pair immediately and recycle the old ones if they cannot be reused.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['fault', 'a problem that stops something working properly', 'The shop found a fault in the cable.'],
        ['repair', 'work that makes a broken item work again', 'The repair took two days.'],
        ['warranty', 'a promise to fix or replace something for a certain time', 'The new pair has a warranty.'],
        ['spare part', 'a piece used to replace a broken part', 'They ordered a spare part.'],
      ],
      phrasalVerbs: [
        ['wear out', 'stop working after a lot of use', 'The padding wore out.'],
        ['sort out', 'solve a problem', 'The shop sorted out the cable problem.'],
        ['break down', 'stop working', 'My old player broke down.'],
        ['trade in', 'give an old item as part of a deal for a new one', 'I traded in my old headphones.'],
      ],
      adjectives: [
        ['faulty', 'having something wrong with it', 'The plug is faulty.'],
        ['durable', 'able to last a long time', 'The new cable is durable.'],
        ['reusable', 'able to be used again', 'The case is reusable.'],
        ['available', 'ready to buy or use', 'The spare part is available.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d try a **repair** first. **For instance**, the shop might **sort out** a **faulty** cable without replacing the whole pair.',
        'I’d ask whether a **spare part** is **available** and what it costs.',
        'If the rest still works well, fixing it makes sense to me.',
      ],
      b: [
        'I’d replace them if several parts are starting to **wear out**. **Although** one **repair** might help for a while, I need a **durable** pair I can use every day.',
        'I’d choose a simple pair with a **warranty**.',
        'If possible, I’d **trade in** the old ones.',
      ],
      conditional: [
        'I’d repair them if the **fault** is small and the **spare part** is **available**.',
        '**On the other hand**, if the headphones keep **breaking down**, a **durable** new pair may cost less in the long run.',
        'I’d ask for a price for both choices before I decide.',
      ],
    },
  },
  {
    slug: 'weekly-budget-or-spending-log',
    title: 'Set spending limits or track what you spend?',
    prompt: 'You want to save for a trip. Would you set a limit for food and leisure each week, or record every purchase for a month before deciding what to change?',
    options: [
      { label: 'Set weekly limits', description: 'Decide how much you can spend in each group before the week begins.' },
      { label: 'Track purchases first', description: 'Write down what you buy, then look for places to spend less.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['limit', 'the most you allow yourself to use', 'I set a limit for lunches out.'],
        ['expense', 'money spent on something', 'Transport is my biggest expense.'],
        ['habit', 'something you do often', 'Buying coffee is a daily habit.'],
        ['savings', 'money you have kept for later', 'My savings are growing.'],
      ],
      phrasalVerbs: [
        ['cut back on', 'reduce how much you spend or use', 'I cut back on takeaway food.'],
        ['write down', 'record information in writing', 'I write down each purchase.'],
        ['add up', 'combine to make a total', 'The small payments add up.'],
        ['put aside', 'save something for later', 'I put aside a little money each week.'],
      ],
      adjectives: [
        ['realistic', 'likely to work in real life', 'My weekly limit is realistic.'],
        ['unexpected', 'not planned or expected', 'I had an unexpected expense.'],
        ['gradual', 'happening slowly over time', 'The change was gradual.'],
        ['steady', 'regular and unlikely to change suddenly', 'I made steady progress.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d set a **realistic** **limit** and **put aside** my **savings** at the start of each week.',
        '**Although** an **unexpected** **expense** could change the plan, a limit helps me decide before I buy.',
        'I’d start with lunches out because it’s one place I can **cut back on** spending.',
      ],
      b: [
        'I’d **write down** my **expenses** for a month. **For instance**, small drinks or delivery fees might **add up** more than I realise.',
        'Seeing the **habit** is a useful first step towards **gradual** change.',
        'Then I’d pick one thing I could stop paying for without making a strict budget.',
      ],
      conditional: [
        'I’d set a **limit** if I already know which **habit** I want to change.',
        '**On the other hand**, if I’m unsure where the money goes, I’d **write down** my **expenses** first.',
        'Either way, I’d **put aside** an amount that is **realistic**, so I can keep doing it.',
      ],
    },
  },
  {
    slug: 'second-hand-or-fewer-new-clothes',
    title: 'Buy second-hand clothes or buy fewer new ones?',
    prompt: 'You want to spend less on clothes this year. Do you buy mainly second-hand or buy a few new items you expect to wear for longer?',
    options: [
      { label: 'Mainly second-hand', description: 'Look for used clothes and check their condition before buying.' },
      { label: 'Fewer new items', description: 'Buy a small number of new pieces that will go with what you already own.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['condition', 'the state something is in', 'The jacket is in good condition.'],
        ['bargain', 'something worth more than the price you pay', 'The shoes were a bargain.'],
        ['wardrobe', 'all the clothes someone owns', 'Most of my wardrobe is black.'],
        ['fit', 'how well clothes match your size and shape', 'This jacket is a good fit.'],
      ],
      phrasalVerbs: [
        ['try on', 'wear a piece briefly to see if it fits', 'I tried on the trousers.'],
        ['look out for', 'keep watching for something you want', 'I look out for good coats.'],
        ['wear out', 'use something until it is damaged', 'I wore out those trainers.'],
        ['pass on', 'give something to another person', 'I passed on the shirt to a friend.'],
      ],
      adjectives: [
        ['second-hand', 'owned or used by someone before', 'It is a second-hand coat.'],
        ['well-made', 'made carefully and likely to last', 'This shirt looks well-made.'],
        ['versatile', 'useful in different situations', 'A black jacket is versatile.'],
        ['worn', 'damaged or tired-looking from use', 'The cuffs are worn.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **look out for** **second-hand** clothes in good **condition**. **For instance**, a **well-made** coat may cost much less in a used shop.',
        'I’d **try it on** and check the cuffs before buying.',
        'That way I’m looking for a useful **bargain**, not buying clothes simply because they’re cheap.',
      ],
      b: [
        'I’d buy fewer new items that are **versatile**. **Although** the first price is higher, a good **fit** matters when I plan to wear a piece often.',
        'I’d **try on** a jacket and think of three things in my **wardrobe** it goes with.',
        'I’d replace pieces only after they **wear out**.',
      ],
      conditional: [
        'I’d buy **second-hand** if I can find a **good fit** and the **condition** is clear.',
        '**On the other hand**, for something I need every day, I’d buy one **well-made** new item if the used ones are **worn**.',
        'I can **pass on** things that no longer fit me.',
      ],
    },
  },
  {
    slug: 'one-big-or-small-neighbour-events',
    title: 'One big street party or smaller regular events?',
    prompt: 'Your street has a small budget to help neighbours meet. Would you use it for one big party or hold three smaller meet-ups?',
    options: [
      { label: 'One street party', description: 'Spend most of the money on food and music for one afternoon.' },
      { label: 'Three meet-ups', description: 'Offer simple refreshments and a different small activity each month.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['turnout', 'the number of people who attend', 'The turnout was better than we expected.'],
        ['volunteer', 'someone who offers to help without pay', 'A volunteer brought spare chairs.'],
        ['venue', 'a place where an event happens', 'The community room is our venue.'],
        ['budget', 'the amount of money available', 'We kept within the budget.'],
      ],
      phrasalVerbs: [
        ['put on', 'organise or present an event', 'We put on a street party.'],
        ['show up', 'arrive at a place or event', 'Ten families showed up.'],
        ['pitch in', 'help with work that others are doing', 'Several neighbours pitched in.'],
        ['run out of', 'use all of something', 'We ran out of cups.'],
      ],
      adjectives: [
        ['lively', 'full of movement or activity', 'It was a lively afternoon.'],
        ['regular', 'happening repeatedly at expected times', 'The group holds regular meetings.'],
        ['welcoming', 'making people feel welcome', 'The room felt welcoming.'],
        ['manageable', 'possible to handle or control', 'A small event is more manageable.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **put on** one **lively** party. **For instance**, music might attract neighbours who would never go to a meeting.',
        'A higher **turnout** gives everyone more people to talk to.',
        'I’d ask a few **volunteers** to **pitch in** early so we don’t spend the whole **budget** on one part of the event.',
      ],
      b: [
        'I’d plan **regular** small events. **Although** the first **turnout** might be low, people can **show up** another time if they miss it.',
        'A familiar **venue** can become more **welcoming** over several visits.',
        'Small jobs also feel more **manageable** for the neighbours offering to help.',
      ],
      conditional: [
        'If enough **volunteers** can **pitch in** and the **venue** is big enough, I’d try a **lively** party.',
        '**On the other hand**, when people work different hours, **regular** meet-ups give them more chances to **show up**.',
        'I’d check which plan gets more neighbours involved, not just which costs less.',
      ],
    },
  },
  {
    slug: 'extra-shifts-or-evening-course',
    title: 'Take extra shifts or join an evening course?',
    prompt: 'You have room for one regular activity after work. Should you take paid extra shifts for three months or do a course that could help you apply for a different job?',
    options: [
      { label: 'Extra shifts', description: 'Earn more money now while keeping your usual job.' },
      { label: 'An evening course', description: 'Save the time for class and learn a skill you could use later.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['income', 'money you earn or receive regularly', 'Extra work raised my income.'],
        ['qualification', 'a result or certificate showing a skill', 'The course gives a qualification.'],
        ['commitment', 'a promise or duty that takes time', 'A weekly course is a commitment.'],
        ['goal', 'something you want to achieve', 'My goal is to work in design.'],
      ],
      phrasalVerbs: [
        ['take on', 'agree to do more work or duties', 'I took on one extra shift.'],
        ['sign up for', 'register to join', 'She signed up for a course.'],
        ['keep up with', 'manage work at the required speed', 'I kept up with the lessons.'],
        ['pay off', 'bring a useful result after effort', 'The extra practice paid off.'],
      ],
      adjectives: [
        ['short-term', 'lasting or planned for a short period', 'I need a short-term income boost.'],
        ['demanding', 'requiring effort or attention', 'The course is demanding.'],
        ['worthwhile', 'worth doing because of the benefit', 'The skills are worthwhile.'],
        ['relevant', 'connected with what you want to do', 'The course is relevant to my goal.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d **take on** the extra shifts. **Although** a course can **pay off** later, I need a **short-term** boost to my **income** now.',
        'I’d set a savings **goal** for the three months.',
        'Once I reach it, I can look for a training course with a schedule I can manage.',
      ],
      b: [
        'I’d **sign up for** a **relevant** course. **For instance**, a recognised **qualification** could help me apply for the role I want.',
        'The course is a **commitment**, and I’d need to **keep up with** the assignments.',
        'I’d ask employers what they value before I pay, so the effort is **worthwhile**.',
      ],
      conditional: [
        'If I need **income** urgently, I’d **take on** extra shifts for a **short-term** period.',
        '**On the other hand**, if my next role needs a **qualification**, I’d **sign up for** a course that is **relevant** to it.',
        'I’d check how much time I can realistically give to either plan.',
      ],
    },
  },
  {
    slug: 'summer-shift-start-time',
    title: 'Start work earlier or keep a flexible start?',
    prompt: 'Your team wants to avoid the hottest part of the day. Should everyone start and finish earlier, or should each person choose a start time with the manager?',
    options: [
      { label: 'An earlier start for everyone', description: 'Keep the team together and finish before the hottest hours.' },
      { label: 'A flexible start', description: 'Agree on start times that work with travel, family and team needs.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['shift', 'a planned period of work', 'My shift ends at three.'],
        ['routine', 'things you do regularly in the same order', 'I have a morning routine.'],
        ['overlap', 'a time shared by two schedules', 'There is overlap from ten to two.'],
        ['heat', 'a high temperature', 'We finish before the heat.'],
      ],
      phrasalVerbs: [
        ['work around', 'plan around a restriction', 'I work around the school run.'],
        ['line up', 'arrange things so they match', 'We lined up our start times.'],
        ['adjust to', 'get used to a change', 'I adjusted to the early shift.'],
        ['cover for', 'do someone else’s work for a time', 'I can cover for you at nine.'],
      ],
      adjectives: [
        ['flexible', 'easy to change', 'The new hours are flexible.'],
        ['consistent', 'remaining the same over time', 'We need a consistent timetable.'],
        ['tiring', 'making you feel tired', 'The early start can be tiring.'],
        ['shared', 'used or kept in common', 'We use a shared schedule.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d start earlier together. **As a result**, we’d avoid more of the **heat** and keep a **consistent** routine for customers.',
        'It would be easier to **line up** the **shifts** than to change them every day.',
        'I’d give people notice so they can **adjust to** the earlier start.',
      ],
      b: [
        'I’d offer a **flexible** start. **For instance**, in my **routine** I have to **work around** the school drop-off.',
        'I’d keep enough **overlap** for a meeting and agree who can **cover for** anyone on a later shift.',
        'That lets the team share work without everyone travelling at the same time.',
      ],
      conditional: [
        'I’d choose the earlier start if the work needs everyone there and people can **adjust to** a **consistent** **routine**.',
        '**On the other hand**, if only part of the day needs **overlap**, a **flexible** start makes more sense.',
        'I’d test both ideas for a week and ask which one avoids the **heat**.',
      ],
    },
  },
  {
    slug: 'sports-league-or-friendly-games',
    title: 'Join a league or play friendly games?',
    prompt: 'Your group can join an amateur league or play a friendly match every Sunday. Which suits the group better?',
    options: [
      { label: 'Join a league', description: 'Play with set rules, keep scores and practise every week.' },
      { label: 'Play friendly games', description: 'Swap teams each week and let people join when they can.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['league', 'a group of teams that compete regularly', 'Our team joined a local league.'],
        ['fixture', 'a planned sports match', 'The next fixture is on Sunday.'],
        ['commitment', 'time or effort you have promised', 'Travel makes it a bigger commitment.'],
        ['team spirit', 'a feeling of working well and supporting each other', 'The match improved team spirit.'],
      ],
      phrasalVerbs: [
        ['turn up', 'arrive at a place', 'Eight players turned up.'],
        ['keep up', 'play or work at the same speed', 'I tried to keep up with the other players.'],
        ['team up', 'join someone to work or play together', 'We teamed up with another group.'],
        ['drop out', 'stop taking part', 'Two players dropped out.'],
      ],
      adjectives: [
        ['competitive', 'wanting to win or do better than others', 'The league gets competitive.'],
        ['casual', 'informal and without strict demands', 'We play a casual game after lunch.'],
        ['inclusive', 'making it easy for different people to join', 'The friendly match is more inclusive.'],
        ['motivating', 'making you want to try harder', 'A league can be motivating.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d join the **league**. **For instance**, a weekly **fixture** would give us a reason to **turn up** and practise.',
        'Playing against new teams sounds **motivating**.',
        '**Although** the **commitment** is bigger, I’d ask how many people are ready for it before we sign up.',
      ],
      b: [
        'I’d keep the games **casual** and **inclusive**. People with busy weekends can still **turn up** when they have time.',
        '**On the other hand**, a **competitive** **league** might make beginners feel they can’t **keep up**.',
        'I want the group to build **team spirit**, even if we never record a score.',
      ],
      conditional: [
        'I’d join a **league** if there is enough **commitment** for every **fixture**.',
        '**On the other hand**, if several players might **drop out** when it gets too **competitive**, I’d keep Sunday games **casual**.',
        'We could **team up** for a small tournament first and see how it feels.',
      ],
    },
  },
  {
    slug: 'library-room-bookings',
    title: 'Book the study room or let people turn up?',
    prompt: 'A library has one large study room. Should groups book it for an hour or use it in the order they arrive?',
    options: [
      { label: 'Book a slot', description: 'Reserve an hour in advance and give the room to someone else if the group is late.' },
      { label: 'First come, first served', description: 'Let people use an empty room immediately and set a time limit.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['slot', 'a period of time that can be reserved', 'The four o’clock slot is free.'],
        ['group', 'people doing something together', 'Our group meets on Tuesdays.'],
        ['queue', 'a line of people waiting for something', 'There was a queue outside the room.'],
        ['reservation', 'an arrangement to keep something for later use', 'We cancelled the reservation.'],
      ],
      phrasalVerbs: [
        ['book up', 'become fully reserved', 'The room books up on Fridays.'],
        ['turn up', 'arrive', 'Two students turned up together.'],
        ['give up', 'stop using or keeping something', 'We gave up our slot when we couldn’t go.'],
        ['clear out', 'leave and remove your things', 'We cleared out at five.'],
      ],
      adjectives: [
        ['available', 'ready to be used', 'The room is available now.'],
        ['fair', 'treating people equally', 'The rule seems fair.'],
        ['limited', 'available in a small amount', 'The room has limited space.'],
        ['unpredictable', 'difficult to plan for in advance', 'Demand is unpredictable in summer.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d use a **reservation** system. **For instance**, a **group** can arrange to meet if it knows a **slot** is **available**.',
        'I’d ask people to **give up** a booking they no longer need.',
        'That seems **fair** as long as everyone has the same chance to reserve a room.',
      ],
      b: [
        'I’d let people **turn up** if demand is **unpredictable**. **Although** planning ahead is useful, an empty room should not stay locked while a **queue** forms outside.',
        'I’d give groups an hour and ask them to **clear out** on time.',
        'A simple time limit makes walk-in use **fair**.',
      ],
      conditional: [
        'I’d use **reservations** when the room starts to **book up** and groups need to plan.',
        '**On the other hand**, in a quiet week the room can stay **available** to anyone who **turns up**.',
        'I’d try a **fair** mix, with some **slots** bookable and the rest for walk-ins.',
      ],
    },
  },
  {
    slug: 'club-guest-or-equipment',
    title: 'Invite a guest speaker or buy equipment?',
    prompt: 'A school photography club has enough money for one guest session or a set of equipment members can share. What should it spend the money on?',
    options: [
      { label: 'Invite a guest', description: 'Spend an afternoon getting advice from a professional photographer.' },
      { label: 'Buy shared equipment', description: 'Let members borrow equipment and practise over several weeks.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['equipment', 'tools you use for a particular activity', 'The club shares its equipment.'],
        ['session', 'a period set aside for an activity', 'We booked a two-hour session.'],
        ['advice', 'ideas about what you could do', 'The photographer gave us advice.'],
        ['practice', 'doing an activity repeatedly to get better', 'I need more practice indoors.'],
      ],
      phrasalVerbs: [
        ['set up', 'prepare something for use', 'We set up the lights.'],
        ['try out', 'use something to see whether you like it', 'I tried out a different lens.'],
        ['pick up a skill', 'learn a skill through experience', 'I picked up a useful skill at the workshop.'],
        ['look after', 'keep something safe and in good condition', 'We look after the club camera.'],
      ],
      adjectives: [
        ['practical', 'useful in real situations', 'The guest gave practical advice.'],
        ['shared', 'used by more than one person', 'It is shared equipment.'],
        ['lasting', 'continuing to have an effect', 'The lesson had a lasting effect.'],
        ['limited', 'available in a small amount', 'We have limited space.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d book the guest **session**. **For instance**, beginners could **pick up** a useful way to light a face using **limited** **equipment**.',
        'I’d ask the guest for **practical** **advice** we can use later.',
        'A session is short, but it can give the whole group a new way to practise.',
      ],
      b: [
        'I’d buy **shared** **equipment**. Members can **try it out** several times and get enough **practice** to feel comfortable.',
        '**Although** a guest’s **advice** could help, I’d rather make a **lasting** change the club can use each week.',
        'We would need a booking list and people to **look after** it.',
      ],
      conditional: [
        'I’d invite someone if beginners need **practical** **advice** on how to **set up** a shot.',
        '**On the other hand**, if the club knows what it wants to do but can’t borrow **equipment**, I’d buy it.',
        'I’d ask which choice gives more members a **lasting** chance to practise.',
      ],
    },
  },
  {
    slug: 'listening-with-or-without-transcript',
    title: 'Listen with a transcript or try audio first?',
    prompt: 'You are practising with an English podcast. Do you read the transcript while you listen, or listen first and use the transcript afterwards?',
    options: [
      { label: 'Transcript during listening', description: 'Follow the written words and notice how they sound.' },
      { label: 'Audio first', description: 'Listen for the main idea, then read the text to check.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['transcript', 'a written record of what people said', 'The episode has a transcript.'],
        ['main idea', 'the most important point', 'I understood the main idea.'],
        ['detail', 'a smaller part of what was said', 'I missed one detail about the time.'],
        ['accent', 'the way someone pronounces a language', 'I’m getting used to her accent.'],
      ],
      phrasalVerbs: [
        ['follow along', 'read or listen at the same speed as others', 'I followed along with the transcript.'],
        ['pick out', 'notice a specific word or part', 'I picked out two names.'],
        ['go back over', 'review something again', 'We went back over the first minute.'],
        ['get used to', 'become comfortable with something', 'I got used to the speed.'],
      ],
      adjectives: [
        ['familiar', 'known from previous experience', 'The speaker’s accent is familiar.'],
        ['challenging', 'difficult in a way that needs effort', 'The first episode was challenging.'],
        ['clear', 'easy to understand', 'The recording is clear.'],
        ['distracting', 'taking attention away from the main task', 'The text can be distracting.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d use the **transcript** if the **accent** isn’t **familiar**. **For instance**, I can **follow along** and see how speakers join two words.',
        'I’d **go back over** the hard part without reading the second time.',
        'That helps me hear the **detail** without getting lost for the whole episode.',
      ],
      b: [
        'I’d listen first to **pick out** the **main idea**. **Although** the text can help later, it is **distracting** if I start reading instead of listening.',
        'The audio is **clear**, so I can **get used to** the speed.',
        'I’d use the **transcript** only to check a part I missed.',
      ],
      conditional: [
        'If the audio is **challenging**, I’d **follow along** with the **transcript** for a minute.',
        '**On the other hand**, if I can **pick out** the **main idea**, I’d keep listening without it.',
        'Then I’d **go back over** any important **detail** I missed.',
      ],
    },
  },
  {
    slug: 'peer-feedback-public-or-private',
    title: 'Give feedback in a group or in private?',
    prompt: 'Students are practising short presentations. Should feedback be discussed together, or should each speaker receive it in a private conversation?',
    options: [
      { label: 'Group feedback', description: 'Share one helpful comment aloud so everyone can learn from it.' },
      { label: 'Private feedback', description: 'Give detailed comments to each presenter without other students listening.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['feedback', 'information that helps somebody improve', 'I received feedback on my talk.'],
        ['strength', 'something someone does well', 'Voice control is a strength.'],
        ['confidence', 'belief that you can do something well', 'Practice improved her confidence.'],
        ['suggestion', 'an idea someone can consider', 'I have one suggestion for the introduction.'],
      ],
      phrasalVerbs: [
        ['point out', 'show someone something they may not notice', 'He pointed out an unclear slide.'],
        ['take in', 'understand or absorb what you hear', 'I needed time to take in the comments.'],
        ['build up', 'increase something gradually', 'Short talks build up confidence.'],
        ['speak up', 'say what you think or need', 'I felt able to speak up.'],
      ],
      adjectives: [
        ['honest', 'telling the truth', 'I got honest feedback.'],
        ['specific', 'clear about a particular thing', 'Her advice was specific.'],
        ['sensitive', 'likely to upset someone if handled badly', 'That is a sensitive issue.'],
        ['constructive', 'helping to improve something', 'The comments were constructive.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d share **constructive** **feedback** as a group. **For instance**, someone could **point out** a clear opening that others can learn from.',
        'I’d mention one **strength** and make one **specific** suggestion.',
        'We can **build up** **confidence** if the comments describe the work and help everyone practise.',
      ],
      b: [
        'I’d give **honest** comments privately. **Although** shared **feedback** can teach the group, a **sensitive** point is easier to **take in** without everyone watching.',
        'The speaker can **speak up** and ask for a better example.',
        'I’d still share a general lesson with the class later.',
      ],
      conditional: [
        'I’d share a **specific** **strength** or a general **suggestion** in the group.',
        '**On the other hand**, I’d talk privately if I needed to **point out** something **sensitive**.',
        'I’d ask the speaker what helps them **take in** the feedback and use it next time.',
      ],
    },
  },
  {
    slug: 'choose-or-assign-presentation-topic',
    title: 'Choose your own topic or get one from the teacher?',
    prompt: 'Your class has to give a three-minute English talk. Should each student choose a topic or should everyone answer one question set by the teacher?',
    options: [
      { label: 'Choose your topic', description: 'Pick something you know or want to learn about.' },
      { label: 'Share an assigned topic', description: 'Answer the same question and choose your own examples.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['topic', 'the subject you talk about', 'My topic is weekend travel.'],
        ['interest', 'something you care about or enjoy', 'I chose an interest I know well.'],
        ['outline', 'a short plan of main points', 'I wrote an outline before practising.'],
        ['standard', 'a level used to judge work', 'We use a common standard.'],
      ],
      phrasalVerbs: [
        ['narrow down', 'reduce the number or size of choices', 'I narrowed down the topic.'],
        ['come up with', 'produce an idea or solution', 'She came up with a good example.'],
        ['stick to', 'continue with a plan or subject', 'Try to stick to the main point.'],
        ['read up on', 'learn about a topic by reading', 'I read up on the local history.'],
      ],
      adjectives: [
        ['familiar', 'something you already know', 'Choose a familiar topic.'],
        ['fair', 'giving everyone the same opportunity', 'The marking seems fair.'],
        ['focused', 'concentrating on one clear point', 'Her talk was focused.'],
        ['engaging', 'holding someone’s interest', 'The example made the talk engaging.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d choose a **familiar** **topic**. **For instance**, I can talk about a hobby and **come up with** examples from my own life.',
        'I’d **narrow it down** so my **outline** fits three minutes.',
        'It is easier to sound **engaging** when I’m genuinely interested in what I’m saying.',
      ],
      b: [
        'I’d use one shared question. It gives the teacher a common **standard**, so the first task feels **fair**.',
        '**Although** the **topic** is assigned, I can still **come up with** my own examples.',
        'I’d **stick to** one clear idea so the same question leads to a **focused** talk.',
      ],
      conditional: [
        'I’d let learners choose a **topic** if they can **narrow it down** and produce a **focused** **outline**.',
        '**On the other hand**, a shared question might be **fair** if it is hard to compare very different talks.',
        'I’d use a common **standard** for speaking even when people choose different topics.',
      ],
    },
  },
  {
    slug: 'packed-lunch-or-canteen',
    title: 'Bring your lunch or use the canteen?',
    prompt: 'Your workplace has a canteen, but you can bring food from home. Which would usually work better for you?',
    options: [
      { label: 'Bring lunch', description: 'Prepare food the night before and eat when you are ready.' },
      { label: 'Use the canteen', description: 'Buy a hot meal and sit with people from work.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['canteen', 'a place serving meals at work or school', 'The canteen opens at noon.'],
        ['packed lunch', 'food taken from home to eat later', 'I bring a packed lunch on Mondays.'],
        ['queue', 'a line of people waiting', 'There is a long queue at one.'],
        ['lunch break', 'time away from work to have lunch', 'I have a thirty-minute lunch break.'],
      ],
      phrasalVerbs: [
        ['pack up', 'put things together in a bag or box', 'I packed up my lunch before work.'],
        ['heat up', 'make food warm again', 'I heated up a bowl of soup.'],
        ['run out of', 'use all of something', 'The canteen runs out of soup early.'],
        ['catch up with', 'talk to someone to hear what is new', 'I caught up with a colleague at lunch.'],
      ],
      adjectives: [
        ['convenient', 'easy to use or do', 'The canteen is convenient.'],
        ['homemade', 'made at home', 'I brought homemade soup.'],
        ['rushed', 'done too quickly because there is little time', 'Lunch felt rushed.'],
        ['social', 'involving time with other people', 'A shared meal is social.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d bring a **packed lunch**. **For instance**, I can **heat up** **homemade** soup without waiting in a **queue**.',
        'That gives me longer to enjoy my **lunch break**, especially on a busy day.',
        'I’d **pack up** what is left from dinner, so it needn’t take much time.',
      ],
      b: [
        'I’d go to the **canteen** because it is **convenient** and more **social**. **Although** I may have to wait, I can **catch up with** colleagues I rarely see.',
        'I’d go early before the kitchen **runs out of** the dishes I like.',
        'I would bring lunch on very **rushed** days.',
      ],
      conditional: [
        'I’d take a **packed lunch** if my **lunch break** is short.',
        '**On the other hand**, when I have time to **catch up with** colleagues, the **canteen** would be more **social**.',
        'I’d look at the **queue** before deciding on a day with meetings.',
      ],
    },
  },
  {
    slug: 'sale-or-sponsored-walk',
    title: 'Sell homemade items or organise a sponsored walk?',
    prompt: 'Your class wants to raise money for its end-of-year event. Would you sell homemade items or ask people to sponsor a walk?',
    options: [
      { label: 'A sale', description: 'Make simple things to sell at school and keep track of costs.' },
      { label: 'A sponsored walk', description: 'Agree on an accessible route and ask people to give money for taking part.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['fundraiser', 'an event that raises money for a purpose', 'The fundraiser paid for the class trip.'],
        ['donation', 'money or an item given to help', 'We received a small donation.'],
        ['upfront cost', 'money that must be paid before an activity begins', 'The materials add an upfront cost.'],
        ['route', 'the way from one place to another', 'The route goes around the lake.'],
      ],
      phrasalVerbs: [
        ['raise money for', 'collect money for a purpose', 'We raised money for a school event.'],
        ['sell out', 'sell all the things available', 'The cakes sold out at noon.'],
        ['chip in', 'give part of the money or effort', 'Parents chipped in with materials.'],
        ['sign up', 'put your name down to join', 'I signed up for the walk.'],
      ],
      adjectives: [
        ['affordable', 'possible for people to pay for', 'The snacks are affordable.'],
        ['accessible', 'possible for different people to reach or take part in', 'We chose an accessible route.'],
        ['weather-dependent', 'likely to change because of the weather', 'The walk is weather-dependent.'],
        ['transparent', 'easy for others to check or understand', 'The budget is transparent.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d put on a sale. **For instance**, we could sell **affordable** snacks at lunch, and several students can **chip in** with their time.',
        'There is an **upfront cost**, so I’d keep the accounts **transparent**.',
        'If we **sell out**, everyone can see how much the **fundraiser** made.',
      ],
      b: [
        'I’d organise a walk. An **accessible** **route** means lots of students can **sign up**, and every **donation** goes towards the event after the necessary costs.',
        '**Although** the walk is **weather-dependent**, we can keep a second date free.',
        'I’d ask people to give what they can.',
      ],
      conditional: [
        'I’d choose a sale if the **upfront cost** is low and people can **chip in** with making things.',
        '**On the other hand**, if we have an **accessible** **route** and many people want to **sign up**, a walk could be more successful.',
        'Either way the total should be **transparent**.',
      ],
    },
  },
  {
    slug: 'tutor-or-conversation-group',
    title: 'Practise with a tutor or join a conversation group?',
    prompt: 'You can spend an hour each week on English speaking. Do you book a tutor or join a small conversation group?',
    options: [
      { label: 'A tutor', description: 'Practise the skills you find hardest and ask for corrections.' },
      { label: 'A conversation group', description: 'Talk with different people and learn to keep a conversation going.' },
    ],
    conditionalPrompt: 'Explain when you would choose each option and give an example.',
    vocabulary: {
      nouns: [
        ['correction', 'something that shows or fixes a mistake', 'I asked for a correction after speaking.'],
        ['fluency', 'the ability to speak easily and smoothly', 'Regular practice helps my fluency.'],
        ['turn', 'the chance for one person to speak', 'I waited for my turn.'],
        ['goal', 'something you want to achieve', 'My goal is to speak at work.'],
      ],
      phrasalVerbs: [
        ['work on', 'spend effort improving something', 'I work on my pronunciation.'],
        ['join in', 'start taking part with other people', 'She joined in the discussion.'],
        ['keep going', 'continue doing something', 'I kept going after I made a mistake.'],
        ['pick up', 'learn something by hearing or doing it', 'I picked up a new phrase.'],
      ],
      adjectives: [
        ['personal', 'designed for a particular person', 'The tutor gives personal advice.'],
        ['varied', 'involving different kinds of people or things', 'The group has varied topics.'],
        ['comfortable', 'feeling calm and at ease', 'I feel comfortable in the group.'],
        ['useful', 'helping you do something', 'The correction was useful.'],
      ],
      connectors: CONNECTORS,
    },
    models: {
      a: [
        'I’d book a tutor to **work on** what I find hard. **For instance**, I need a **useful** **correction** when I put stress on the wrong word.',
        'A **personal** lesson gives me more time to practise it.',
        'I’d tell the tutor my **goal** before we start so the hour feels **useful**.',
      ],
      b: [
        'I’d choose the group to improve my **fluency**. **Although** I won’t get a **correction** every time, I can **join in** and learn to **keep going** when I can’t find a word.',
        '**Varied** speakers also ask questions I didn’t expect.',
        'I’d make sure everyone gets a **turn**.',
      ],
      conditional: [
        'I’d book a tutor if I have a **personal** **goal** and need **corrections** to **work on** it.',
        '**On the other hand**, if I want to feel more **comfortable** speaking with new people, I’d **join in** with a group.',
        'I could start with a few classes and review my **fluency** later.',
      ],
    },
  },
]
