type LegacySetNumber = 10 | 11 | 12;
type ListeningPart = 1 | 2 | 3 | 4;

type Insertion = Readonly<{
  after: string;
  text: string;
}>;

const insertions: Record<`${LegacySetNumber}-${ListeningPart}`, readonly Insertion[]> = {
  '10-1': [
    {
      after: 'JOBSEEKER: Of course — F-A-R-R-E-L-L-Y.',
      text: `CONSULTANT: Thanks. I ask because we sometimes receive applications with a single letter missing, and then an employer cannot match the paperwork to the person. Have you registered with Citywide before?

JOBSEEKER: No, this is my first time. I moved here at the beginning of the month, so I am still finding out which firms recruit locally.

CONSULTANT: In that case, I should explain the process. Today I will create your profile and discuss the roles that might suit you. If you decide to apply for one, we send your details to the employer only after you have approved the job description. There is no charge to you at any stage.

JOBSEEKER: That sounds straightforward.`,
    },
    {
      after: "JOBSEEKER: I'm free immediately — I finished my last contract a fortnight ago.",
      text: `CONSULTANT: That gives us some flexibility. Are you hoping for a permanent post, or would you consider another temporary contract while you look?

JOBSEEKER: My preference is permanent work, but I would accept a contract lasting at least six months. I would rather avoid a very short placement because I want time to learn the organisation properly.

CONSULTANT: And would a journey across town be manageable?

JOBSEEKER: Yes, provided the office is near a bus route. I do not drive, but the buses from my neighbourhood are reliable until quite late.`,
    },
    {
      after: 'JOBSEEKER: Yes, I speak French fairly fluently.',
      text: `CONSULTANT: Excellent. What computer skills should I put down? Employers often ask specifically about spreadsheets and diary systems.

JOBSEEKER: I use word-processing and spreadsheet software every day, and in my last job I organised the manager's electronic diary. I also dealt with invoices. I have not used specialist accounting software, though.

CONSULTANT: That's fine. We can offer a short online course if a vacancy requires it. I should also ask about working hours. You mentioned public transport, so would early mornings be difficult?

JOBSEEKER: A start before seven would be awkward. Normal office hours are ideal, and I could occasionally stay late. I am also available on Saturdays, although I would prefer not to work every weekend.

CONSULTANT: Good. I'll note all of that. References can wait until an employer requests them, but it helps to warn two former supervisors now.

JOBSEEKER: I can contact my previous manager and the owner of the shop today.`,
    },
    {
      after: 'JOBSEEKER: The Office Assistant one sounds ideal, actually.',
      text: `CONSULTANT: It does seem the closest match. The Receptionist post involves a lot of face-to-face work and starts at half past seven, while the Data Clerk role is quieter but finishes after the last bus to your area. At Riverside, the Office Assistant works from ten until three on four weekdays. The employer may extend the hours after the first three months.

JOBSEEKER: That timetable would be perfect. What would I actually be doing?

CONSULTANT: Mostly arranging appointments, preparing simple reports and answering email enquiries. There is some telephone work, but another colleague covers the reception desk. They want someone accurate and calm rather than someone with a particular degree.

JOBSEEKER: That sounds close to what I did in the shop office.

CONSULTANT: Exactly. Your customer experience is relevant, and your business qualification supports the administrative side. Before I submit the application, send me your latest employment dates. You can attach them to the reply when my message arrives.`,
    },
  ],
  '10-2': [
    {
      after: "And our children's area is currently being renovated, so please bear with us there.",
      text: `The distinction matters because the leaflet you may have picked up was printed before the work was finished. The café has new chairs, but it is still the same service, and the wireless network has only had a routine upgrade. The children's area will look different when it reopens next month, yet it is a refurbishment rather than an additional facility. By contrast, neither digital borrowing nor reservable rooms existed here last year.

To use the digital collection, sign in with the number on your card and create a four-digit personal code. You may keep an electronic title for up to three weeks, after which it disappears automatically, so there can be no late charge. The study rooms hold between two and six people. They are intended for quiet group work, and bookings can be made for ninety minutes at a time through our website.`,
    },
    {
      after: "If you do return something late, there's a small fine for each day it's overdue, so do keep an eye on your due dates.",
      text: `The twelve-item allowance is a total across all physical formats; it does not mean twelve books plus twelve films. Most members find that generous enough. The borrowing period applies equally to books and spoken-word recordings, although very popular films may have a shorter loan shown on the case. You will receive an email reminder two days before an item is due. Please do not ignore it simply because online renewal is available: a reservation by another reader prevents renewal, and the daily charge begins the following morning.

If cost is a concern, speak to us rather than leaving an overdue item at home. We can usually arrange payment over time, and charges are waived when a documented hospital stay or similar emergency caused the delay. Replacement costs are different from late charges, so ask a member of staff before buying another copy yourself.`,
    },
    {
      after: 'And if you need to use a computer, our computer suite is on the first floor, with printing and scanning available.',
      text: `The newspaper database includes national titles as well as publications from more than forty countries. It can be used from home, whereas several specialist reference databases are available only inside the building. The Saturday activity for children begins at ten thirty and lasts about forty minutes. It is designed mainly for ages four to seven, but younger brothers and sisters may sit with a parent. There is no booking fee.

Computers may be reserved for an hour. Staff can show you how to log in or scan a document, though they cannot complete forms on your behalf. Black-and-white printing is inexpensive, and you add credit at the machine beside the stairs. Visitors sometimes look for the computers on the ground floor because that is where the help desk stands, so remember to go up one level.`,
    },
    {
      after: "Just come to the main desk and bring proof of your address — a utility bill or a bank statement is fine — and we'll issue your card on the spot.",
      text: `A passport can confirm your identity, but on its own it does not show where you currently live, so it cannot replace that document. A digital bill displayed on your phone is acceptable as long as your name and current home are visible. Students living in halls may use an official letter from their college. Once the card is issued, please sign it and keep the welcome message: it explains how to reserve items, cancel a room and contact us outside opening hours.`,
    },
  ],
  '10-3': [
    {
      after: 'MAYA: We designed a community library. We wanted a public space that would bring people of all ages together, not just a place to borrow books.',
      text: `TUTOR: Let me confirm that for the assessment record: the building itself is a community library. The sports hall shown beside it belongs to the existing school, and the railway station on your location map is simply a nearby landmark. Neither of those is your design proposal.

MAYA: That's right. Our building combines books, digital resources, a children's room and a flexible meeting space. We chose that brief because residents said the neighbourhood lacked an indoor place where different generations could meet without having to buy anything.

JOSH: We also visited two small libraries to observe how people moved through them. The successful one had clear sight lines and movable furniture. In the other, tall shelving blocked the entrance, so first-time visitors looked uncertain about where to go.`,
    },
    {
      after: 'JOSH: We did look at an old town hall for ideas, but in the end the main inspiration was the natural landscape around the site — the way the hills curve. The roofline actually echoes those hills.',
      text: `MAYA: A library in Denmark gave us ideas about daylight, and the town hall helped us think about a central entrance. But neither determined the form of our proposal. Once we traced the profile of the surrounding slopes, the whole plan began to make sense, including the lower roof over the children's area and the taller reading room facing the view.

TUTOR: Good distinction. In the presentation, show the discarded sketches briefly, then make it clear which source guided the final shape. Otherwise the audience may assume that the historic façade was your principal model.`,
    },
    {
      after: "MAYA: We debated using concrete, because it's cheap and durable, but we finally chose timber. It's far more sustainable, and it gives the interior a really warm feel.",
      text: `JOSH: We considered a steel frame too, mainly because it could span the large reading room. Our calculations showed that engineered wooden beams could achieve the same span, however, and a local supplier could provide them. We still use a small amount of concrete in the foundations, but it is not the main structural system.

TUTOR: That is a convincing decision, provided you acknowledge fire treatment and maintenance. Sustainability claims need evidence, so include the transport distance and the certification of the wood rather than saying all wood is automatically environmentally friendly.`,
    },
    {
      after: "JOSH: Definitely. The hardest thing wasn't the budget or accessibility — it was the limited size of the site. It's quite a narrow plot, so fitting everything in without it feeling cramped took a lot of reworking.",
      text: `MAYA: The cost plan actually stayed within the target once we simplified the roof, and the ramp fitted along the eastern edge. The real constraint was width. We solved part of it by sharing circulation space: the broad central aisle can become an exhibition area, and the meeting room opens onto it with folding doors.

TUTOR: That response shows useful development. Include an early plan and the revised one so the audience can see how the restricted plot changed your thinking.`,
    },
    {
      after: 'MAYA: That\'s a good point. We\'ll fix that.',
      text: `TUTOR: Before we discuss the sequence, who is speaking about which section?

MAYA: I'll open with the research and overall concept. Josh will explain the structure, and then I'll cover the internal spaces. We plan to answer questions together.

TUTOR: Sensible. Avoid swapping speakers every minute because that can feel restless. Each of you should complete a coherent section, while the other changes the slides and watches the clock.`,
    },
  ],
  '10-4': [
    {
      after: 'During this feeding season a whale eats almost constantly, storing the energy as a thick layer of blubber that will sustain it through the long journey ahead.',
      text: `These movements are seasonal rather than a simple response to one sudden change in weather. A breeding area offers relatively calm water and fewer dangers for a newborn calf, but it often contains too little nourishment for an adult to remain there throughout the year. A polar feeding area presents the opposite trade-off: prey is abundant during the productive months, although the water is demanding for a very young animal. Migration connects the advantages of both places.

Not every individual follows precisely the same timetable. Pregnant females may leave first on the southward route, while younger animals sometimes depart later. On the return, mothers with calves often travel more slowly and stay close to sheltered coastlines. Researchers therefore compare many records before describing any schedule as typical.`,
    },
    {
      after: 'There, the females give birth in warm, shallow lagoons near the shore, which offer their calves protection from predators.',
      text: `A complete return trip can exceed sixteen thousand kilometres. The whales do not travel in a perfectly straight line, and they may pause where local currents concentrate prey. Scientists identify individuals from scars and markings on their tails, then compare photographs taken at different points along the coast. More recently, temporary satellite tags have supplied positions from stretches of ocean where boats rarely operate.

The sheltered water at the Mexican end of the route is especially valuable in the first weeks of a calf's life. It allows the calf to surface easily and remain beside its mother while building strength. The adult female eats very little there and depends on energy accumulated during the previous season.`,
    },
    {
      after: 'They also rely heavily on sound, and some species produce long, complex songs that carry for many kilometres underwater and help them stay in contact.',
      text: `The magnetic explanation remains a hypothesis rather than a complete answer. Whales may combine several cues, including the position of the sun, the direction of waves and familiar underwater features near a coast. Evidence from stranded animals suggests that unusual magnetic conditions can sometimes coincide with navigation errors, but the relationship is not simple.

Sound is effective because it travels much farther through water than light. Low calls can maintain contact between animals separated by great distances, while repeated patterns may also convey identity or breeding information. Researchers record these calls with underwater microphones. When the same pattern appears at two stations hours apart, it can help them estimate the direction in which an animal is moving.`,
    },
    {
      after: 'And in the longer term, rising sea temperatures are altering ocean currents and shifting the location of their food, forcing whales to change patterns of migration that have remained stable for thousands of years.',
      text: `Risk is not distributed evenly. Narrow approaches to busy ports create particular collision zones, so measures such as lower vessel speeds or temporary route changes can have a large effect. Entanglement in fishing equipment is another danger, although it varies by region and species. Acoustic disturbance is harder to see: an animal may abandon a feeding area, call more loudly or fail to hear another whale before any physical injury is observed.

Climate-driven changes add uncertainty because the whales may arrive at a traditional feeding ground after the seasonal peak in prey has moved elsewhere. A route learned over generations may then become less efficient. Long-term monitoring is essential: a single tagged trip shows what one animal did, whereas repeated observations reveal whether a population is gradually changing its timing or destination.`,
    },
  ],
  '11-1': [
    {
      after: "CUSTOMER: Certainly — it's W-H-I-T-B-Y.",
      text: `AGENT: Thank you. Have you attended a course with us before, or would this be your first visit?

CUSTOMER: It would be my first. I bought a camera about six months ago and have mostly used the automatic setting. The results are reasonable, but I do not really understand why one photograph works and another does not.

AGENT: That is exactly the stage many participants are at. We keep the groups small, so the instructor can look at each person's pictures rather than deliver a general lecture.`,
    },
    {
      after: 'CUSTOMER: I saw an advert in the newspaper — oh, no, sorry, it was actually a magazine.',
      text: `AGENT: Do you remember which publication? It helps us decide where to advertise next term.

CUSTOMER: It was a local arts publication that I read at the dentist. I initially thought it was the weekly paper because both use the same events page, but the course advert was definitely in the glossy publication.

AGENT: No problem. And are you mainly interested in photographing people, buildings or outdoor scenes?

CUSTOMER: Mostly family events at the moment, although I would like to become more confident outdoors.`,
    },
    {
      after: 'AGENT: The first is our Beginners\' Workshop. You\'ll learn how to control the light — how much of it reaches the camera — and how to compose a good shot. The sessions are held on Saturday morning.',
      text: `AGENT: The instructor begins with the controls on your own camera, then demonstrates how position and direction affect a picture. Participants practise in pairs in the studio before going into the garden. There is a short assignment between meetings, but it is intended to build confidence rather than to be formally marked.

CUSTOMER: That sounds useful. I was worried it might assume a lot of technical knowledge.

AGENT: No, we explain every setting from the beginning. We do ask people to charge their battery and bring the instruction booklet if they still have it.`,
    },
    {
      after: "CUSTOMER: I've got one of those, so that's fine.",
      text: `AGENT: Good. That course is aimed at people who already know the basic controls. The tutor discusses weather, viewpoint and the use of filters, and there is time to compare images at the end of each day. Walking is limited to easy paths, but participants are outside for several hours, so waterproof clothing is sensible.

CUSTOMER: I enjoy walking, so that would not be a problem. Is there somewhere secure to leave a spare bag?

AGENT: Yes, the group has access to a locked room at the meeting point. Expensive equipment should stay with you, of course.`,
    },
    {
      after: 'AGENT: The Landscape Workshop runs over two sessions of five hours each. That one is £150, and the price includes transport to the lake.',
      text: `CUSTOMER: Are there any other costs I should allow for?

AGENT: Only optional ones. On the beginner course, drinks are included with the midday meal, but you may want to buy extra memory storage. On the outdoor course, you bring your own food, while the minibus journey is covered by the fee. We lend filters, but not cameras or stands.

CUSTOMER: And what happens if the weather is terrible on the outdoor date?

AGENT: We still meet and begin with an indoor demonstration. If conditions are unsafe, the practical session moves to the following Sunday. We notify everyone by text before eight in the morning, so please make sure the mobile number you gave me is current.

CUSTOMER: It is. I think the introductory course is probably the sensible place for me to start, but I will check the dates before I decide.`,
    },
  ],
  '11-2': [
    {
      after: "The box office hasn't changed either, though we do hope to modernise it next year.",
      text: `The new equipment above the stage uses less electricity and can store the settings for an entire production. That means technicians no longer have to adjust every lamp by hand between scenes. Below us, the performers now have better mirrors, ventilation and showers. Those two projects used most of this year's improvement budget. The protected seating area may be redecorated only with heritage approval, while changes to ticket sales remain a proposal for a future season.

As we move around, please stay with the group and do not cross any yellow line. A rehearsal begins at midday, and technicians may be moving heavy equipment even when the stage appears empty.`,
    },
    {
      after: "The Regent is a medium-sized venue and can seat 900 people. As we walk onto the stage, notice the floor — it's made of pine, a soft wood that has a gentle spring to it, which is kinder to the dancers' feet.",
      text: `The capacity includes the balcony as well as the rows below it; standing places are never sold. From here the room looks smaller than it does from the entrance because the upper seats curve around the sides. The boards beneath us are replaced section by section when they wear, rather than all at once. They are left unpainted for dance performances, although a temporary dark surface can be laid for a particular production.

Please avoid the marked trapdoor near the centre. It is sometimes used for an actor's entrance, but today it is locked. The orchestra pit is covered as well because this week's show uses recorded music.`,
    },
    {
      after: 'Using a system of ropes and pulleys, the crew can raise and lower the scenery quickly between scenes, so the audience never sees it happening.',
      text: `Some pieces weigh several hundred kilograms, so only trained staff operate the system. Each hanging piece has a numbered line and a balancing weight. During a performance, the stage manager calls every movement in sequence. A technician repeats the instruction before releasing anything; that simple exchange prevents one item from descending while a performer is beneath it.

The space looks untidy during the day because several productions may be stored overhead at once. In performance, however, each movement has been rehearsed to the second.`,
    },
    {
      after: 'The large room at the back is the workshop, where the carpenters build the set — everything from walls to furniture.',
      text: `Construction starts from drawings supplied by the designer. The team first makes a small sample, checks that it can be moved safely, and only then builds the full-sized object. Most walls are timber frames covered with a thin surface; what appears to be stone from the seats may weigh very little. Paint and tools are stored separately, and extraction fans remove dust while cutting takes place.

You may also notice numbered marks on the floor. These show where each item waits before it is taken onstage. Keeping that route clear matters during a rapid scene change.`,
    },
    {
      after: 'And finally, our tour ends at the theatre shop, where you can buy posters and other souvenirs from our current show. Do have a look before you leave. Thank you.',
      text: `The display changes whenever a new production opens, and signed items are kept in the glass case by the till. Photography is allowed in the shop and in the auditorium after the rehearsal has finished. If you have questions about technical careers, I will remain here for another ten minutes, and application leaflets for our volunteer programme are available beside the exit.`,
    },
  ],
  '11-3': [
    {
      after: 'STUDENT: Good, because that was the point I most wanted to make.',
      text: `TUTOR: You establish it effectively by comparing household choices with decisions made earlier in the production chain. Your example of someone refusing a plastic bag is useful because it shows both the value and the limit of personal choice. The shopper can reduce demand, but cannot redesign packaging or require consistent collection across a whole region.

STUDENT: I was careful not to suggest that personal habits are pointless. I meant that they work best when the wider system supports them.

TUTOR: That balance is present. Keep the sentence where you say responsibility is shared, because it prevents the argument from sounding absolute.`,
    },
    {
      after: 'STUDENT: I found that really interesting to research.',
      text: `TUTOR: The German case works because you explain what happened, rather than merely naming the policy. You show how a payment is added when a container is bought and returned when it comes back. You also compare the return rate before and after the scheme. That is more persuasive than a list of countries.

STUDENT: I nearly used three short examples instead.

TUTOR: One developed case is stronger here. The clarity of your prose and the overall length are both good, but neither is as distinctive as the concrete evidence.`,
    },
    {
      after: 'STUDENT: That makes sense. It would flow better.',
      text: `TUTOR: Exactly. Start with packaging that is difficult to recycle and follow it immediately with a design response. Then discuss inconsistent collection and the policy that might address it. Your current headings can remain, but each subsection will become a small argument rather than half of a long catalogue.

STUDENT: Should I remove the paragraph about public information campaigns?

TUTOR: Keep it, but connect it to labelling. Information is useful only if people can identify the correct bin and if the local service accepts the material. That link supports your central position.`,
    },
    {
      after: "STUDENT: I'll do that. What about the length overall?",
      text: `TUTOR: You are within the limit, so expansion is unnecessary. Moving the consumer point will leave space for a final paragraph that draws the argument together. In that paragraph, state which actors should act first and explain why. Do not introduce another policy at that stage.

STUDENT: So the ending should reflect the argument I have already demonstrated.

TUTOR: Precisely. A brief qualification would also be useful: national rules vary, so one model may need adapting rather than copying unchanged.`,
    },
    {
      after: 'STUDENT: Thank you, that\'s really helpful.',
      text: `TUTOR: Before you go, set yourself a realistic order. Locate the updated sources first, because they may change a claim elsewhere. Make the structural revisions next, then create the visual once you know which comparison it needs to show. Leave proofreading until those larger changes are complete.

STUDENT: I can do the research tomorrow and revise over the weekend.

TUTOR: Good. When you read the draft, listen for sentences that run too long as well as obvious errors. Your final message should include both the document and a brief note identifying the sections you changed.`,
    },
  ],
  '11-4': [
    {
      after: 'The tall arches we admire today were used only where the water had to cross a valley.',
      text: `This arrangement protected much of the route from weather, accidental damage and contamination. An underground channel was also cheaper than constructing a continuous line of monumental masonry. Builders followed the contours of the landscape, accepting a longer route when it allowed them to maintain a gentle descent. Visible bridges were therefore solutions to particular obstacles, not the normal form of the system.

Engineers needed access after construction, so inspection shafts were placed at intervals. Workers could enter through them to remove debris and examine the lining without opening the entire route.`,
    },
    {
      after: 'If the slope was too steep, the water moved too fast and damaged the channel; if it was too shallow, the water stopped moving and turned stagnant.',
      text: `The required gradient could be remarkably small. Surveyors checked it repeatedly because an error near the source might not become obvious until kilometres had been built. They could redirect a route around a ridge or carry it across a depression, but they could not allow water to climb. Planning therefore combined careful measurement with detailed knowledge of local terrain.

At some crossings, enclosed pressure pipes carried water down one side and up the other. These were expensive and difficult to maintain, so an open channel with a steady descent remained the preferred solution wherever geography allowed it.`,
    },
    {
      after: 'To measure these tiny gradients, surveyors used a long wooden instrument, filled with water, that acted as a level. Getting the measurement wrong by even a fraction could ruin the whole project.',
      text: `The instrument had a sight at each end, and the liquid provided a dependable horizontal reference. An assistant held a marked staff farther along the proposed route while the surveyor compared its height. Repeating that procedure produced a chain of small differences. The method was slow, but it was accurate enough for channels extending far beyond the city.

Construction teams then marked the route and excavated sections simultaneously. Standard dimensions helped separate crews join their work with fewer discrepancies.`,
    },
    {
      after: 'The most important users, receiving water first, were the public fountains and baths, where ordinary people came to wash and to collect drinking water.',
      text: `Distribution tanks divided the flow between several pipes. Private houses could receive water under licence, but communal points had priority because most residents collected what they needed in containers. Continuous flow also flushed drains and supplied ornamental basins. The system therefore supported hygiene, recreation and civic display as well as drinking.

Quality varied between sources. Officials might reserve a clearer source for consumption and direct another towards gardens or cleaning. Settling chambers allowed sand to fall out before water entered the urban network.`,
    },
    {
      after: 'The official placed in overall charge of the entire water supply held the important title of curator, a highly respected public office.',
      text: `That official supervised inspectors, labourers and records of legal connections. Unauthorised pipes reduced pressure and revenue, so the administration periodically checked private properties. Written reports describe damaged channels, disputed rights and the volume expected from different sources. This bureaucracy was as necessary as the original engineering: a neglected route soon lost capacity even when no dramatic collapse occurred.`,
    },
    {
      after: 'It was not until the Renaissance that engineers in Rome began to restore them, more than a thousand years later.',
      text: `Restoration did not simply reproduce every ancient line. Engineers selected routes that could serve the contemporary population and repaired surviving sections where practical. The renewed flow supplied fountains that became symbols of the city, linking a new public programme to ancient expertise. Archaeologists still study mineral layers, tool marks and repairs inside the channels to reconstruct how particular routes operated over time.`,
    },
  ],
  '12-1': [
    {
      after: "CUSTOMER: 8 Ashgrove Avenue — that's A-S-H-G-R-O-V-E.",
      text: `AGENT: Thank you. Is that a house or a flat? We ask because permits for shared buildings sometimes need a bay number as well.

CUSTOMER: It is flat three, but each resident has a separate tenancy agreement. There is no allocated bay at the building itself.

AGENT: That's fine. Your agreement can be used as evidence that you live within the permit zone. Have you already changed the address on your vehicle registration?

CUSTOMER: I sent the form last week, although the replacement document has not arrived yet.

AGENT: Bring the old document and your tenancy agreement, and we can begin the application while you wait for the update.`,
    },
    {
      after: "CUSTOMER: The riverside one, please. Oh, sorry — no, I meant the station car park. That's the one nearest my flat.",
      text: `AGENT: Good correction. The riverside site uses a different permit and is mainly intended for people working near the market. The site you have chosen is covered by the residential scheme, and permit holders may use any unnumbered bay there.

CUSTOMER: Does having a permit guarantee a space?

AGENT: No, it gives permission to park but does not reserve a particular place. It is busiest between eight and nine on weekday mornings. After commuters leave, residents usually find spaces easily.`,
    },
    {
      after: 'CUSTOMER: On the windscreen. Got it.',
      text: `AGENT: Place it in the lower left corner where the printed date can be read from outside. If you change vehicles, do not move the old permit yourself because its number is linked to the registration. Call us and we will issue a replacement. Temporary permits for visitors are available online in books of ten.

CUSTOMER: That's useful. My parents occasionally stay for a weekend.

AGENT: A visitor permit lasts until midnight on the date written on it. It cannot be reused, so complete it only when the guest has arrived.`,
    },
    {
      after: "AGENT: When you come in, just bring a recent photo of yourself and we'll print the card while you wait.",
      text: `AGENT: The image should show your face clearly against a plain background. It need not be professionally taken, but a picture copied from an identity document is often too small. The card is personal, so another person cannot travel with it even if you are not using it that week.

CUSTOMER: Can I add money through an app?

AGENT: Yes. You can also set it to renew automatically, but that feature is optional. If the card is lost, report it through your account and the remaining balance can be transferred to a replacement.`,
    },
    {
      after: "AGENT: We have two options. The weekly card is £15, and it includes a free map of the network. The monthly card lasts thirty days and costs £58; with that one you also get discounts at a number of shops and cafés in the centre.",
      text: `CUSTOMER: Does the cheaper option begin on a Monday?

AGENT: No, it runs for seven consecutive days from the first journey, so you can activate it whenever you choose. The printed guide shows the main routes and late services. The longer option begins on the date you select at purchase, and the reduced prices at participating businesses are listed in your online account.

CUSTOMER: I will be travelling to work at least five days a week, so the longer period should save me money.

AGENT: It should. Keep the purchase receipt until you have successfully created your account. If the card fails at a gate, show it to the driver rather than repeatedly touching it against the reader.`,
    },
  ],
  '12-2': [
    {
      after: "Now, some of our old favourites are still here too — the café has been serving visitors for over twenty years, the duck pond is where it's always been, and yes, the tractor rides are running as usual, so don't worry.",
      text: `The distinction between new and returning attractions has caused some confusion on social media. The place selling produce occupies a converted machinery shed and stocks vegetables, eggs and preserves from neighbouring farms as well as our own. The indoor activity building was completed in spring and gives younger visitors somewhere dry to climb and explore. We repainted the refreshment area and repaired the pond path, but neither of those counts as a new attraction. The vehicle tour follows the same route it used last season.

Admission covers every scheduled demonstration. Purchases, refreshments and produce picked to take home are charged separately. Wristbands allow you to leave and re-enter during the event.`,
    },
    {
      after: 'All of our guided walks set off from the car park, just behind you, so please gather there.',
      text: `The meeting point is beside the blue information flag rather than at this reception area. The morning route explores the kitchen garden, while the afternoon route goes farther across the grazing land. Both take roughly forty-five minutes. The ground can be uneven, so closed shoes are recommended, and a shorter accessible route may be requested from the guide.

If a group is full, collect a ticket for the next departure instead of following at a distance. That keeps gates closed and allows the guide to answer questions safely.`,
    },
    {
      after: 'One thing you mustn\'t miss is the sheepdog display. That begins at 11, over in the top field, and it lasts about half an hour.',
      text: `Please reach the viewing rope a few minutes before the demonstration starts. The handler first explains the whistle commands and then shows how one animal can separate a small group of sheep from the flock. There is a second performance in mid-afternoon, but it may be shortened if the temperature rises. Spectators should remain quiet while the animals are working.

Afterwards, the handler will answer questions near the gate. Do not enter the working area, even when the flock appears calm.`,
    },
    {
      after: 'Next to that is the dairy. Through the window, you can watch our staff making cheese in the traditional way, and there are samples to try.',
      text: `Feeding sessions take place every hour, and a member of staff hands out the bottles. Children must stay behind the low barrier until invited forward. In the dairy demonstration, the maker explains how the milk is warmed, separated and pressed. Samples are offered only after the talk so that visitors do not miss the safety instructions.

Anyone with a food allergy should ask to see the ingredient card. The tasting pieces are made from pasteurised milk, while one mature variety displayed behind the glass is not offered to children.`,
    },
    {
      after: 'The farm closes at 5 pm today, and the car park closes shortly after, so do allow yourself plenty of time.',
      text: `The fruit area stops admitting pickers half an hour before closing so that purchases can be weighed. Meals are available throughout the event, but the kitchen takes its last hot order at four fifteen. Water points are located beside the eating area and the activity building.

For safety, animals brought by visitors must remain restrained, including in open spaces. Farm vehicles have priority on marked tracks, and adults should supervise children near gates as well as equipment. At the end of the day, announcements will direct each section towards the exit in turn to reduce congestion.`,
    },
  ],
  '12-3': [
    {
      after: 'PRIYA: Yes, completely. Once we press start, it has to make all its own decisions.',
      text: `SAM: The competition course contains several dead ends, so following one wall is not enough. The machine must recognise that a route has failed, return to the previous junction and choose another direction. We are not building an arm for carrying objects, and voice control is outside the brief.

TUTOR: Good. That makes the aim unambiguous. How will you judge success?

PRIYA: First by whether it reaches the exit without intervention, and then by the time taken. Reliability matters more than one exceptionally fast run, so we plan to compare five attempts.`,
    },
    {
      after: "PRIYA: We replaced it with an ultrasonic sensor, which measures distance using sound. It's much faster and, honestly, a lot cheaper as well.",
      text: `SAM: The camera itself was within our budget and did not add much weight. The problem appeared when the processor analysed every frame. By the time it identified an obstacle, the front wheel had already reached it. Reducing image quality helped slightly but made corners difficult to recognise.

TUTOR: So processing speed, rather than purchase price or mass, made the visual approach unsuitable.

PRIYA: Exactly. The new device returns a simple distance value almost instantly. We have mounted three of them so the machine can compare the front and both sides.`,
    },
    {
      after: "SAM: Priya is doing all the programming, and I'm concentrating on the electronics — the wiring and the motors.",
      text: `PRIYA: We discuss the overall logic together, but I write and document the software. Sam selects the components, connects them and checks that the motors receive a stable voltage. That division suits our experience.

SAM: We initially thought one of us should write the entire report, but sharing it makes more sense. I can describe the circuit and Priya can explain the algorithm. We will edit the final version together so it does not read like two unrelated documents.

TUTOR: Good. Keep a common record of decisions now; it will save time when you justify changes later.`,
    },
    {
      after: "TUTOR: Of course. My advice would be to test the robot in a simple maze first, before you try the full competition layout. You'll find the faults much more quickly.",
      text: `TUTOR: Begin with straight corridors and a single turn. Once those runs are consistent, add a dead end, then several choices. Going directly to the competition course may look efficient, but when a run fails you will not know whether the cause is sensing, steering or route selection. Another team can observe later, after you have isolated the basic faults yourselves.

PRIYA: We can build the small course from movable boards and change one feature at a time.

TUTOR: Exactly. Record the layout used for every run, otherwise the times will not be comparable.`,
    },
    {
      after: "TUTOR: I'd switch to plastic. It's lighter, and your battery will last longer.",
      text: `TUTOR: A larger shell would only add mass, and fitting another power pack would treat the symptom rather than the cause. A thin plastic panel should protect the circuit while reducing the load on the motors. Make sure it is stiff enough around the sensor mounts, since vibration there could produce inconsistent readings.

SAM: We can keep the plywood base temporarily as a drilling template, then transfer the positions to the new panel.

TUTOR: That is sensible. Weigh both versions and include the comparison in your evaluation.`,
    },
    {
      after: 'SAM: Brilliant. Thanks so much.',
      text: `TUTOR: Send a short progress note with the cost document. I need to see what has already been purchased and what remains, since funding cannot be claimed twice for the same component. In Friday's session, allow time to inspect the wiring before you run the machine at full speed.

PRIYA: We'll bring the earlier results as well, so we can show whether the changes improve consistency.

TUTOR: Good. If a run fails, record the point of failure before resetting anything. A useful evaluation explains the pattern, not merely the fastest result.`,
    },
  ],
  '12-4': [
    {
      after: 'This layer is packed with millions of specialised cells that convert light into electrical signals.',
      text: `Before those signals are created, the lens changes shape to focus an image and the pupil controls how much illumination enters. Those structures are important, but the first stage of colour coding occurs in the sensitive layer itself. Its cells are not distributed evenly: the central region used for detailed vision has a particularly dense concentration, while the edge of our vision is better at detecting movement than fine colour differences.

The electrical messages leave through the optic nerve. At the point where that nerve exits there are no receptor cells, creating a small blind spot that the visual system usually hides from our awareness.`,
    },
    {
      after: 'That is why, on a dark night, the world appears in shades of grey.',
      text: `Rods respond to very low levels of illumination and are numerous away from the centre of vision. If you look slightly to one side of a faint star, for instance, it may become easier to detect. Cones provide sharper detail as well as hue, but their lower sensitivity means that the distinction between objects can remain while their colours fade at dusk.

Moving suddenly from a bright room into darkness demonstrates the difference. Vision is poor at first, then improves over several minutes as chemical pigments recover and the more sensitive system becomes dominant.`,
    },
    {
      after: 'Every colour we perceive is produced by the eye comparing the signals from these three types, and that comparison is carried out by the brain, which interprets the mixture as a single colour.',
      text: `The labels red, green and blue are convenient simplifications. Each receptor responds across a broad, overlapping range, with a peak at one region rather than an exclusive response to a single hue. A yellow surface, for example, does not require a separate yellow receptor. It produces a particular balance in the first two channels, and the visual system interprets that pattern.

Context alters the final perception. The same patch can appear lighter or darker depending on its surroundings because the visual system compares neighbouring areas. This helps us recognise an object under changing illumination, although it also creates familiar optical illusions.`,
    },
    {
      after: 'The most frequent form is an inability to distinguish red from green, which can make everyday tasks, such as reading a map, surprisingly difficult.',
      text: `The term colour blindness can be misleading because most affected people do see many hues; particular ranges are simply difficult to separate. Severity varies according to whether a pigment is absent or responds differently. A clinical test therefore uses patterns of coloured dots rather than asking someone to name a single sample.

Good design does not rely on hue alone. A transport map can combine colour with line style, labels and symbols, while warning lights can differ in position or shape. These choices benefit people with reduced discrimination without changing the information available to other users.`,
    },
    {
      after: 'Birds, for example, have an extra type of cone and can see ultraviolet light, which is completely invisible to us.',
      text: `That additional sensitivity may help a bird identify food, select a mate or follow markings on feathers that humans cannot perceive. Other species use different solutions. Many nocturnal mammals prioritise sensitivity over a broad range of hues, and some insects detect patterns on flowers beyond human vision.

Comparing species reminds us that visible colour is not a fixed property copied directly from the environment. It is an interpretation produced from the receptors and neural processing available to a particular animal. Instruments can measure wavelengths outside our range, but measurement is different from experiencing the appearance those wavelengths might create for another species.`,
    },
  ],
};

export function expandIeltsLegacyTranscriptForSets10To12(
  setNumber: number,
  part: number,
  transcript: string,
): string {
  const key = `${setNumber}-${part}` as keyof typeof insertions;
  const partInsertions = insertions[key];
  if (!partInsertions) return transcript;

  return partInsertions.reduce((expanded, insertion) => {
    if (!expanded.includes(insertion.after)) {
      throw new Error(`IELTS legacy expansion anchor missing for Set ${setNumber}, Part ${part}: ${insertion.after}`);
    }
    return expanded.replace(insertion.after, `${insertion.after}\n\n${insertion.text}`);
  }, transcript);
}
