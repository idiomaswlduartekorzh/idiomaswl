import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-07',
  examSlug: 'icfes',
  title: 'Mock 7 · Deporte y tiempo libre',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Match each word with its correct description.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'The person who leads and trains a sports team, giving instructions and developing strategy.',
          options: ['Coach', 'Supporter', 'Referee', 'Spectator'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'A set of planned physical exercises done regularly to improve fitness and health.',
          options: ['Tournament', 'Workout', 'Hobby', 'League'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'A sports competition in which many players or teams compete against each other over several rounds.',
          options: ['Trophy', 'Training', 'Tournament', 'Transfer'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'An activity that someone does for pleasure during their free time, not as a job.',
          options: ['Career', 'Ambition', 'Talent', 'Hobby'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'A physical injury in a muscle caused by overuse or sudden movement during exercise.',
          options: ['Fatigue', 'Bruise', 'Strain', 'Fracture'],
          answer: 2,
        },
      ],
    },
    {
      part: 2,
      title: 'Parte 2 — Diálogos',
      instructions: 'Read each dialogue and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p2q1',
          part: 2,
          stimulus: 'Friend A: "I\'ve been feeling really stressed lately. What do you do to relax?"\nFriend B: _______',
          text: 'What is Friend B\'s most helpful response?',
          options: [
            '"I go for a run three times a week. It really clears my mind."',
            '"I usually watch a lot of television."',
            '"Stress is a normal part of life."',
            '"You should sleep more hours."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Coach: "You\'ve been training hard, but your technique still needs work. How do you feel about that?"\nPlayer: _______',
          text: 'What does the player say?',
          options: [
            '"I think I\'m ready to retire from the sport."',
            '"The other players have the same problem."',
            '"I always do my best during practice."',
            '"I appreciate the feedback. Can you show me specifically what I need to improve?"',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Parent: "Are you sure you want to join the swimming team? It\'s a big commitment."\nTeenager: "Yes, absolutely. I\'ve been swimming for three years and I really want to compete."\nParent: _______',
          text: 'What does the parent say?',
          options: [
            '"Swimming pools are very expensive."',
            '"All right. I\'ll support you. Let\'s find out about registration."',
            '"You should try a less demanding sport first."',
            '"The swim team only takes the best players."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Gym receptionist: "Good morning! Are you a member here?"\nVisitor: "Not yet. I\'d like to find out more about joining."\nReceptionist: _______',
          text: 'What is the receptionist\'s most helpful response?',
          options: [
            '"The gym opens at six in the morning."',
            '"Of course! Let me give you a tour and explain our membership options."',
            '"You should sign up online."',
            '"We are very busy right now."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Teammate A: "We lost the match, but you played really well today."\nTeammate B: _______',
          text: 'Which response is most appropriate?',
          options: [
            '"The referee made a lot of bad decisions."',
            '"I scored the most goals on the team."',
            '"I don\'t think I played well at all."',
            '"Thank you. It was disappointing to lose, but we\'ll learn from it."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Doctor: "You\'ve been running long distances without proper rest. What does your weekly training schedule look like?"\nAthlete: _______',
          text: 'What does the athlete say?',
          options: [
            '"I run every day, about 15 kilometers each session, with no rest days."',
            '"I prefer swimming to running."',
            '"I usually train in the morning before breakfast."',
            '"My coach thinks I need to run faster."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Sports journalist: "Congratulations on winning the championship! What was the key to your team\'s success?"\nSports captain: _______',
          text: 'What does the captain say?',
          options: [
            '"We were lucky that the other teams were not very good."',
            '"I think I was the most important player this season."',
            '"We worked incredibly hard as a unit, and everyone contributed. It was a true team effort."',
            '"The trophy is very beautiful."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Student A: "What do you usually do on weekends?"\nStudent B: "I love painting. It helps me unwind after a long week."\nStudent A: _______',
          text: 'What is Student A\'s most natural response?',
          options: [
            '"Painting is very expensive."',
            '"You should try a sport instead."',
            '"I prefer playing video games."',
            '"That sounds really relaxing. Do you paint people or landscapes?"',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Physical education teacher: "Class, today we\'re going to practice passing in basketball. Get into pairs, please."\nStudent: "Excuse me, I hurt my wrist yesterday. Can I sit this one out?"\nTeacher: _______',
          text: 'What does the teacher say?',
          options: [
            '"You need a doctor\'s note for that."',
            '"Everyone must participate today."',
            '"Of course. Please sit on the bench and watch. I hope your wrist feels better soon."',
            '"You can still try — just use your other hand."',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 3,
      title: 'Parte 3 — Completar oraciones',
      instructions: 'Choose the word or phrase that best completes each sentence.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          text: 'She _______ tennis every Saturday morning since she was twelve years old.',
          options: ['plays', 'has been playing', 'played', 'is playing'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The team _______ practice early tomorrow because the match starts at noon.',
          options: ['will begin', 'begins', 'began', 'is beginning'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'Regular exercise is important not only _______ physical health but also for mental well-being.',
          options: ['for', 'because of', 'despite', 'although'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'The athlete _______ injured during practice, so she was unable to compete in the finals.',
          options: ['gets', 'got', 'getting', 'has get'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'Cycling is a great _______ for people who want a low-impact form of exercise.',
          options: ['optionally', 'optional', 'option', 'opting'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'You should warm up _______ you start any intense physical activity to avoid injury.',
          options: ['after', 'until', 'since', 'before'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'The new sports center _______ thousands of visitors since it opened last spring.',
          options: ['attracts', 'attracted', 'has attracted', 'is attracting'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'If you practice _______, you will see significant improvement in your performance within a few weeks.',
          options: ['consistently', 'consistent', 'consistency', 'consisting'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'Many people take up hobbies such as gardening or photography _______ they want to reduce screen time.',
          options: ['however', 'despite', 'unless', 'because'],
          answer: 3,
        },
      ],
    },
    {
      part: 4,
      title: 'Parte 4 — Comprensión visual',
      instructions: 'Read the notice or sign and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: '--- COMMUNITY SPORTS CENTER ---\nGRAND OPENING — SATURDAY, MARCH 15TH\nActivities available:\n• Swimming pool (ages 6 and up)\n• Basketball court (open play, no booking required)\n• Yoga studio (class booking required)\n• Fitness gym (adults 16+ only)\nMembership: $15/month · Free trial available for first-time visitors\nOpen daily: 6:00 AM – 10:00 PM',
          stimulusLabel: 'Read the sports center notice.',
          text: 'Which activity requires advance booking?',
          options: [
            'Swimming.',
            'Yoga classes.',
            'Basketball.',
            'The fitness gym.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- COMMUNITY SPORTS CENTER ---\nGRAND OPENING — SATURDAY, MARCH 15TH\nActivities available:\n• Swimming pool (ages 6 and up)\n• Basketball court (open play, no booking required)\n• Yoga studio (class booking required)\n• Fitness gym (adults 16+ only)\nMembership: $15/month · Free trial available for first-time visitors\nOpen daily: 6:00 AM – 10:00 PM',
          stimulusLabel: 'Read the sports center notice.',
          text: 'Who is NOT allowed to use the fitness gym?',
          options: [
            'Adults over 18.',
            'Young people under 16.',
            'People without a membership.',
            'First-time visitors.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'SWIMMING POOL RULES\n• Shower before entering the pool.\n• No running on the pool deck.\n• Children under 10 must be accompanied by an adult.\n• No food or drinks in the pool area.\n• Swim caps are required for all users.\n• The pool closes for maintenance every Tuesday from 8:00 AM – 10:00 AM.',
          stimulusLabel: 'Read the pool rules.',
          text: 'What must all swimmers wear?',
          options: [
            'A life jacket.',
            'Goggles.',
            'Waterproof footwear.',
            'A swim cap.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'SWIMMING POOL RULES\n• Shower before entering the pool.\n• No running on the pool deck.\n• Children under 10 must be accompanied by an adult.\n• No food or drinks in the pool area.\n• Swim caps are required for all users.\n• The pool closes for maintenance every Tuesday from 8:00 AM – 10:00 AM.',
          stimulusLabel: 'Read the pool rules.',
          text: 'When is the pool closed for maintenance?',
          options: [
            'Every Tuesday from 8:00 AM to 10:00 AM.',
            'Every Monday morning.',
            'Every Saturday afternoon.',
            'Every Sunday from 6:00 AM to 8:00 AM.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'INTER-SCHOOL SPORTS DAY\nDate: Friday, May 23rd · 8:00 AM – 4:00 PM\nVenue: Parque Deportivo Central\nEvents: 100m sprint · Long jump · Relay race · Football · Volleyball\nAll student participants must bring:\n• School ID card\n• Signed permission form\n• Water bottle and snacks\nResults announced at 3:30 PM. Medals awarded to top 3 finishers in each event.',
          stimulusLabel: 'Read the sports day flyer.',
          text: 'What must students bring to participate in Sports Day?',
          options: [
            'A school uniform and sports shoes.',
            'A medical certificate and emergency contact form.',
            'A school ID card, a signed permission form, and water and snacks.',
            'Their coach and a team captain.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'INTER-SCHOOL SPORTS DAY\nDate: Friday, May 23rd · 8:00 AM – 4:00 PM\nVenue: Parque Deportivo Central\nEvents: 100m sprint · Long jump · Relay race · Football · Volleyball\nAll student participants must bring:\n• School ID card\n• Signed permission form\n• Water bottle and snacks\nResults announced at 3:30 PM. Medals awarded to top 3 finishers in each event.',
          stimulusLabel: 'Read the sports day flyer.',
          text: 'How many students receive medals in each event?',
          options: [
            'Only the first-place finisher.',
            'The top five finishers.',
            'All participants.',
            'The top three finishers.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'YOGA CLASS TIMETABLE — JULY\nMondayS & Wednesdays: Beginners Yoga · 7:00 AM – 8:00 AM · Studio 1\nTuesdays & Thursdays: Intermediate Flow · 6:00 PM – 7:15 PM · Studio 2\nSaturdays: Relaxation & Mindfulness · 9:00 AM – 10:30 AM · Studio 1\n* Book online at least 24 hours in advance.\n* Bring your own mat or rent one for $2 at reception.',
          stimulusLabel: 'Read the yoga timetable.',
          text: 'How far in advance must students book a yoga class?',
          options: [
            'At least 30 minutes before.',
            'At least two days before.',
            'At least 24 hours before.',
            'At least one week before.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'YOGA CLASS TIMETABLE — JULY\nMondayS & Wednesdays: Beginners Yoga · 7:00 AM – 8:00 AM · Studio 1\nTuesdays & Thursdays: Intermediate Flow · 6:00 PM – 7:15 PM · Studio 2\nSaturdays: Relaxation & Mindfulness · 9:00 AM – 10:30 AM · Studio 1\n* Book online at least 24 hours in advance.\n* Bring your own mat or rent one for $2 at reception.',
          stimulusLabel: 'Read the yoga timetable.',
          text: 'What can students do if they do not have a yoga mat?',
          options: [
            'Borrow one from another student.',
            'Rent one at reception for $2.',
            'Skip the class and rebook.',
            'Use a towel instead.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'BICYCLE RENTAL — RIVERSIDE PARK\nHours: Daily, 8:00 AM – 6:00 PM\nRates:\n• 1 hour: $5\n• Half day (4 hours): $15\n• Full day: $25\nHelmet included. ID required as deposit.\nReturn bikes 15 minutes before closing time.\nNo cycling on footpaths — cycling lanes only.',
          stimulusLabel: 'Read the bicycle rental sign.',
          text: 'What is used as a deposit when renting a bicycle?',
          options: [
            'An ID document.',
            'A cash deposit of $10.',
            'A credit card.',
            'A signed rental agreement.',
          ],
          answer: 0,
        },
      ],
    },
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the text and answer the questions.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'Why was the sports center built in Barrio Norte?',
          options: [
            'Because local teenagers had no safe recreational spaces nearby.',
            'To host national sports competitions.',
            'To replace an old gym that was falling apart.',
            'Because the neighborhood requested a swimming pool specifically.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'What do teenagers need to register at the sports center?',
          options: [
            'A parent\'s signature and payment form.',
            'A school ID.',
            'A medical certificate.',
            'A letter from their school principal.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'What feature of the center helps students with their schoolwork?',
          options: [
            'Free internet access in the fitness area.',
            'A tutoring service offered by the coaches.',
            'A study room where they can do homework.',
            'A library with academic textbooks.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'How many people attended the opening tournament as participants or spectators?',
          options: [
            'Over 200 in total.',
            'Over 500 in total.',
            'Over 1,000 in total.',
            'Over 700 in total.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "densely" in the first paragraph most likely means:',
          options: [
            'Quietly and peacefully.',
            'In a very modern and developed way.',
            'With a very high concentration of people.',
            'Far from the city center.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'According to local officials, what are the two main goals of the center?',
          options: [
            'To reduce youth crime and improve health outcomes.',
            'To attract sponsors and host national tournaments.',
            'To provide jobs for coaches and support local schools.',
            'To train professional athletes and promote the city internationally.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'What plans are mentioned for the future of the sports center?',
          options: [
            'To build an outdoor running track.',
            'To expand the swimming pool to 50 meters.',
            'To open a second location in another neighborhood.',
            'To add a dance studio and a martial arts room.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'On which days and times is the center open for teenagers?',
          options: [
            'Monday to Saturday, 8:00 AM – 4:00 PM.',
            'Monday to Friday afternoons and Saturday mornings.',
            'Every day from 6:00 AM to 10:00 PM.',
            'Tuesday to Sunday, 3:00 PM to 8:00 PM.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `New Sports Center Opens Its Doors for Teenagers in Barrio Norte

A modern community sports center officially opened last month in Barrio Norte, one of the most densely populated neighborhoods in the city. The center was built in response to growing concerns from local parents and educators about the lack of safe recreational spaces for teenagers, many of whom had been spending their afternoons on the streets with little to do.

The facility includes a full-size indoor basketball court, a football pitch, a 25-meter swimming pool, and a dedicated fitness area for young people aged 13 to 17. All activities are completely free of charge for residents who register with a school ID. Classes and training sessions are scheduled every afternoon from 3:00 PM to 7:00 PM, Monday through Friday, and on Saturday mornings.

The center is staffed by five qualified coaches who offer structured training in each sport, as well as informal open-play sessions. It also has a study room where students can do homework before or after their sports session.

The opening was celebrated with a community tournament, which attracted over 200 participants and more than 500 spectators. Local officials say the center is part of a broader initiative to reduce youth crime and improve health outcomes in the area. Plans are already underway to add a dance studio and a martial arts room before the end of the year.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about the sports center from this text?',
          options: [
            'It is likely to close after one year due to lack of funding.',
            'It has been well received by the community and is expected to grow.',
            'It only serves young people who are already skilled athletes.',
            'It was built to compete with private sports clubs in the area.',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the longer text carefully and answer the questions. Use inference and context clues.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: `Moving for the Mind: How Exercise Transforms Mental Health

For most of human history, physical activity was simply a part of daily survival — people walked, lifted, ran, and worked with their bodies without giving it much thought. Today, millions of people live sedentary lives, sitting at desks, staring at screens, and moving very little throughout the day. The consequences, researchers are now discovering, extend far beyond the physical body.

A growing body of scientific evidence confirms that regular physical activity has profound benefits for mental health. Studies consistently show that people who exercise regularly are significantly less likely to suffer from depression, anxiety, and chronic stress. Exercise triggers the release of endorphins — chemicals produced in the brain that create feelings of pleasure and reduce pain. This is sometimes called the "runner's high," but it applies to any sustained physical activity, from swimming to cycling to dancing.

Beyond brain chemistry, exercise also reshapes how the brain is structured. Research has found that aerobic exercise promotes neurogenesis — the growth of new brain cells — particularly in the hippocampus, the region associated with memory and learning. Regular physical activity has been linked to reduced cognitive decline in older adults and improved academic performance in children.

The mental health benefits go beyond biological processes. Exercise often provides structure, routine, and a sense of achievement. Completing a workout, reaching a personal fitness goal, or improving performance in a sport can significantly boost self-esteem. Group sports and fitness classes add a social dimension, reducing isolation and building community connections.

Despite all this evidence, millions of people worldwide remain largely inactive. Barriers include lack of time, access to facilities, financial constraints, and the motivation to start. Public health experts argue that governments must do more to make physical activity accessible — through urban design that encourages walking and cycling, free community sports programs, and workplace wellness initiatives.

The message is increasingly clear: exercise is not merely a tool for weight management or physical appearance. It is one of the most effective, low-cost interventions available for mental well-being. In a world grappling with a growing mental health crisis, moving more may be one of the most important things a person can do for their mind.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main argument of this text?',
          options: [
            'People today exercise far too much and risk physical injury.',
            'The brain is not affected by physical exercise.',
            'Depression and anxiety can only be treated with medication.',
            'Regular physical activity has significant benefits for mental health.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `Moving for the Mind: How Exercise Transforms Mental Health

For most of human history, physical activity was simply a part of daily survival — people walked, lifted, ran, and worked with their bodies without giving it much thought. Today, millions of people live sedentary lives, sitting at desks, staring at screens, and moving very little throughout the day. The consequences, researchers are now discovering, extend far beyond the physical body.

A growing body of scientific evidence confirms that regular physical activity has profound benefits for mental health. Studies consistently show that people who exercise regularly are significantly less likely to suffer from depression, anxiety, and chronic stress. Exercise triggers the release of endorphins — chemicals produced in the brain that create feelings of pleasure and reduce pain. This is sometimes called the "runner's high," but it applies to any sustained physical activity, from swimming to cycling to dancing.

Beyond brain chemistry, exercise also reshapes how the brain is structured. Research has found that aerobic exercise promotes neurogenesis — the growth of new brain cells — particularly in the hippocampus, the region associated with memory and learning. Regular physical activity has been linked to reduced cognitive decline in older adults and improved academic performance in children.

The mental health benefits go beyond biological processes. Exercise often provides structure, routine, and a sense of achievement. Completing a workout, reaching a personal fitness goal, or improving performance in a sport can significantly boost self-esteem. Group sports and fitness classes add a social dimension, reducing isolation and building community connections.

Despite all this evidence, millions of people worldwide remain largely inactive. Barriers include lack of time, access to facilities, financial constraints, and the motivation to start. Public health experts argue that governments must do more to make physical activity accessible — through urban design that encourages walking and cycling, free community sports programs, and workplace wellness initiatives.

The message is increasingly clear: exercise is not merely a tool for weight management or physical appearance. It is one of the most effective, low-cost interventions available for mental well-being. In a world grappling with a growing mental health crisis, moving more may be one of the most important things a person can do for their mind.`,
          stimulusLabel: 'Read the article.',
          text: 'What are endorphins, according to the text?',
          options: [
            'Chemicals in the brain that create pleasure and reduce pain.',
            'Muscles in the body that are used during running.',
            'A type of medication prescribed for depression.',
            'A form of aerobic exercise used in therapy.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `Moving for the Mind: How Exercise Transforms Mental Health

For most of human history, physical activity was simply a part of daily survival — people walked, lifted, ran, and worked with their bodies without giving it much thought. Today, millions of people live sedentary lives, sitting at desks, staring at screens, and moving very little throughout the day. The consequences, researchers are now discovering, extend far beyond the physical body.

A growing body of scientific evidence confirms that regular physical activity has profound benefits for mental health. Studies consistently show that people who exercise regularly are significantly less likely to suffer from depression, anxiety, and chronic stress. Exercise triggers the release of endorphins — chemicals produced in the brain that create feelings of pleasure and reduce pain. This is sometimes called the "runner's high," but it applies to any sustained physical activity, from swimming to cycling to dancing.

Beyond brain chemistry, exercise also reshapes how the brain is structured. Research has found that aerobic exercise promotes neurogenesis — the growth of new brain cells — particularly in the hippocampus, the region associated with memory and learning. Regular physical activity has been linked to reduced cognitive decline in older adults and improved academic performance in children.

The mental health benefits go beyond biological processes. Exercise often provides structure, routine, and a sense of achievement. Completing a workout, reaching a personal fitness goal, or improving performance in a sport can significantly boost self-esteem. Group sports and fitness classes add a social dimension, reducing isolation and building community connections.

Despite all this evidence, millions of people worldwide remain largely inactive. Barriers include lack of time, access to facilities, financial constraints, and the motivation to start. Public health experts argue that governments must do more to make physical activity accessible — through urban design that encourages walking and cycling, free community sports programs, and workplace wellness initiatives.

The message is increasingly clear: exercise is not merely a tool for weight management or physical appearance. It is one of the most effective, low-cost interventions available for mental well-being. In a world grappling with a growing mental health crisis, moving more may be one of the most important things a person can do for their mind.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the text say about neurogenesis and the hippocampus?',
          options: [
            'Neurogenesis only occurs in young children, not in adults.',
            'The hippocampus is responsible for controlling emotional responses during sport.',
            'Aerobic exercise promotes the growth of new brain cells in the area linked to memory and learning.',
            'Neurogenesis can cause memory problems if exercise is too intense.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `Moving for the Mind: How Exercise Transforms Mental Health

For most of human history, physical activity was simply a part of daily survival — people walked, lifted, ran, and worked with their bodies without giving it much thought. Today, millions of people live sedentary lives, sitting at desks, staring at screens, and moving very little throughout the day. The consequences, researchers are now discovering, extend far beyond the physical body.

A growing body of scientific evidence confirms that regular physical activity has profound benefits for mental health. Studies consistently show that people who exercise regularly are significantly less likely to suffer from depression, anxiety, and chronic stress. Exercise triggers the release of endorphins — chemicals produced in the brain that create feelings of pleasure and reduce pain. This is sometimes called the "runner's high," but it applies to any sustained physical activity, from swimming to cycling to dancing.

Beyond brain chemistry, exercise also reshapes how the brain is structured. Research has found that aerobic exercise promotes neurogenesis — the growth of new brain cells — particularly in the hippocampus, the region associated with memory and learning. Regular physical activity has been linked to reduced cognitive decline in older adults and improved academic performance in children.

The mental health benefits go beyond biological processes. Exercise often provides structure, routine, and a sense of achievement. Completing a workout, reaching a personal fitness goal, or improving performance in a sport can significantly boost self-esteem. Group sports and fitness classes add a social dimension, reducing isolation and building community connections.

Despite all this evidence, millions of people worldwide remain largely inactive. Barriers include lack of time, access to facilities, financial constraints, and the motivation to start. Public health experts argue that governments must do more to make physical activity accessible — through urban design that encourages walking and cycling, free community sports programs, and workplace wellness initiatives.

The message is increasingly clear: exercise is not merely a tool for weight management or physical appearance. It is one of the most effective, low-cost interventions available for mental well-being. In a world grappling with a growing mental health crisis, moving more may be one of the most important things a person can do for their mind.`,
          stimulusLabel: 'Read the article.',
          text: 'How does group exercise help people beyond the physical benefits?',
          options: [
            'It makes people more competitive and motivated to win.',
            'It is more effective than individual exercise for weight loss.',
            'It allows people to exercise without needing professional coaching.',
            'It reduces isolation and builds social connections.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `Moving for the Mind: How Exercise Transforms Mental Health

For most of human history, physical activity was simply a part of daily survival — people walked, lifted, ran, and worked with their bodies without giving it much thought. Today, millions of people live sedentary lives, sitting at desks, staring at screens, and moving very little throughout the day. The consequences, researchers are now discovering, extend far beyond the physical body.

A growing body of scientific evidence confirms that regular physical activity has profound benefits for mental health. Studies consistently show that people who exercise regularly are significantly less likely to suffer from depression, anxiety, and chronic stress. Exercise triggers the release of endorphins — chemicals produced in the brain that create feelings of pleasure and reduce pain. This is sometimes called the "runner's high," but it applies to any sustained physical activity, from swimming to cycling to dancing.

Beyond brain chemistry, exercise also reshapes how the brain is structured. Research has found that aerobic exercise promotes neurogenesis — the growth of new brain cells — particularly in the hippocampus, the region associated with memory and learning. Regular physical activity has been linked to reduced cognitive decline in older adults and improved academic performance in children.

The mental health benefits go beyond biological processes. Exercise often provides structure, routine, and a sense of achievement. Completing a workout, reaching a personal fitness goal, or improving performance in a sport can significantly boost self-esteem. Group sports and fitness classes add a social dimension, reducing isolation and building community connections.

Despite all this evidence, millions of people worldwide remain largely inactive. Barriers include lack of time, access to facilities, financial constraints, and the motivation to start. Public health experts argue that governments must do more to make physical activity accessible — through urban design that encourages walking and cycling, free community sports programs, and workplace wellness initiatives.

The message is increasingly clear: exercise is not merely a tool for weight management or physical appearance. It is one of the most effective, low-cost interventions available for mental well-being. In a world grappling with a growing mental health crisis, moving more may be one of the most important things a person can do for their mind.`,
          stimulusLabel: 'Read the article.',
          text: 'What barriers to exercise does the text identify?',
          options: [
            'Poor weather, physical disability, and fear of injury.',
            'Social pressure, competition, and the high cost of sports equipment.',
            'Lack of time, access to facilities, financial constraints, and motivation.',
            'Poor nutrition, lack of sleep, and work-related stress.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `Moving for the Mind: How Exercise Transforms Mental Health

For most of human history, physical activity was simply a part of daily survival — people walked, lifted, ran, and worked with their bodies without giving it much thought. Today, millions of people live sedentary lives, sitting at desks, staring at screens, and moving very little throughout the day. The consequences, researchers are now discovering, extend far beyond the physical body.

A growing body of scientific evidence confirms that regular physical activity has profound benefits for mental health. Studies consistently show that people who exercise regularly are significantly less likely to suffer from depression, anxiety, and chronic stress. Exercise triggers the release of endorphins — chemicals produced in the brain that create feelings of pleasure and reduce pain. This is sometimes called the "runner's high," but it applies to any sustained physical activity, from swimming to cycling to dancing.

Beyond brain chemistry, exercise also reshapes how the brain is structured. Research has found that aerobic exercise promotes neurogenesis — the growth of new brain cells — particularly in the hippocampus, the region associated with memory and learning. Regular physical activity has been linked to reduced cognitive decline in older adults and improved academic performance in children.

The mental health benefits go beyond biological processes. Exercise often provides structure, routine, and a sense of achievement. Completing a workout, reaching a personal fitness goal, or improving performance in a sport can significantly boost self-esteem. Group sports and fitness classes add a social dimension, reducing isolation and building community connections.

Despite all this evidence, millions of people worldwide remain largely inactive. Barriers include lack of time, access to facilities, financial constraints, and the motivation to start. Public health experts argue that governments must do more to make physical activity accessible — through urban design that encourages walking and cycling, free community sports programs, and workplace wellness initiatives.

The message is increasingly clear: exercise is not merely a tool for weight management or physical appearance. It is one of the most effective, low-cost interventions available for mental well-being. In a world grappling with a growing mental health crisis, moving more may be one of the most important things a person can do for their mind.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the author suggest governments should do to help people exercise more?',
          options: [
            'Make exercise legally mandatory for all citizens.',
            'Improve urban design, offer free community programs, and promote workplace wellness.',
            'Tax unhealthy foods and use the money to build gyms.',
            'Hire personal trainers to work in schools and offices.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `Moving for the Mind: How Exercise Transforms Mental Health

For most of human history, physical activity was simply a part of daily survival — people walked, lifted, ran, and worked with their bodies without giving it much thought. Today, millions of people live sedentary lives, sitting at desks, staring at screens, and moving very little throughout the day. The consequences, researchers are now discovering, extend far beyond the physical body.

A growing body of scientific evidence confirms that regular physical activity has profound benefits for mental health. Studies consistently show that people who exercise regularly are significantly less likely to suffer from depression, anxiety, and chronic stress. Exercise triggers the release of endorphins — chemicals produced in the brain that create feelings of pleasure and reduce pain. This is sometimes called the "runner's high," but it applies to any sustained physical activity, from swimming to cycling to dancing.

Beyond brain chemistry, exercise also reshapes how the brain is structured. Research has found that aerobic exercise promotes neurogenesis — the growth of new brain cells — particularly in the hippocampus, the region associated with memory and learning. Regular physical activity has been linked to reduced cognitive decline in older adults and improved academic performance in children.

The mental health benefits go beyond biological processes. Exercise often provides structure, routine, and a sense of achievement. Completing a workout, reaching a personal fitness goal, or improving performance in a sport can significantly boost self-esteem. Group sports and fitness classes add a social dimension, reducing isolation and building community connections.

Despite all this evidence, millions of people worldwide remain largely inactive. Barriers include lack of time, access to facilities, financial constraints, and the motivation to start. Public health experts argue that governments must do more to make physical activity accessible — through urban design that encourages walking and cycling, free community sports programs, and workplace wellness initiatives.

The message is increasingly clear: exercise is not merely a tool for weight management or physical appearance. It is one of the most effective, low-cost interventions available for mental well-being. In a world grappling with a growing mental health crisis, moving more may be one of the most important things a person can do for their mind.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "sedentary" in the first paragraph most likely describes people who:',
          options: [
            'Spend most of their time sitting and do very little physical activity.',
            'Exercise excessively and risk overtraining.',
            'Work outdoors in physically demanding jobs.',
            'Follow a strict diet without doing exercise.',
          ],
          answer: 0,
        },
      ],
    },
    {
      part: 7,
      title: 'Parte 7 — Texto de opinion',
      instructions: "Read the opinion text and answer the questions about the author's argument.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: `Are Professional Athletes Paid Too Much?

When a professional footballer signs a contract worth fifty million dollars per year, or a basketball player earns more in a single game than a teacher earns in a lifetime, it is natural to ask: are we getting our priorities right? I believe the astronomical salaries paid to professional athletes are fundamentally unjust and reflect deeply distorted values in our society.

The argument that "the market decides" is often used to defend these salaries. And yes, technically, sports leagues are private businesses, and if people are willing to pay for tickets, merchandise, and TV subscriptions, then high salaries follow. But this logic ignores the broader question of what we, as a society, choose to value and reward.

Consider the professions that are truly essential to human well-being: doctors, nurses, teachers, social workers, firefighters, and scientists. These individuals dedicate years to training, often work in difficult conditions, and make contributions that quite literally keep society functioning. Yet many of them struggle to pay rent. Meanwhile, an athlete who hits a ball or runs with it earns thousands of times more.

Defenders of high athlete salaries argue that elite athletes are rare talents whose careers are short and physically demanding. This is true. But scarcity and difficulty are not unique to sport. Surgeons train for a decade and perform procedures that can save lives. Their work is also physically and mentally demanding, and yet their compensation is nowhere near that of a top footballer.

Others point out that athletes create enormous economic activity — they fill stadiums, support local businesses, and generate tax revenue. Again, this is partially true. But the same argument could be made for teachers, who educate the next generation of workers, innovators, and citizens.

I am not suggesting that athletes should be paid nothing, or even poorly. Athletic excellence is a genuine achievement that deserves recognition and fair reward. But when the gap between the highest and lowest earners in a society becomes so extreme, it speaks to a fundamental problem with our collective values. We need to redirect some of that wealth — through taxation and policy — toward the professions that hold our communities together.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s main argument?',
          options: [
            'The extremely high salaries of professional athletes reflect distorted societal values.',
            'Professional athletes should not be allowed to earn more than doctors.',
            'Sports leagues should be nationalized and controlled by governments.',
            'Athletes should donate all of their income to social causes.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Are Professional Athletes Paid Too Much?

When a professional footballer signs a contract worth fifty million dollars per year, or a basketball player earns more in a single game than a teacher earns in a lifetime, it is natural to ask: are we getting our priorities right? I believe the astronomical salaries paid to professional athletes are fundamentally unjust and reflect deeply distorted values in our society.

The argument that "the market decides" is often used to defend these salaries. And yes, technically, sports leagues are private businesses, and if people are willing to pay for tickets, merchandise, and TV subscriptions, then high salaries follow. But this logic ignores the broader question of what we, as a society, choose to value and reward.

Consider the professions that are truly essential to human well-being: doctors, nurses, teachers, social workers, firefighters, and scientists. These individuals dedicate years to training, often work in difficult conditions, and make contributions that quite literally keep society functioning. Yet many of them struggle to pay rent. Meanwhile, an athlete who hits a ball or runs with it earns thousands of times more.

Defenders of high athlete salaries argue that elite athletes are rare talents whose careers are short and physically demanding. This is true. But scarcity and difficulty are not unique to sport. Surgeons train for a decade and perform procedures that can save lives. Their work is also physically and mentally demanding, and yet their compensation is nowhere near that of a top footballer.

Others point out that athletes create enormous economic activity — they fill stadiums, support local businesses, and generate tax revenue. Again, this is partially true. But the same argument could be made for teachers, who educate the next generation of workers, innovators, and citizens.

I am not suggesting that athletes should be paid nothing, or even poorly. Athletic excellence is a genuine achievement that deserves recognition and fair reward. But when the gap between the highest and lowest earners in a society becomes so extreme, it speaks to a fundamental problem with our collective values. We need to redirect some of that wealth — through taxation and policy — toward the professions that hold our communities together.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author respond to the "market decides" argument?',
          options: [
            'By fully agreeing that market forces should always determine salaries.',
            'By arguing that market logic ignores the question of what society should truly value.',
            'By saying that sports leagues should be banned from operating as private businesses.',
            'By claiming that fans should stop paying to watch sports.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Are Professional Athletes Paid Too Much?

When a professional footballer signs a contract worth fifty million dollars per year, or a basketball player earns more in a single game than a teacher earns in a lifetime, it is natural to ask: are we getting our priorities right? I believe the astronomical salaries paid to professional athletes are fundamentally unjust and reflect deeply distorted values in our society.

The argument that "the market decides" is often used to defend these salaries. And yes, technically, sports leagues are private businesses, and if people are willing to pay for tickets, merchandise, and TV subscriptions, then high salaries follow. But this logic ignores the broader question of what we, as a society, choose to value and reward.

Consider the professions that are truly essential to human well-being: doctors, nurses, teachers, social workers, firefighters, and scientists. These individuals dedicate years to training, often work in difficult conditions, and make contributions that quite literally keep society functioning. Yet many of them struggle to pay rent. Meanwhile, an athlete who hits a ball or runs with it earns thousands of times more.

Defenders of high athlete salaries argue that elite athletes are rare talents whose careers are short and physically demanding. This is true. But scarcity and difficulty are not unique to sport. Surgeons train for a decade and perform procedures that can save lives. Their work is also physically and mentally demanding, and yet their compensation is nowhere near that of a top footballer.

Others point out that athletes create enormous economic activity — they fill stadiums, support local businesses, and generate tax revenue. Again, this is partially true. But the same argument could be made for teachers, who educate the next generation of workers, innovators, and citizens.

I am not suggesting that athletes should be paid nothing, or even poorly. Athletic excellence is a genuine achievement that deserves recognition and fair reward. But when the gap between the highest and lowest earners in a society becomes so extreme, it speaks to a fundamental problem with our collective values. We need to redirect some of that wealth — through taxation and policy — toward the professions that hold our communities together.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which professions does the author use as a contrast to show that essential workers are underpaid?',
          options: [
            'Lawyers, judges, and politicians.',
            'Engineers, architects, and urban planners.',
            'Doctors, teachers, nurses, firefighters, and scientists.',
            'Journalists, writers, and musicians.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Are Professional Athletes Paid Too Much?

When a professional footballer signs a contract worth fifty million dollars per year, or a basketball player earns more in a single game than a teacher earns in a lifetime, it is natural to ask: are we getting our priorities right? I believe the astronomical salaries paid to professional athletes are fundamentally unjust and reflect deeply distorted values in our society.

The argument that "the market decides" is often used to defend these salaries. And yes, technically, sports leagues are private businesses, and if people are willing to pay for tickets, merchandise, and TV subscriptions, then high salaries follow. But this logic ignores the broader question of what we, as a society, choose to value and reward.

Consider the professions that are truly essential to human well-being: doctors, nurses, teachers, social workers, firefighters, and scientists. These individuals dedicate years to training, often work in difficult conditions, and make contributions that quite literally keep society functioning. Yet many of them struggle to pay rent. Meanwhile, an athlete who hits a ball or runs with it earns thousands of times more.

Defenders of high athlete salaries argue that elite athletes are rare talents whose careers are short and physically demanding. This is true. But scarcity and difficulty are not unique to sport. Surgeons train for a decade and perform procedures that can save lives. Their work is also physically and mentally demanding, and yet their compensation is nowhere near that of a top footballer.

Others point out that athletes create enormous economic activity — they fill stadiums, support local businesses, and generate tax revenue. Again, this is partially true. But the same argument could be made for teachers, who educate the next generation of workers, innovators, and citizens.

I am not suggesting that athletes should be paid nothing, or even poorly. Athletic excellence is a genuine achievement that deserves recognition and fair reward. But when the gap between the highest and lowest earners in a society becomes so extreme, it speaks to a fundamental problem with our collective values. We need to redirect some of that wealth — through taxation and policy — toward the professions that hold our communities together.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The author admits that elite athletes have "rare talents" and short careers. What is the purpose of this admission?',
          options: [
            'To prove that athletes deserve higher salaries than doctors.',
            'To agree with defenders of high athlete salaries completely.',
            'To suggest that athletic careers should be extended through better healthcare.',
            'To show that the author is being fair before arguing that scarcity and difficulty also apply to other professions.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Are Professional Athletes Paid Too Much?

When a professional footballer signs a contract worth fifty million dollars per year, or a basketball player earns more in a single game than a teacher earns in a lifetime, it is natural to ask: are we getting our priorities right? I believe the astronomical salaries paid to professional athletes are fundamentally unjust and reflect deeply distorted values in our society.

The argument that "the market decides" is often used to defend these salaries. And yes, technically, sports leagues are private businesses, and if people are willing to pay for tickets, merchandise, and TV subscriptions, then high salaries follow. But this logic ignores the broader question of what we, as a society, choose to value and reward.

Consider the professions that are truly essential to human well-being: doctors, nurses, teachers, social workers, firefighters, and scientists. These individuals dedicate years to training, often work in difficult conditions, and make contributions that quite literally keep society functioning. Yet many of them struggle to pay rent. Meanwhile, an athlete who hits a ball or runs with it earns thousands of times more.

Defenders of high athlete salaries argue that elite athletes are rare talents whose careers are short and physically demanding. This is true. But scarcity and difficulty are not unique to sport. Surgeons train for a decade and perform procedures that can save lives. Their work is also physically and mentally demanding, and yet their compensation is nowhere near that of a top footballer.

Others point out that athletes create enormous economic activity — they fill stadiums, support local businesses, and generate tax revenue. Again, this is partially true. But the same argument could be made for teachers, who educate the next generation of workers, innovators, and citizens.

I am not suggesting that athletes should be paid nothing, or even poorly. Athletic excellence is a genuine achievement that deserves recognition and fair reward. But when the gap between the highest and lowest earners in a society becomes so extreme, it speaks to a fundamental problem with our collective values. We need to redirect some of that wealth — through taxation and policy — toward the professions that hold our communities together.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What solution does the author propose at the end of the article?',
          options: [
            'Setting a maximum salary limit for all professional athletes.',
            'Reducing the amount of money people spend on sports.',
            'Using taxation and policy to redirect wealth toward essential professions.',
            'Requiring athletes to work in public service for part of the year.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Are Professional Athletes Paid Too Much?

When a professional footballer signs a contract worth fifty million dollars per year, or a basketball player earns more in a single game than a teacher earns in a lifetime, it is natural to ask: are we getting our priorities right? I believe the astronomical salaries paid to professional athletes are fundamentally unjust and reflect deeply distorted values in our society.

The argument that "the market decides" is often used to defend these salaries. And yes, technically, sports leagues are private businesses, and if people are willing to pay for tickets, merchandise, and TV subscriptions, then high salaries follow. But this logic ignores the broader question of what we, as a society, choose to value and reward.

Consider the professions that are truly essential to human well-being: doctors, nurses, teachers, social workers, firefighters, and scientists. These individuals dedicate years to training, often work in difficult conditions, and make contributions that quite literally keep society functioning. Yet many of them struggle to pay rent. Meanwhile, an athlete who hits a ball or runs with it earns thousands of times more.

Defenders of high athlete salaries argue that elite athletes are rare talents whose careers are short and physically demanding. This is true. But scarcity and difficulty are not unique to sport. Surgeons train for a decade and perform procedures that can save lives. Their work is also physically and mentally demanding, and yet their compensation is nowhere near that of a top footballer.

Others point out that athletes create enormous economic activity — they fill stadiums, support local businesses, and generate tax revenue. Again, this is partially true. But the same argument could be made for teachers, who educate the next generation of workers, innovators, and citizens.

I am not suggesting that athletes should be paid nothing, or even poorly. Athletic excellence is a genuine achievement that deserves recognition and fair reward. But when the gap between the highest and lowest earners in a society becomes so extreme, it speaks to a fundamental problem with our collective values. We need to redirect some of that wealth — through taxation and policy — toward the professions that hold our communities together.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The word "astronomical" in the first paragraph is used to describe salaries that are:',
          options: [
            'Extremely large and difficult to imagine.',
            'Related to the science of astronomy and space.',
            'Paid to athletes who compete in international games.',
            'Calculated using a complex mathematical formula.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Are Professional Athletes Paid Too Much?

When a professional footballer signs a contract worth fifty million dollars per year, or a basketball player earns more in a single game than a teacher earns in a lifetime, it is natural to ask: are we getting our priorities right? I believe the astronomical salaries paid to professional athletes are fundamentally unjust and reflect deeply distorted values in our society.

The argument that "the market decides" is often used to defend these salaries. And yes, technically, sports leagues are private businesses, and if people are willing to pay for tickets, merchandise, and TV subscriptions, then high salaries follow. But this logic ignores the broader question of what we, as a society, choose to value and reward.

Consider the professions that are truly essential to human well-being: doctors, nurses, teachers, social workers, firefighters, and scientists. These individuals dedicate years to training, often work in difficult conditions, and make contributions that quite literally keep society functioning. Yet many of them struggle to pay rent. Meanwhile, an athlete who hits a ball or runs with it earns thousands of times more.

Defenders of high athlete salaries argue that elite athletes are rare talents whose careers are short and physically demanding. This is true. But scarcity and difficulty are not unique to sport. Surgeons train for a decade and perform procedures that can save lives. Their work is also physically and mentally demanding, and yet their compensation is nowhere near that of a top footballer.

Others point out that athletes create enormous economic activity — they fill stadiums, support local businesses, and generate tax revenue. Again, this is partially true. But the same argument could be made for teachers, who educate the next generation of workers, innovators, and citizens.

I am not suggesting that athletes should be paid nothing, or even poorly. Athletic excellence is a genuine achievement that deserves recognition and fair reward. But when the gap between the highest and lowest earners in a society becomes so extreme, it speaks to a fundamental problem with our collective values. We need to redirect some of that wealth — through taxation and policy — toward the professions that hold our communities together.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which best describes the author\'s stance toward professional athletes themselves?',
          options: [
            'The author believes athletes are dishonest and do not deserve any pay.',
            'The author fully supports current athlete salary levels.',
            'The author thinks athletes should compete purely for the love of the sport, without pay.',
            'The author respects athletic achievement but argues the pay gap is unjust.',
          ],
          answer: 3,
        },
      ],
    },
  ],
};

export default mock;
