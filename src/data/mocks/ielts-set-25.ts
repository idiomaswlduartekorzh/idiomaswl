import type { MockExam } from '@/data/mocks/types';

const mock: MockExam = {
  "id": "set-25",
  "examSlug": "ielts",
  "title": "IELTS Academic Set 25",
  "subtitle": "Cold Kept Underground · Reading the Pavement by Touch · Can a Community Govern Data Collectively?",
  "timeMinutes": 164,
  "sections": [
    {
      "part": 1,
      "skill": "listening",
      "title": "Listening — Part 1: Everyday social dialogue: booking a home heat-loss survey in Halifax, Nova Scotia",
      "instructions": "1-6: Complete the booking form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.\n7-10: Choose the correct letter, A, B or C.",
      "transcript": "Jonah Pike: Good morning, Harbour Home Energy. Jonah speaking. We run non-invasive heat-loss surveys for tenants and owners. How can I help you today?\nMaren Caldwell: Hi. I rent an older house and one room is noticeably colder. I would like to arrange a survey before the weather becomes milder.\nJonah Pike: Certainly. I will take the booking details first and then discuss appointments. The assessor will describe likely leakage paths, but the visit is not a quotation for building work and no contractor is recommended.\nMaren Caldwell: I started the online form but was unsure whether my landlord had to complete it.\nJonah Pike: We can settle that in a moment. First, what is the property address? Please include the house number and spell the street name.\nMaren Caldwell: It is 46 Willowbank Road. That is Willowbank as one word. The postcode is B3K 2R8, not B3K 2B, which people sometimes enter.\nJonah Pike: Thank you. Our map may be out of date. What type of building are you actually in?\nMaren Caldwell: It is a duplex, with our entrance on the left. It has three storeys if you count the finished room under the roof. The two households share the central wall, although the loft room and its small dormer window belong entirely to our side.\nJonah Pike: Which area feels most uncomfortable? I need the precise room rather than the general side of the house.\nMaren Caldwell: The kitchen is cool, but the clear draught is in the upstairs bedroom. You can feel it beside the window when the wind comes from the harbour.\nJonah Pike: The assessor begins with a visual check and a thermal camera. If conditions allow, the pressure test is called a blower door test. The fan sits in an external doorway for only a short period, while the camera records where outside air is entering.\nMaren Caldwell: Nothing has to be drilled or removed, does it? The lease says I must get approval before anyone makes a permanent change to the property.\nJonah Pike: No permanent change is made. We still require the owner’s consent because doors and vents are temporarily managed during the test. Written permission is enough.\nMaren Caldwell: I have my landlord’s email saying the survey may go ahead. I can forward it today, rather than asking him to sign another form.\nJonah Pike: That will work. The report includes labelled images and practical observations. We normally send it electronically within 5 days of the visit. It separates straightforward draught sealing from larger issues that may need the owner to commission a specialist inspection.\nMaren Caldwell: Good. I am comparing times because I need quiet during scheduled work calls.\nJonah Pike: Tuesday at four was available earlier, but another customer has just taken it. Saturday at eleven remains open, although no technician can bring the pressure equipment then.\nJonah Pike: The full survey is available on Thursday at 9:30, and there is also a Thursday afternoon visit at two, when the outdoor temperature may be less useful. That morning slot is also long enough for the camera survey, pressure test and a brief explanation of the initial observations.\nMaren Caldwell: Then book Thursday at 9:30. I considered Saturday because it is convenient, but I want the complete set of checks rather than the shorter visit.\nJonah Pike: Morning is helpful mainly because the temperature difference between indoors and outdoors is usually strongest. It gives the camera a clearer contrast. We do not need extreme cold; a stable contrast is more useful than a sudden temperature change during the appointment.\nMaren Caldwell: Understood. Do I need to turn the heating off, close every vent, or do anything else before the assessor arrives?\nJonah Pike: Keep the house at its normal setting. You may leave ordinary vents alone. The useful preparation is to clear exterior walls by moving large furniture a short distance away. Please keep internal doors accessible as well, because the assessor compares pressure changes between the main rooms before checking individual windows.\nMaren Caldwell: I can move the bookcase the night before and mention the unused fireplace when the assessor comes.\nJonah Pike: Excellent. There is no deposit. After the visit, we email a secure link, and you pay online once the survey has been completed. The confirmation explains the fixed fee and states that payment does not become due if weather makes the survey unsuitable.\nMaren Caldwell: That suits me. I will reply to the confirmation with the consent email.\nJonah Pike: Done. It will arrive shortly with Thursday’s time and our telephone number.",
      "audioUrl": "/audio/ielts/ielts-listening-set-25.mp3",
      "mediaId": "ielts-set-25-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "fill",
          "id": "l-q01",
          "part": 1,
          "text": "Address: 46 ______ Road",
          "answers": [
            "Willowbank"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q02",
          "part": 1,
          "text": "Type of home: a ______",
          "answers": [
            "duplex"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q03",
          "part": 1,
          "text": "Room with the clearest draught: upstairs ______",
          "answers": [
            "bedroom"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q04",
          "part": 1,
          "text": "Pressure test: ______ test",
          "answers": [
            "blower door"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q05",
          "part": 1,
          "text": "Proof of permission: landlord’s ______",
          "answers": [
            "email"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q06",
          "part": 1,
          "text": "Report sent within: ______",
          "answers": [
            "five days",
            "5 days"
          ],
          "maxWords": 2
        },
        {
          "type": "mcq",
          "id": "l-q07",
          "part": 1,
          "text": "Which appointment does Maren book?",
          "options": [
            "Tuesday at 4:00",
            "Thursday at 9:30",
            "Saturday at 11:00"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q08",
          "part": 1,
          "text": "Why does Jonah say a morning survey is useful?",
          "options": [
            "The assessor has more equipment available.",
            "The indoor-outdoor temperature difference is usually stronger.",
            "The landlord can attend at that time."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q09",
          "part": 1,
          "text": "What preparation does Jonah ask Maren to make?",
          "options": [
            "Turn off the heating.",
            "Close all ordinary vents.",
            "Move large furniture away from exterior walls."
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q10",
          "part": 1,
          "text": "How will Maren pay for the survey?",
          "options": [
            "Online after the visit",
            "By card when booking",
            "In cash before the survey"
          ],
          "answer": 0
        }
      ]
    },
    {
      "part": 2,
      "skill": "listening",
      "title": "Listening — Part 2: Everyday social monologue: orientation at a cargo-bike lending hub in Bristol",
      "instructions": "11-14: Choose the correct rule, A-F, for each service area.\n15-20: Label the courtyard plan. Choose the correct letter, A-H.",
      "transcript": "Asha Penrose: Welcome to the East Dock cargo-bike hub. I am Asha, today’s coordinator. Before anyone rides, I will explain how the four service areas operate and then guide you around the courtyard practice circuit. Keep the printed plan upright, with the north arrow pointing away from you.\nAsha Penrose: At the check-in desk, please show your booking code. We do not keep bank cards as security. The volunteer finds your loan record, confirms an emergency contact, and gives you the numbered key for the assigned bike.\nAsha Penrose: The battery locker is beside the staff office. Members sometimes assume they can collect a spare themselves, but that space is staff only. Ask at the desk if the charge seems low; a volunteer will exchange the unit.\nAsha Penrose: The loading bay has floor scales. Weigh the cargo before loading it, then place heavier items low and centrally. Tighten the straps only after the load is balanced, because different models distribute weight differently.\nAsha Penrose: At the child-seat station, begin with the demonstration doll, even if you regularly use another bicycle. The instructor checks the buckle height and foot guards. No child enters the circuit until that fitting exercise is complete.\nAsha Penrose: Now turn to the courtyard plan. You enter through the gate along the southern edge. A red post box stands immediately to your right, but it belongs to the neighbouring depot and is outside our route. Keep the check-in building on your left and walk past its projecting corner. The cabinet is fixed there, immediately past the building corner. Notice that this is before the first crossing, not beside the gate itself.\nAsha Penrose: From the cabinet, follow the one-way arrows across the bottom of the courtyard. You pass the near side of the helmet rack, but do not stop there because its access point faces the opposite direction. Continue until the outer wall turns north. The rainwater tap is mounted at the far south-east corner, directly on that turn.\nAsha Penrose: Next, turn north beside the painted bicycle symbol. A wide storage door appears on your left and normally remains locked. Look across the route rather than beside the door: the repair stand is on the inner wall directly opposite that storage door. Today you will practise lifting only the front wheel while a volunteer steadies the bicycle.\nAsha Penrose: Continue around the top of the courtyard until you see the striped rectangle that represents the loading bay described earlier. The helmet rack is just beyond the striped loading bay, still along the northern edge, where riders can stop without blocking the scales.\nAsha Penrose: After choosing a helmet, follow the curve around the child-seat loop. A small waiting shelter stands inside that loop. It is a landmark, not one of the destinations named in your questions. The battery-return hatch is fixed to the shelter’s outer wall, on the eastern side where riders can reach it without entering the seating area.\nAsha Penrose: The arrows next lead south between two large planters. Keep past the blue staff-room door and within the marked line. Do not leave the circuit at that door: it belongs to staff and is not a public exit. Continue until the path turns.\nAsha Penrose: Two other marked points on the plan help you orient yourself: one is beside the covered drain in the north-east corner, and the other is by that old delivery bell on the west wall. Neither is a destination in this exercise. They remain visible because, on a real circuit, you must distinguish a landmark that you pass from the place where you are asked to stop.\nAsha Penrose: During the circuit, use the lowest assistance setting and leave one bicycle length between riders. Practise a straight stop before turning with a load. If the bike leans, put both feet down; this exercise is about control. On the second circuit, the observer should watch whether the rider checks over a shoulder before moving away from each station, rather than judging speed.\nAsha Penrose: Finally, loans remain within the marked city zone shown on your membership card. Before departure, check the brakes, tyre condition, straps and lights with a volunteer. Report a fault instead of adjusting electrical parts yourself, and return through the exit gate at the agreed time. If your planned route changes, you do not need permission, provided the bicycle remains inside the zone and you meet the booked return time.\nAsha Penrose: We will now form pairs. One person walks the first circuit while the other observes the arrows, and then you exchange roles. Leave the bicycles on their stands until a volunteer calls your pair, so the first group has room to practise the turn by the shelter. When both riders have completed the circuit, follow the southbound path beyond the planters. The exit gate is at the boundary with the quiet service lane. Stop before the line, check for pedestrians and leave only when the lane is clear.",
      "audioUrl": "/audio/ielts/ielts-listening-set-25.mp3",
      "mediaId": "ielts-set-25-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "mcq",
          "id": "l-q11",
          "part": 2,
          "text": "What rule applies at the check-in desk?",
          "options": [
            "Weigh the cargo before loading it.",
            "Show the booking code.",
            "Leave a bank card as security.",
            "Begin with the demonstration doll.",
            "Ask staff to access this area.",
            "Bring your own tools."
          ],
          "answer": 1,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q12",
          "part": 2,
          "text": "What rule applies at the battery locker?",
          "options": [
            "Weigh the cargo before loading it.",
            "Show the booking code.",
            "Leave a bank card as security.",
            "Begin with the demonstration doll.",
            "Ask staff to access this area.",
            "Bring your own tools."
          ],
          "answer": 4,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q13",
          "part": 2,
          "text": "What rule applies at the loading bay?",
          "options": [
            "Weigh the cargo before loading it.",
            "Show the booking code.",
            "Leave a bank card as security.",
            "Begin with the demonstration doll.",
            "Ask staff to access this area.",
            "Bring your own tools."
          ],
          "answer": 0,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q14",
          "part": 2,
          "text": "What rule applies at the child-seat station?",
          "options": [
            "Weigh the cargo before loading it.",
            "Show the booking code.",
            "Leave a bank card as security.",
            "Begin with the demonstration doll.",
            "Ask staff to access this area.",
            "Bring your own tools."
          ],
          "answer": 3,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q15",
          "part": 2,
          "text": "Which location marks the first-aid cabinet?",
          "options": [
            "Location A on the courtyard plan",
            "Location B on the courtyard plan",
            "Location C on the courtyard plan",
            "Location D on the courtyard plan",
            "Location E on the courtyard plan",
            "Location F on the courtyard plan",
            "Location G on the courtyard plan",
            "Location H on the courtyard plan"
          ],
          "answer": 5,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q16",
          "part": 2,
          "text": "Which location marks the rainwater tap?",
          "options": [
            "Location A on the courtyard plan",
            "Location B on the courtyard plan",
            "Location C on the courtyard plan",
            "Location D on the courtyard plan",
            "Location E on the courtyard plan",
            "Location F on the courtyard plan",
            "Location G on the courtyard plan",
            "Location H on the courtyard plan"
          ],
          "answer": 2,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q17",
          "part": 2,
          "text": "Which location marks the repair stand?",
          "options": [
            "Location A on the courtyard plan",
            "Location B on the courtyard plan",
            "Location C on the courtyard plan",
            "Location D on the courtyard plan",
            "Location E on the courtyard plan",
            "Location F on the courtyard plan",
            "Location G on the courtyard plan",
            "Location H on the courtyard plan"
          ],
          "answer": 7,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q18",
          "part": 2,
          "text": "Which location marks the helmet rack?",
          "options": [
            "Location A on the courtyard plan",
            "Location B on the courtyard plan",
            "Location C on the courtyard plan",
            "Location D on the courtyard plan",
            "Location E on the courtyard plan",
            "Location F on the courtyard plan",
            "Location G on the courtyard plan",
            "Location H on the courtyard plan"
          ],
          "answer": 0,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q19",
          "part": 2,
          "text": "Which location marks the battery-return hatch?",
          "options": [
            "Location A on the courtyard plan",
            "Location B on the courtyard plan",
            "Location C on the courtyard plan",
            "Location D on the courtyard plan",
            "Location E on the courtyard plan",
            "Location F on the courtyard plan",
            "Location G on the courtyard plan",
            "Location H on the courtyard plan"
          ],
          "answer": 3,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        },
        {
          "type": "mcq",
          "id": "l-q20",
          "part": 2,
          "text": "Which location marks the exit gate?",
          "options": [
            "Location A on the courtyard plan",
            "Location B on the courtyard plan",
            "Location C on the courtyard plan",
            "Location D on the courtyard plan",
            "Location E on the courtyard plan",
            "Location F on the courtyard plan",
            "Location G on the courtyard plan",
            "Location H on the courtyard plan"
          ],
          "answer": 6,
          "imageUrl": "/assets/ielts/listening/set25-part2-map.svg",
          "imageAlt": "A rectangular depot courtyard with a southern entrance, one-way clockwise arrows and eight lettered locations A to H. Fixed non-answer landmarks include a post box, storage door, loading-bay stripes, a waiting shelter, two planters and a staff-room door. The alt text does not identify the six answers."
        }
      ]
    },
    {
      "part": 3,
      "skill": "listening",
      "title": "Listening — Part 3: Educational discussion: trainee pharmacists review incomplete simulated handover cards in Glasgow",
      "instructions": "21-25: Choose the correct response, A-G, for each handover problem.\n26-30: Choose the correct letter, A, B or C.",
      "transcript": "Iona Kerr: We have five simulated handover cards to reconcile before tomorrow’s assessed session. I thought we could correct the obvious errors tonight and leave only the difficult ones for the facilitator.\nLewis Muir: That is my concern. The exercise tests how we respond to incomplete sources, not whether we can make the cards look tidy by guessing what was intended.\nIona Kerr: Card One has a complete medicine list but a blank allergy field. At first I copied “no known allergies” from the previous practice case, then realised that record belonged to a different fictional patient.\nLewis Muir: We could ask the actor at the start, though the brief says the actor may not have every source detail.\nIona Kerr: Then we should pause and request the missing source from the facilitator. We can mark the field as unresolved while we wait, and the log should show who requested it.\nLewis Muir: Card Two is different. The admission list gives ten milligrams, while the simulated discharge note gives five.\nIona Kerr: Exactly. We should record both values and escalate before merging the lists. The discrepancy itself is important evidence, so the final training record should retain both doses, their sources and the unresolved status.\nLewis Muir: On Card Three the medicine name is partly illegible. The ending resembles a familiar product and the dose looks plausible, but that combination could fit more than one item. We should request a clearer source instead of inferring the name, and note exactly which document cannot be read.\nIona Kerr: Agreed. We can describe the location of the unclear entry without offering a possible name, because even a tentative suggestion could influence the person who checks it next.\nLewis Muir: Card Four lists prescribed medicines but says nothing about non-prescription products. We should ask a structured question in the simulated interview, including prompts about painkillers, herbal products and supplements.\nIona Kerr: Yes, and the wording should stay neutral. We can ask what the person takes without suggesting that a particular product is expected.\nLewis Muir: The final card places a brand name and a generic name on separate lines. Their tablet descriptions differ, so they look like two medicines, but we should check the active ingredient before we classify a duplication.\nIona Kerr: That gives us five different responses rather than one blanket rule. Missing source, conflicting doses, illegible name, absent interview detail and possible duplication each need a distinct action.\nLewis Muir: For tomorrow’s sequence, I originally suggested starting with the medicine list because it is the longest section and would get us moving.\nIona Kerr: So our first action must be to confirm the simulated patient’s identity across all three sources. Only after the identifiers agree do we compare medicines.\nLewis Muir: Now the escalation log. Colour coding may make serious discrepancies stand out on screen, but it creates printing and accessibility problems and still leaves responsibility unclear. Each entry needs an owner, initials and a time, together with the source involved, so another trainee can see who must follow it up.\nIona Kerr: We could retain a small priority symbol as a secondary aid, provided the text carries the meaning. The owner field matters more because a red box with nobody assigned can remain untouched. I will also include a status column so open items are not confused with resolved ones.\nLewis Muir: What about interview roles? One option is for the more confident speaker to lead all five cases while the other checks documents. That would make the delivery consistent, but it would give the observer almost no practice and could make one style seem like the only acceptable approach.\nIona Kerr: Let us alternate the lead after each case. The observer can use the same checklist, note anything that needs clarification, and wait until a natural pause before contributing. Alternating gives us comparable experience without turning the interview into two people competing to ask the next question.\nLewis Muir: For the debrief, I do not want to focus on the total number of mistakes. A count can show that the cards differed, but it cannot explain why one assumption was unsafe or why we chose escalation in one case and a structured interview question in another.\nIona Kerr: Then the main focus should be the reasoning behind each decision. We can select two contrasting cases and explain the evidence we had, the tempting shortcut we rejected and what information changed the outcome. That will reveal judgement more clearly than either speed or a bar chart of errors.\nLewis Muir: We also need to decide what evidence to retain. The final reconciled list shows the outcome, and screenshots preserve its appearance, but neither tells a later reviewer which source contained the discrepancy or why an entry was changed. A neat final page could therefore conceal a weak process.\nIona Kerr: A later reviewer must reconstruct why an entry changed. The final list plus a brief comment might not show the original source, the discrepancy or the action that followed. We need a record that makes that sequence visible without relying on memory.\nLewis Muir: I agree. Screenshots preserve appearance but not which source supported a decision. I will prepare the role rotation and neutral checklist, and label every page as simulation material. None of these entries can support a real clinical decision; that boundary belongs on the documents.\nIona Kerr: Then we will retain an audit trail linking each source, discrepancy and action, together with the person and time associated with the decision. I will test whether another trainee can reconstruct one case using only that log. Tomorrow we also confirm identity first, keep uncertainties visible, alternate the lead and explain our reasoning in the debrief.\nLewis Muir: That gives the assessor evidence of safe process as well as communication. I will send the revised plan tonight and ask the facilitator only for source documents we genuinely need, rather than asking for decisions that belong to us.",
      "audioUrl": "/audio/ielts/ielts-listening-set-25.mp3",
      "mediaId": "ielts-set-25-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "mcq",
          "id": "l-q21",
          "part": 3,
          "text": "Choose the agreed response when the allergy field is blank.",
          "options": [
            "Record both values and escalate before merging the lists.",
            "Use the most recent value without further action.",
            "Ask a structured question in the simulated interview.",
            "Pause and request the missing source from the facilitator.",
            "Mark the item as not applicable.",
            "Request a clearer source instead of inferring the name.",
            "Check the active ingredient before classifying a duplication."
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "l-q22",
          "part": 3,
          "text": "Choose the agreed response when the two different doses are recorded.",
          "options": [
            "Record both values and escalate before merging the lists.",
            "Use the most recent value without further action.",
            "Ask a structured question in the simulated interview.",
            "Pause and request the missing source from the facilitator.",
            "Mark the item as not applicable.",
            "Request a clearer source instead of inferring the name.",
            "Check the active ingredient before classifying a duplication."
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q23",
          "part": 3,
          "text": "Choose the agreed response when the medicine name is partly illegible.",
          "options": [
            "Record both values and escalate before merging the lists.",
            "Use the most recent value without further action.",
            "Ask a structured question in the simulated interview.",
            "Pause and request the missing source from the facilitator.",
            "Mark the item as not applicable.",
            "Request a clearer source instead of inferring the name.",
            "Check the active ingredient before classifying a duplication."
          ],
          "answer": 5
        },
        {
          "type": "mcq",
          "id": "l-q24",
          "part": 3,
          "text": "Choose the agreed response when the non-prescription products are absent.",
          "options": [
            "Record both values and escalate before merging the lists.",
            "Use the most recent value without further action.",
            "Ask a structured question in the simulated interview.",
            "Pause and request the missing source from the facilitator.",
            "Mark the item as not applicable.",
            "Request a clearer source instead of inferring the name.",
            "Check the active ingredient before classifying a duplication."
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q25",
          "part": 3,
          "text": "Choose the agreed response when the brand and generic names may duplicate one medicine.",
          "options": [
            "Record both values and escalate before merging the lists.",
            "Use the most recent value without further action.",
            "Ask a structured question in the simulated interview.",
            "Pause and request the missing source from the facilitator.",
            "Mark the item as not applicable.",
            "Request a clearer source instead of inferring the name.",
            "Check the active ingredient before classifying a duplication."
          ],
          "answer": 6
        },
        {
          "type": "mcq",
          "id": "l-q26",
          "part": 3,
          "text": "What do the trainees agree should be their first action?",
          "options": [
            "Arrange the medicine list by length",
            "Confirm the simulated patient’s identity",
            "Correct the most obvious dose"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q27",
          "part": 3,
          "text": "How will they improve the escalation log?",
          "options": [
            "Add colour coding only",
            "Replace all comments with screenshots",
            "Record an owner, initials and a time for each entry"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q28",
          "part": 3,
          "text": "How will they divide the interview work?",
          "options": [
            "Alternate the lead after each case",
            "Let one trainee lead all five cases",
            "Ask the facilitator to conduct the interviews"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q29",
          "part": 3,
          "text": "What will be the main focus of their debrief?",
          "options": [
            "The total number of mistakes",
            "The reasoning behind their decisions",
            "The speed of each interview"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q30",
          "part": 3,
          "text": "What evidence will they retain?",
          "options": [
            "Only the final reconciled list",
            "Photographs of the training room",
            "An audit trail linking sources, discrepancies and actions"
          ],
          "answer": 2
        }
      ]
    },
    {
      "part": 4,
      "skill": "listening",
      "title": "Listening — Part 4: Academic monologue: serotinous seed release and post-fire recruitment in Melbourne",
      "instructions": "31-36: Complete the sentences. Write ONE WORD ONLY for each answer.\n37-40: Answer the questions. Write NO MORE THAN TWO WORDS for each answer.",
      "transcript": "Lecturer: Today we examine serotiny, a strategy in which a plant retains mature seeds instead of releasing them immediately. In several fire-prone shrubs and trees, the seeds remain above ground in a canopy seed bank, enclosed within woody cones or follicles.\nLecturer: Retention depends on structure. In many examples, the valves surrounding a seed are held shut by resin. Ordinary warmth may not open the fruit. During a fire, however, a stronger heat pulse causes the resin to soften and the dry valves separate. Species vary, so this is not a universal rule for every serotinous plant. This threshold is commonly described as heat-triggered opening, but researchers measure it across a range rather than assuming a single temperature applies to every fruit.\nLecturer: Thick woody walls shield the seed during brief heating, and air spaces within the fruit reduce direct exposure. Protection has limits: an exceptionally severe fire can kill seeds, while old fruits may no longer seal them effectively. Retained seed number and viability are therefore separate measurements. Moisture content also matters: a dry structure can transmit heat differently from one exposed to recent rain, so comparable trials record both heating conditions and fruit state.\nLecturer: Opening is often delayed until the fruit cools. By then, fire may have removed foliage around the parent and created more exposed ground. Dry winds can then carry light, often winged seeds away. This does not guarantee a long journey; it only places release when movement and landing may be favourable.\nLecturer: Fire consumes litter unevenly, exposing patches of mineral soil. That surface can give small seeds firmer contact than a deep layer of leaves. Ash may return minerals to the upper soil, although it is not a complete fertiliser and not every species benefits. Small depressions in that mineral surface may trap seed, whereas exposed ridges can lose it to wind or runoff before roots develop.\nLecturer: Light conditions also change. Canopy removal reduces shade and temporarily lowers competition. The same opening can raise surface temperatures and water loss. Recruitment therefore depends on interacting light, moisture and temperature, and rain arriving soon after release may be decisive. Thus an open patch offers opportunity and stress at the same time; the balance can change within days as weather and neighbouring vegetation respond.\nLecturer: Researchers compare several stages. They count closed and open fruits, test extracted seeds under controlled conditions, and after a burn establish plots and make seedling counts. Repeated counts matter because initial germination may be followed by high mortality in the first dry season. Researchers often tag the same plots so that emergence, early survival and later establishment are not confused as if they were a single measure.\nLecturer: The age of the parent population creates another limit. If fires return too frequently, young plants may burn before reaching maturity and replenishing the canopy store. Each event can then leave fewer seeds than the one before. At the opposite extreme, very long intervals may allow fruits to deteriorate, predators to remove seed, or adult plants to die without a suitable release event. The important interval is therefore biological, not simply chronological: it must allow enough adults to reproduce and enough viable seed to accumulate before the next disturbance.\nLecturer: The phrase “adapted to fire” needs qualification. Serotiny can improve reproductive timing under a particular regime, but it does not make a plant resistant to every intensity or frequency. Stored seed and post-fire weather must together permit population replacement.\nLecturer: Spatial variation is equally important. One slope may burn completely while a neighbouring hollow remains patchy. Fruits on the unburned plant may stay closed, yet seeds released from a burned edge can travel into both areas. Sampling only the blackened centre could therefore overstate the uniformity of opening and miss the contribution of nearby surviving adults. A sound design samples across that gradient and records burn severity at each point, allowing dispersal and local opening to be interpreted separately.\nLecturer: Scientists can separate heat effects from smoke or chemical cues in experiments, but field interpretation remains cautious. A laboratory oven controls temperature precisely while excluding wind, flame and changing humidity. A field fire includes all of these. Method agreement across laboratory tests, field fruit counts and later recruitment surveys is stronger evidence than one method alone. The comparison is strongest when each method tests a clearly stated stage, such as valve opening, seed viability, arrival at the ground or establishment.\nLecturer: There are also evolutionary questions. Retaining seed carries costs because the plant invests in protective structures and risks losing several years of reproduction in one destructive event. The benefit is concentrated release into a relatively open seedbed. Whether that trade-off is favourable depends on the historical pattern of fire and on how reliably new plants establish afterward. In other words, the strategy shifts risk through time: many small release events are replaced by a stored investment that may meet one unusually favourable disturbance.\nLecturer: Climate change can affect both sides of the sequence. Hotter droughts may reduce seed production before a fire, while altered fire seasons can change the interval between burns. Heavy rain after release may support emergence, but intense runoff can also move ash and seed away from suitable microsites. Predictions should therefore state which stage of the life cycle a climate effect concerns. Models that combine all these effects into a single “fire benefit” can therefore hide opposing pressures on production, release, movement and survival.\nLecturer: For assessment, remember the chain rather than a slogan: a canopy store accumulates; heat may soften resin; woody walls provide partial protection; the fruit opens; dry winds assist dispersal; and exposed ground receives the seed. Ash can add minerals, while canopy removal changes light and competition. None of those steps alone demonstrates successful population recovery.\nLecturer: The final evidence must extend beyond emergence. Researchers return to marked plots for follow-up seedling counts after the first seasonal stress, then compare survival with fruit and germination data. That longer record shows whether the apparent reproductive opportunity produced established young plants rather than only a brief carpet of seedlings. Establishment is usually defined by a pre-declared survival point, so investigators do not select a convenient date after seeing the result.\nLecturer: Serotiny is therefore best understood as conditional timing. It links stored reproduction to disturbance, but its outcome remains bounded by fire severity, fire interval, weather, seedbed variation and survival after germination.",
      "audioUrl": "/audio/ielts/ielts-listening-set-25.mp3",
      "mediaId": "ielts-set-25-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "fill",
          "id": "l-q31",
          "part": 4,
          "text": "Seeds can remain in a ______ seed bank above the ground.",
          "answers": [
            "canopy"
          ],
          "maxWords": 1
        },
        {
          "type": "fill",
          "id": "l-q32",
          "part": 4,
          "text": "In many fruits, valves are held shut by ______.",
          "answers": [
            "resin"
          ],
          "maxWords": 1
        },
        {
          "type": "fill",
          "id": "l-q33",
          "part": 4,
          "text": "A strong heat pulse causes this material to ______.",
          "answers": [
            "soften"
          ],
          "maxWords": 1
        },
        {
          "type": "fill",
          "id": "l-q34",
          "part": 4,
          "text": "Fire may create more ______ ground around the parent plant.",
          "answers": [
            "exposed"
          ],
          "maxWords": 1
        },
        {
          "type": "fill",
          "id": "l-q35",
          "part": 4,
          "text": "Ash may return ______ to the upper soil.",
          "answers": [
            "minerals"
          ],
          "maxWords": 1
        },
        {
          "type": "fill",
          "id": "l-q36",
          "part": 4,
          "text": "Frequent fires may occur before young plants reach ______.",
          "answers": [
            "maturity"
          ],
          "maxWords": 1
        },
        {
          "type": "fill",
          "id": "l-q37",
          "part": 4,
          "text": "Which moving-air factor is excluded from a laboratory oven?",
          "answers": [
            "wind"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q38",
          "part": 4,
          "text": "What provides stronger evidence than one method alone?",
          "answers": [
            "method agreement"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q39",
          "part": 4,
          "text": "What structures require reproductive investment?",
          "answers": [
            "protective structures"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q40",
          "part": 4,
          "text": "What repeated field evidence is needed after seasonal stress?",
          "answers": [
            "seedling counts"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 5,
      "skill": "reading",
      "title": "Academic Reading — Passage 1: Cold Kept Underground",
      "passageTitle": "Cold Kept Underground",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A Before mechanical refrigeration, keeping ice through summer was less a problem of making cold than of slowing the arrival of heat. A store had to hold a material that was moving towards the temperature of its surroundings. Thick walls alone could not solve every difficulty. Warm air travelled through doors, moisture weakened insulation, and meltwater could transfer heat back to the remaining blocks. The most successful ice houses therefore worked as systems in which location, shape, packing, access and drainage supported one another. Their design reveals how builders balanced the opposing demands of preservation and practical use.\n\nB At Downhill, the ice house was built into sloping ground, using the site to shelter the chamber. Its passage led to a doorway, and the surviving description notes that a second door may once have stood within the passage. The chamber narrowed towards its base and incorporated a drain or sump, details that helped separate stored ice from meltwater. Pond ice was packed inside and insulated with straw. The record describes the structure as a combined ice house and dovecote, built in the late eighteenth century. It documents this individual estate example rather than a general rule for other nearby sites in Britain.\n\nC The supply was usually gathered during winter. Workers cut ice from ponds or collected compacted snow where the climate allowed it, then transported the load quickly to the store. Inside, pieces were broken and pressed together so that large air gaps disappeared. Straw could be placed around the mass and between it and the walls, limiting contact with warmer surfaces. The process was labour intensive, and a mild winter could reduce the harvest. Because the material gradually melted even in a well-made house, managers often filled more space than later consumption required. The reserve served kitchens, medical care and the preservation of food.\n\nD A typical chamber narrowed towards its base and was enclosed by several barriers. Brick or stone provided strength, while cavities or dry packing reduced heat transfer. Above, a vaulted roof carried the soil mound and kept the storage space dark. Access rarely led straight from outdoors to the ice. A passage and two doors created an air lock, so that one barrier could remain closed while a person entered through the other. The doorways were often small, and some stores were loaded from an upper opening. These inconveniences were purposeful: every wide opening created a route by which warm summer air could replace the cooler air inside.\n\nE Drainage was as important as insulation. Water at the bottom of the chamber had to leave through a drain or sump without allowing a steady current of outside air to return along the same route. If meltwater remained, it surrounded the stored mass with liquid that could carry heat efficiently and encouraged damage to masonry. A floor that sloped towards an outlet helped separate the surviving ice from the water it had already lost. Designers sometimes included a trap or narrow channel to limit airflow. The detail was modest, but its failure could undermine the expensive walls and careful packing above it.\n\nF The estate ice house was not the only form. Growing cities created a commercial trade in natural ice, and urban stores could be much larger. At the London site now associated with the Canal Museum, deep wells held imported ice delivered by ships from Norway for city customers. Scale altered the organisation of labour and distribution, but not the central physics: a compact mass, insulation, restricted access and managed drainage reduced loss. Commercial operators also had to move stock regularly, so circulation routes could not be reduced indefinitely. The building became a compromise between minimum exposure and the speed required to supply customers.\n\nG Many surviving structures are puzzling when seen without their former setting. A brick-lined pit may have lost its doors, roof covering or drain, while an urban well can be hidden beneath later construction. Archaeological and estate records help identify how the parts once connected. They also warn against treating every round underground chamber as an ice house: evidence of access, water removal and association with a residence or trade strengthens the interpretation. What remains is therefore both a technical object and a record of seasonal work. Its value lies not in a single ingenious feature, but in the coordinated control of heat, air and water.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q01",
          "part": 5,
          "text": "Question 1",
          "options": [
            "Why water had to leave",
            "How ice was collected and packed",
            "The problem created by two competing demands",
            "What survives and what records reveal",
            "From private estate to commercial scale",
            "Using location as part of the cooling system",
            "A sequence of barriers against heat",
            "Materials that distinguished urban and rural stores"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q02",
          "part": 5,
          "text": "Question 2",
          "options": [
            "Why water had to leave",
            "How ice was collected and packed",
            "The problem created by two competing demands",
            "What survives and what records reveal",
            "From private estate to commercial scale",
            "Using location as part of the cooling system",
            "A sequence of barriers against heat",
            "Materials that distinguished urban and rural stores"
          ],
          "answer": 5
        },
        {
          "type": "mcq",
          "id": "r-q03",
          "part": 5,
          "text": "Question 3",
          "options": [
            "Why water had to leave",
            "How ice was collected and packed",
            "The problem created by two competing demands",
            "What survives and what records reveal",
            "From private estate to commercial scale",
            "Using location as part of the cooling system",
            "A sequence of barriers against heat",
            "Materials that distinguished urban and rural stores"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q04",
          "part": 5,
          "text": "Question 4",
          "options": [
            "Why water had to leave",
            "How ice was collected and packed",
            "The problem created by two competing demands",
            "What survives and what records reveal",
            "From private estate to commercial scale",
            "Using location as part of the cooling system",
            "A sequence of barriers against heat",
            "Materials that distinguished urban and rural stores"
          ],
          "answer": 6
        },
        {
          "type": "mcq",
          "id": "r-q05",
          "part": 5,
          "text": "Question 5",
          "options": [
            "Why water had to leave",
            "How ice was collected and packed",
            "The problem created by two competing demands",
            "What survives and what records reveal",
            "From private estate to commercial scale",
            "Using location as part of the cooling system",
            "A sequence of barriers against heat",
            "Materials that distinguished urban and rural stores"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q06",
          "part": 5,
          "text": "Question 6",
          "options": [
            "Why water had to leave",
            "How ice was collected and packed",
            "The problem created by two competing demands",
            "What survives and what records reveal",
            "From private estate to commercial scale",
            "Using location as part of the cooling system",
            "A sequence of barriers against heat",
            "Materials that distinguished urban and rural stores"
          ],
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "r-q07",
          "part": 5,
          "text": "Question 7",
          "options": [
            "Why water had to leave",
            "How ice was collected and packed",
            "The problem created by two competing demands",
            "What survives and what records reveal",
            "From private estate to commercial scale",
            "Using location as part of the cooling system",
            "A sequence of barriers against heat",
            "Materials that distinguished urban and rural stores"
          ],
          "answer": 3
        },
        {
          "type": "fill",
          "id": "r-q08",
          "part": 5,
          "text": "The Downhill ice house was built into ____.",
          "answers": [
            "sloping ground",
            "ground"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q09",
          "part": 5,
          "text": "In winter, much of the ice placed in country stores was cut from ____.",
          "answers": [
            "ponds"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q10",
          "part": 5,
          "text": "Workers used ____ around the stored mass to reduce contact with warmer surfaces.",
          "answers": [
            "straw"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q11",
          "part": 5,
          "text": "A passage with two doors formed an ____ at the entrance.",
          "answers": [
            "air lock"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q12",
          "part": 5,
          "text": "Water could be directed away through a drain or a ____.",
          "answers": [
            "sump"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q13",
          "part": 5,
          "text": "Imported ice held in London's deep wells was delivered by ____ from Norway.",
          "answers": [
            "ships"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 6,
      "skill": "reading",
      "title": "Academic Reading — Passage 2: Reading the Pavement by Touch",
      "passageTitle": "Reading the Pavement by Touch",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A Tactile paving is a system of raised surface patterns intended to communicate through the feet or a long cane. Its usefulness depends on a shared vocabulary. A change underfoot should indicate a particular condition, not merely decorate the pavement. Public guidance therefore distinguishes warning surfaces from directional ones and specifies where each should begin and end. Consistency matters because a pedestrian may encounter the same pattern in an unfamiliar town. Yet a technical drawing cannot guarantee an identical experience for every user. Footwear, cane technique, previous training, traffic noise and the condition of the paving all influence what can be detected and how quickly its meaning is understood.\n\nB At a pedestrian crossing, a blister pattern can warn that the footway is ending where there may be no continuous kerb to mark the boundary. Guidance combines this tactile cue with careful placement and, where practicable, visual contrast. The colour is not treated as a substitute for the raised pattern, because some users rely on touch and some have limited rather than no sight. The layout must also distinguish controlled from uncontrolled crossings without forcing the pedestrian towards moving traffic. A surface that is correctly manufactured but positioned at the wrong edge communicates confidently in the wrong place. This is why placement is part of the message rather than a finishing detail.\n\nC Research on tactile-foot stimulation helps explain both the promise and the limits of such cues. Experiments show that information delivered through the sole can assist navigation, but performance depends on the pattern, the task and the participant. Laboratory studies can isolate detection from street noise, time pressure and divided attention; field observation captures those complications but makes causes harder to separate. Neither approach alone establishes that all patterns are equally easy to recognise. The strongest evidence comes from comparing methods and asking whether a measured difference would matter during an actual journey. Researchers also need enough varied participants before drawing conclusions about a population with diverse sensory experience.\n\nD Directional ribs are designed to guide movement along a route, especially where ordinary boundaries such as a building line or kerb are absent. Their orientation is therefore part of the message. If ribs point towards an obstruction, fade into another surface or cross a warning pattern ambiguously, a detectable cue may still mislead. The problem becomes sharper in shared streets, where designers sometimes remove conventional kerbs to create a visually continuous space. What appears open and calm to a sighted planner may provide fewer reliable edges to a cane user. Reduced vehicle speed can be beneficial, but it does not eliminate the need for legible pedestrian information. Continuity matters because one reliable cue may lead directly into a section that provides none.\n\nE Interpretation is also learned. A traveller familiar with one national system may not immediately understand a pattern assigned a different meaning elsewhere. Within one city, inconsistent use can have a similar effect. Training can improve recognition, yet it is unreasonable to make safe movement depend on specialist instruction that visitors have not received. Designers should instead preserve a limited set of distinct messages and avoid using the same texture for landscaping. Consultation adds another layer of evidence: users can explain where a cue feels clear, while observation may reveal hesitation that an interview alone misses. Familiarity can aid speed, but predictable design reduces the amount of familiarity a journey demands.\n\nF Performance changes after installation. Raised blisters and ribs can wear down, become obscured by repair material or be interrupted by street furniture. Poor drainage may leave water or debris over the pattern, and temporary works may redirect pedestrians without extending the tactile route. These are not cosmetic defects. They can reduce contrast, weaken cane feedback or break the sequence on which interpretation relies. Maintenance records should consequently identify tactile surfaces as functional assets, not ordinary paving. Inspection is most useful when it checks the continuity and meaning of a route rather than counting isolated slabs. Repair teams must understand that replacing a slab can change a route's intended message.\n\nG A sound assessment begins with the journey, not the product catalogue. It traces where a pedestrian receives advance warning, chooses a direction, crosses a vehicle path and finds the next dependable boundary. Technical compliance remains necessary, but designers should test whether separate elements form a coherent chain. This requires early involvement from people with different visual impairments, followed by field checking and scheduled maintenance. Evidence does not support a claim that tactile paving removes every hazard. It supports a narrower conclusion: standardised, well-placed and maintained cues can increase usable information, whereas inconsistent signals may create confidence without dependable guidance. This systems view turns separate specifications into an assessment of usable information.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q14",
          "part": 6,
          "text": "Official guidance distinguishes raised patterns by appearance but not by the message they carry.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q15",
          "part": 6,
          "text": "A blister pattern may warn pedestrians where a footway meets a crossing without a continuous kerb.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q16",
          "part": 6,
          "text": "Visual contrast is presented as an adequate substitute for the raised pattern.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q17",
          "part": 6,
          "text": "The study participants had received mobility training before the experiments.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q18",
          "part": 6,
          "text": "Directional ribs can become misleading when their orientation is wrong.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q19",
          "part": 6,
          "text": "Reduced vehicle speed is presented as a reason to omit legible pedestrian cues in shared streets.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q20",
          "part": 6,
          "text": "Maintenance records for tactile routes are normally updated after surface repairs.",
          "options": [
            "TRUE",
            "FALSE",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q21",
          "part": 6,
          "text": "a reason why a tactile message should remain recognisable in different places",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q22",
          "part": 6,
          "text": "examples of damage or obstruction that can weaken an installed route",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 5
        },
        {
          "type": "mcq",
          "id": "r-q23",
          "part": 6,
          "text": "a warning that visitors may not know a locally used meaning",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "r-q24",
          "part": 6,
          "text": "a comparison of what laboratory and street research can reveal",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q25",
          "part": 6,
          "text": "an explanation of why removing familiar street edges can create uncertainty",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q26",
          "part": 6,
          "text": "a recommendation to assess a connected journey rather than isolated products",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G"
          ],
          "answer": 6
        }
      ]
    },
    {
      "part": 7,
      "skill": "reading",
      "title": "Academic Reading — Passage 3: Can a Community Govern Data Collectively?",
      "passageTitle": "Can a Community Govern Data Collectively?",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A Local authorities, researchers and charities increasingly combine data to plan services. The attraction is clear: information collected for transport, housing or health may reveal needs that no single institution can see. The difficulty is that a technically useful link can still be socially unacceptable. Calling the arrangement a data trust does not settle that problem. The term is used for several legal and organisational forms, and a label cannot create accountability by itself. A credible initiative must begin with a defined public purpose, identify the people who may be affected and explain why shared governance is preferable to an ordinary contract. Structure should follow the problem rather than supply it with an impressive name.\n\nB Community involvement is often promised through an advisory panel, but advice without influence can become ceremonial. Representatives need a clear route into decisions about access, acceptable uses and the distribution of benefits. Selection also matters. The residents easiest to recruit may already be comfortable with institutions, while people most exposed to surveillance or exclusion remain absent. Perfect representation is impossible, but the trust can publish who participates, which interests are missing and how disagreement changes a proposal. This treats legitimacy as an ongoing practice rather than a meeting held before launch. It also gives technical specialists information about harms that are invisible in a data schema.\n\nC Stewards sit between the data holders and those seeking access. Their duty is not simply to maximise the number of projects approved. They must interpret the trust's purpose, test requests against agreed rules and refuse uses that are incompatible with them. Some commentators compare this role with fiduciary responsibility, but existing initiatives operate under varied legal vehicles and the exact obligations differ by jurisdiction. What matters operationally is that stewards have authority, relevant expertise and protection from pressure by the organisations supplying money or data. Without those conditions, review risks becoming a polite description of decisions made elsewhere.\n\nD Consent presents a deeper challenge. Individual permission is important when it is feasible, yet a one-time agreement cannot anticipate every future linkage or inference. Conversely, treating community approval as permission to ignore individual rights would replace one weakness with another. Collective consent is meaningful only if the group can revisit conditions, withdraw support from a class of uses and see what has occurred. The trust therefore needs procedures for renewal, not a permanent licence obtained at the start. It should also distinguish between permission to hold information, permission to analyse it and permission to act on the resulting classification.\n\nE Good governance reduces the amount of faith placed in good intentions. Data minimisation limits what is collected or retained, which narrows the damage possible after misuse or a security failure. Access controls determine who can work with which fields and under what conditions. An audit trail records requests, decisions and subsequent activity, allowing patterns to be examined later. These mechanisms serve different audiences: engineers need operational detail, while the public needs an intelligible account of purposes, recipients and outcomes. Publishing every technical log would overwhelm rather than inform. Transparency requires selection and explanation, not indiscriminate disclosure.\n\nF Disagreement must have somewhere to go. If the same team designs a rule, applies it and judges complaints about it, procedural confidence will remain fragile even when its intentions are sound. An independent appeal or challenge function gives affected people a remedy beyond the original decision-maker. It can also reveal recurring weaknesses in criteria or communication. Independence need not mean isolation: the appeal body still needs access to records and relevant expertise. Nor should challenge begin only after visible harm. Periodic audits and published reasons can expose inconsistent decisions early and make the exercise of discretion easier to scrutinise.\n\nG Commercial access is sometimes portrayed as inherently incompatible with community benefit. That conclusion is too simple. A company might provide a tool or analysis that advances the stated purpose, while a nominally public organisation might seek an intrusive use. The better test concerns purpose, proportionality, benefit, safeguards and enforceable conditions. Any revenue should be governed transparently, but payment does not determine legitimacy on its own. The trust must be able to reject an attractive offer when its use conflicts with the mandate. Equally, a blanket refusal could prevent a carefully constrained collaboration that the represented community values.\n\nH Finally, evaluation should ask whether public value and meaningful control endure. Counting approved projects rewards activity, not quality. A fuller account would examine who obtained access, which requests were refused, whether affected groups could change conditions, how benefits were distributed and whether promised safeguards worked in practice. Measures must be revisited because both technology and community priorities change. A durable evaluation also records unintended consequences and the cost of participation, since a procedure may look inclusive while demanding time or expertise that only well-resourced groups possess, shaping which objections are heard locally. This is why a data trust should be understood less as a vault than as a constitutional arrangement: it allocates power, establishes procedures and makes decisions contestable. Its success lies not in eliminating conflict, which is unrealistic, but in handling conflict openly while keeping the original purpose within reach.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q27",
          "part": 7,
          "text": "The writer regards accountability as depending on more than the label given to a data-sharing arrangement.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q28",
          "part": 7,
          "text": "An advisory panel can provide legitimate community involvement even when it has no influence over access decisions.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q29",
          "part": 7,
          "text": "Stewards in established data trusts are generally appointed through public elections.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q30",
          "part": 7,
          "text": "Collective consent should be open to revision as possible data uses develop.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q31",
          "part": 7,
          "text": "For public transparency, the writer favours releasing technical records without further explanation.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q32",
          "part": 7,
          "text": "A challenge process separate from the original decision-maker can strengthen legitimacy.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q33",
          "part": 7,
          "text": "Commercial organisations are more likely than public bodies to produce socially valuable data projects.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q34",
          "part": 7,
          "text": "The first stage in designing a credible data trust",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I"
          ],
          "answer": 7
        },
        {
          "type": "mcq",
          "id": "r-q35",
          "part": 7,
          "text": "Giving stewards authority to reject incompatible uses",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q36",
          "part": 7,
          "text": "A process for renewing collective consent",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I"
          ],
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "r-q37",
          "part": 7,
          "text": "Data minimisation",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q38",
          "part": 7,
          "text": "Publishing reasons and reviewing audit records",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I"
          ],
          "answer": 6
        },
        {
          "type": "mcq",
          "id": "r-q39",
          "part": 7,
          "text": "An independent appeal mechanism",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q40",
          "part": 7,
          "text": "Long-term evaluation",
          "options": [
            "Location A",
            "Location B",
            "Location C",
            "Location D",
            "Location E",
            "Location F",
            "Location G",
            "Location H",
            "Location I"
          ],
          "answer": 5
        }
      ]
    },
    {
      "part": 8,
      "skill": "writing",
      "title": "Academic Writing",
      "instructions": "You should spend about 60 minutes on both tasks. Task 2 contributes twice as much as Task 1 to the Writing score.",
      "questions": [
        {
          "type": "write",
          "id": "w-task-1",
          "part": 8,
          "taskNumber": 1,
          "stimulus": "The line graph below shows the number of resident and visitor passengers using a ferry service on a fictional island route from January to June.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          "text": "The line graph below shows the number of resident and visitor passengers using a ferry service on a fictional island route from January to June.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          "minWords": 150,
          "imageUrl": "/assets/ielts/charts/set25-task1.svg",
          "imageAlt": "Line graph comparing monthly resident and visitor passenger totals on a fictional island ferry route from January to June."
        },
        {
          "type": "write",
          "id": "w-task-2",
          "part": 8,
          "taskNumber": 2,
          "stimulus": "Some people think that all new apartment buildings should be required to include shared indoor rooms for residents.\n\nTo what extent do you agree or disagree?",
          "text": "Some people think that all new apartment buildings should be required to include shared indoor rooms for residents.\n\nTo what extent do you agree or disagree?",
          "minWords": 250
        }
      ]
    },
    {
      "part": 9,
      "skill": "speaking",
      "title": "Speaking",
      "instructions": "Complete Parts 1, 2 and 3 in order. Part 2 includes one minute of preparation and a one-to-two-minute long turn.",
      "questions": [
        {
          "type": "speak",
          "id": "s-part-1",
          "part": 9,
          "partNumber": 1,
          "text": "How often do you have to wait in a queue?\nIn what situations do you dislike waiting in a queue most?\nWhat do you usually do while you are waiting?\nHas the way you feel about waiting changed since you were younger?\nWhat kinds of boxes or containers, if any, do you keep?\nHow do you decide whether to keep or discard a container?\nWhat practical uses can old boxes or containers have?\nDo you prefer containers with a simple design or a decorative one? Why?\nWhere, if anywhere, do you notice public announcements near where you live?\nWhat information would you look for on a neighbourhood noticeboard?\nIs an online noticeboard more useful than a physical one? Why or why not?\nWill physical noticeboards still be useful in the future?"
        },
        {
          "type": "speak",
          "id": "s-part-2",
          "part": 9,
          "partNumber": 2,
          "text": "Describe a rule in a shared place that you think works well.",
          "cueCard": "Describe a rule in a shared place that you think works well.\nYou should say:\n• what the place is and what the rule says\n• who is expected to follow the rule\n• how the rule affects people's behaviour\nand explain why you think the rule is effective or how it could be improved.",
          "followUp": [
            "Is the rule easy for visitors to understand?",
            "Would you change any part of the rule?"
          ]
        },
        {
          "type": "speak",
          "id": "s-part-3",
          "part": 9,
          "partNumber": 3,
          "text": "Why do shared places sometimes need rules that private places do not?\nWhat makes a rule seem fair to the people expected to follow it?\nShould the same rules apply to people of all ages in shared places?\nCan the design of a place influence behaviour more effectively than penalties? In what ways?\nHow much influence should the public have when rules for shared places are created?\nHow might rules for shared places change as cities become busier?"
        }
      ]
    }
  ]
};

export default mock;
