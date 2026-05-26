import type { MockExam } from './types';

const PART5_TEXT = `Technology in the Classroom

Technology has changed the way students learn and study. In many schools around the world, students now use tablets, laptops, and smartphones as part of their daily education. These tools allow students to search for information quickly, watch educational videos, and communicate with their teachers and classmates.

One of the main advantages of using technology in the classroom is easy access to information. In the past, students had to rely only on textbooks and the school library. Today, they can find information on almost any topic in seconds. This makes research projects easier and more interesting.

Technology also helps students with different learning styles. Some students learn better by watching videos, while others prefer reading or listening to audio recordings. Digital tools make it possible to offer different types of content to meet these different needs.

However, technology also has disadvantages in the classroom. Many students use their phones to play games or check social media during lessons, which can be distracting. Some teachers report that students who use devices during class pay less attention and find it harder to remember what was taught.

Experts suggest that the key is balance. Technology should be used as a tool to support learning, not as a distraction. When students and teachers agree on clear rules about how devices are used, technology can make education more effective and enjoyable for everyone.`;

const PART6_TEXT = `Staying Safe Online

Social media platforms such as Instagram and TikTok have become an important part of life for millions of teenagers. These platforms offer many benefits: they allow young people to stay connected with friends, discover new music and ideas, and express themselves creatively.

However, social media also carries risks. One common problem is cyberbullying, which happens when someone uses technology to insult, threaten, or embarrass another person. Research shows that approximately one in three teenagers has experienced some form of cyberbullying. Unlike face-to-face bullying, online harassment can follow a person everywhere and is difficult to escape.

Another concern is the effect of social media on self-image. When young people constantly see photos of others looking perfect and happy, they may begin to feel that their own lives are not as good. This can lead to feelings of low self-esteem and sadness.

Experts recommend several strategies for using social media safely. Users should keep their profiles private so that only trusted friends and family can see their posts. They should also think carefully before sharing personal information such as their home address or school name. If someone receives an unpleasant message, experts advise not to reply in anger. Instead, it is better to block the sender and speak to a trusted adult.

The most important message is that social media is just one part of life. Spending time with friends and family in person, playing sports, and enjoying hobbies offline are equally important for personal wellbeing.`;

const PART7_TEXT = `Screen Time: How Much Is Too Much?

Screen time refers to the amount of time we spend looking at phones, tablets, computers, and televisions. In recent years, screen time has increased significantly. Studies show that teenagers in many countries spend an average of five or more hours per day in front of screens.

Technology offers clear benefits. Students use screens to complete homework, communicate with friends, watch educational content, and enjoy entertainment. Screens have become a central part of modern life, and it would be very difficult to avoid them completely.

However, health experts warn that too much screen time can have negative effects. Staring at a screen for long periods can cause eye strain, headaches, and poor posture. More importantly, using screens late at night can interfere with sleep. The light produced by screens signals to the brain that it is still daytime, which makes it harder to fall asleep and stay asleep.

Doctors recommend that teenagers limit their recreational screen time to no more than two hours per day. They also suggest avoiding screens for at least one hour before going to bed. Physical activity, time spent outdoors, and face-to-face conversations should not be replaced by time on screens.

Finding the right balance is a personal challenge. Some people decide to have specific "no phone" times each day, such as during meals or before sleeping. Others download apps that track or limit their screen usage. Whatever method a person chooses, the goal is the same: to enjoy the benefits of technology without allowing it to take control of daily life.`;

const mock: MockExam = {
  id: 'mock-11',
  examSlug: 'icfes',
  title: 'Mock 11 · Technology & Digital Life',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    // ── Part 1 — Vocabulary (5 questions) ────────────────────────────────────
    // Answers: 2, 0, 3, 1, 2   → 0×1, 1×1, 2×2, 3×1
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Choose the word that best matches each definition.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'A set of rules or instructions that a computer follows to solve a problem or complete a task.',
          options: ['bandwidth', 'firewall', 'algorithm', 'database'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'Harmful software designed to damage, disrupt, or gain unauthorized access to a computer system.',
          options: ['malware', 'firmware', 'shareware', 'middleware'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'The maximum amount of data that can be transmitted over a network connection in a given time.',
          options: ['latency', 'resolution', 'cache', 'bandwidth'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'To verify the identity of a user, device, or system before granting access to a resource.',
          options: ['navigate', 'authenticate', 'synchronize', 'calibrate'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'An early version of a product built to test a concept or design before full production begins.',
          options: ['replica', 'prototype', 'blueprint', 'template'],
          answer: 1,
        },
      ],
    },

    // ── Part 2 — Diálogos (9 questions) ──────────────────────────────────────
    // Answers: 0, 3, 1, 2, 0, 3, 2, 1, 3   → 0×2, 1×2, 2×2, 3×3
    {
      part: 2,
      title: 'Parte 2 — Diálogos',
      instructions: 'Read each dialogue and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p2q1',
          part: 2,
          stimulus: 'Tech support: "Have you tried restarting the device?"\nUser: "Yes, twice. It\'s still showing the same error."\nTech support: _______',
          text: 'What is the most appropriate next step from tech support?',
          options: [
            '"In that case, let\'s check whether the software is up to date."',
            '"Then there is nothing we can do remotely."',
            '"Please restart it one more time."',
            '"You should buy a new device."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Student A: "Did you read the article about facial recognition software?"\nStudent B: "I did. I think the privacy concerns are overblown."\nStudent A: _______',
          text: 'Which response best continues a balanced academic discussion?',
          options: [
            '"You are completely right. There is nothing to worry about."',
            '"I disagree. Privacy concerns are not relevant to technology."',
            '"Maybe, but some researchers argue the risks are actually underreported."',
            '"I would rather not discuss technology topics in school."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Manager: "Our new app has been downloaded over a million times, but user retention is only 20%."\nDeveloper: _______',
          text: 'Which response shows the most relevant professional insight?',
          options: [
            '"That is not bad for a new app."',
            '"We should look at the onboarding experience — most users probably drop off in the first session."',
            '"Downloads are the only metric that matters."',
            '"We need a bigger marketing budget."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Parent: "My daughter spends six hours a day on social media. Should I be worried?"\nCounselor: "That is quite a lot of screen time. Has her sleep or schoolwork been affected?"\nParent: "She does seem more anxious and her grades have dropped."\nCounselor: _______',
          text: 'What is the most professionally appropriate response from the counselor?',
          options: [
            '"Those symptoms are unrelated to screen time."',
            '"You should take her phone away permanently."',
            '"That is normal for teenagers today."',
            '"Those changes are worth addressing. Setting time limits and having an open conversation with her would be good first steps."',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Colleague A: "I forgot my password again and I\'m locked out of the system."\nColleague B: _______',
          text: 'Which response is the most helpful and appropriate?',
          options: [
            '"You should contact IT to reset your credentials — they can verify your identity and unlock the account."',
            '"Just use someone else\'s login for now."',
            '"You should write your password on a sticky note next time."',
            '"That is not a problem I can help with."',
          ],
          answer: 0,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Journalist: "Do you think AI will replace most jobs in the next decade?"\nEconomist: "It is unlikely to be that simple. History shows that technology tends to eliminate certain tasks while creating new categories of work."\nJournalist: _______',
          text: 'What is the most logical follow-up from the journalist?',
          options: [
            '"So you think job losses are not real?"',
            '"In other words, the impact will depend on how quickly workers can adapt to new roles?"',
            '"Then AI is not something we need to worry about at all."',
            '"Can you give an example of technology that destroyed all existing jobs?"',
          ],
          answer: 3,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Student: "I don\'t understand why my code keeps crashing."\nTeacher: "Show me the error message."\nStudent: "It says \'null pointer exception\'."\nTeacher: _______',
          text: 'What is the most useful response from the teacher?',
          options: [
            '"That error message means very little without more context."',
            '"Restart your computer and try again."',
            '"That usually means your code is trying to use a variable that hasn\'t been assigned a value yet. Check where you initialize that object."',
            '"You should choose a different programming language."',
          ],
          answer: 2,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Customer: "I read your privacy policy, but I\'m not sure what data you actually collect."\nCompany representative: _______',
          text: 'What is the most transparent and appropriate response?',
          options: [
            '"Our privacy policy is publicly available and covers everything."',
            '"We collect usage data, device information, and location if you grant permission. You can review and delete your data in account settings."',
            '"We do not share your data with anyone, so there is nothing to worry about."',
            '"Our data practices are standard for the industry."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Friend A: "I got a message saying I won a prize and they need my bank details to send it."\nFriend B: _______',
          text: 'What is the most appropriate warning from Friend B?',
          options: [
            '"That sounds exciting! Send your details quickly before the offer expires."',
            '"Make sure you use a secure connection when submitting your information."',
            '"Ask them to mail the prize instead."',
            '"Do not respond to that — it is almost certainly a phishing scam designed to steal your financial information."',
          ],
          answer: 3,
        },
      ],
    },

    // ── Part 3 — Completar texto (9 questions) ────────────────────────────────
    // Cloze passage about smartphones changing communication
    // Answers: 0, 3, 2, 1, 0, 3, 2, 0, 1   → 0×3, 1×2, 2×2, 3×2
    {
      part: 3,
      title: 'Parte 3 — Completar texto',
      instructions: 'Read the passage and choose the best option for each numbered blank.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (1).',
          text: 'Blank (1): "Smartphones have fundamentally _______ the way human beings communicate..."',
          options: ['transformed', 'transform', 'transforming', 'will transform'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (2).',
          text: 'Blank (2): "...constant connectivity has become the norm, _______ it easier than ever..."',
          options: ['made', 'make', 'makes', 'making'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (3).',
          text: 'Blank (3): "...professionals can collaborate _______ their physical location."',
          options: ['because of', 'due to', 'regardless of', 'in spite'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (4).',
          text: 'Blank (4): "...the quality of communication has _______ declined in certain respects."',
          options: ['noticeably', 'notice', 'noticeable', 'noticing'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (5).',
          text: 'Blank (5): "...many younger people _______ developing the patience required for longer forms of communication."',
          options: ['are struggling with', 'struggle at', 'are struggling to', 'have struggled for'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (6).',
          text: 'Blank (6): "Research _______ that heavy smartphone users report higher levels of stress..."',
          options: ['is indicating', 'indicated', 'has indicated', 'will indicate'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (7).',
          text: 'Blank (7): "_______ these drawbacks, few would argue that the smartphone should be abandoned altogether."',
          options: ['Therefore', 'Although', 'Despite', 'Unless'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (8).',
          text: 'Blank (8): "_______, the challenge facing individuals and societies is to establish healthier boundaries..."',
          options: ['Rather', 'Moreover', 'However', 'For instance'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          stimulus: `Smartphones have fundamentally (1) the way human beings communicate with one another. Before their widespread adoption, staying in touch required deliberate effort: people wrote letters, arranged phone calls in advance, or met face to face. Now, however, constant connectivity has become the norm, (2) it easier than ever to share information instantly across any distance. This shift has brought undeniable benefits — families separated by thousands of kilometres can video-call daily, and professionals can collaborate (3) their physical location. Nevertheless, critics argue that the quality of communication has (4) declined in certain respects. Face-to-face conversations are frequently interrupted by notifications, and the pressure to respond immediately to messages has created a culture of constant availability that many find exhausting. Furthermore, the informality encouraged by messaging apps means that many younger people (5) developing the patience required for longer, more structured forms of communication, such as professional emails or formal letters. Research (6) that heavy smartphone users report higher levels of stress linked to communication overload — the feeling that one can never truly disconnect. (7) these drawbacks, few would argue that the smartphone should be abandoned altogether. (8), the challenge facing individuals and societies is to establish healthier boundaries around connectivity — to use these powerful tools (9) allowing them to dominate every aspect of daily life.`,
          stimulusLabel: 'Read the passage and choose the correct answer for blank (9).',
          text: 'Blank (9): "...to use these powerful tools _______ allowing them to dominate every aspect of daily life."',
          options: ['so that', 'unless', 'without', 'despite'],
          answer: 2,
        },
      ],
    },

    // ── Part 4 — Comprensión visual (9 questions) ─────────────────────────────
    // Answers: 3, 1, 0, 2, 3, 0, 1, 3, 2
    {
      part: 4,
      title: 'Parte 4 — Comprensión visual',
      instructions: 'Read each notice or sign carefully and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: 'NEXTECH CAMPUS — VISITOR POLICY\n——————————————\nAll visitors must:\n• Register at Reception and receive a visitor badge\n• Be accompanied by a staff member at all times\n• Not enter server rooms or R&D areas under any circumstances\n• Hand in badge upon departure\n\nUnregistered visitors may be escorted from the premises.\nFor appointments: reception@nextech.io',
          stimulusLabel: 'Read the company notice.',
          text: 'According to the notice, which area is strictly off-limits to visitors?',
          options: [
            'The reception area.',
            'Meeting rooms.',
            'The car park.',
            'Server rooms and R&D areas.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: 'NEXTECH CAMPUS — VISITOR POLICY\n——————————————\nAll visitors must:\n• Register at Reception and receive a visitor badge\n• Be accompanied by a staff member at all times\n• Not enter server rooms or R&D areas under any circumstances\n• Hand in badge upon departure\n\nUnregistered visitors may be escorted from the premises.\nFor appointments: reception@nextech.io',
          stimulusLabel: 'Read the company notice.',
          text: 'What happens to visitors who arrive without registering?',
          options: [
            'They may be asked to leave the building.',
            'They receive a temporary pass at the door.',
            'They must wait in the car park until a staff member arrives.',
            'They are directed to the R&D area.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'CENTRAL PUBLIC LIBRARY — DIGITAL SERVICES\n——————————————\nLibrary card holders can now access:\n• E-books and audiobooks (up to 5 loans at a time)\n• Online newspaper and magazine archive (30+ publications)\n• Language learning platforms (unlimited sessions)\n• Digital film collection (streaming only — no download)\n\nNote: Some services require in-library login for first-time activation.\nVisit the Help Desk or go to: library.digital/help',
          stimulusLabel: 'Read the library digital services notice.',
          text: 'Which digital service does NOT allow users to download content?',
          options: [
            'E-books.',
            'Audiobooks.',
            'Language learning platforms.',
            'The digital film collection.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'CENTRAL PUBLIC LIBRARY — DIGITAL SERVICES\n——————————————\nLibrary card holders can now access:\n• E-books and audiobooks (up to 5 loans at a time)\n• Online newspaper and magazine archive (30+ publications)\n• Language learning platforms (unlimited sessions)\n• Digital film collection (streaming only — no download)\n\nNote: Some services require in-library login for first-time activation.\nVisit the Help Desk or go to: library.digital/help',
          stimulusLabel: 'Read the library digital services notice.',
          text: 'A user who wishes to begin using these services for the first time should most likely:',
          options: [
            'Download all services before visiting the library.',
            'Contact library.digital/help by telephone.',
            'Visit the library in person for initial activation if required.',
            'Apply for a new library card at the Help Desk.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'SOFTWARE END-USER LICENSE AGREEMENT (EULA) — SUMMARY\n——————————————\nBy installing this software you agree to the following:\n• This license is non-transferable and for personal use only.\n• You may install the software on up to 3 devices registered to your account.\n• Reverse engineering or redistribution of this software is prohibited.\n• The developer is not liable for data loss resulting from software use.\n• This agreement is governed by the laws of the State of California, USA.\n\nFull terms: legal.softwarecorp.com/eula',
          stimulusLabel: 'Read the software license summary.',
          text: 'According to the license, what does the developer NOT accept responsibility for?',
          options: [
            'Providing updates to the software.',
            'Restricting installation to personal use.',
            'Data loss caused by using the software.',
            'Governing the agreement under California law.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'SOFTWARE END-USER LICENSE AGREEMENT (EULA) — SUMMARY\n——————————————\nBy installing this software you agree to the following:\n• This license is non-transferable and for personal use only.\n• You may install the software on up to 3 devices registered to your account.\n• Reverse engineering or redistribution of this software is prohibited.\n• The developer is not liable for data loss resulting from software use.\n• This agreement is governed by the laws of the State of California, USA.\n\nFull terms: legal.softwarecorp.com/eula',
          stimulusLabel: 'Read the software license summary.',
          text: 'Which of the following actions would violate this license agreement?',
          options: [
            'Installing the software on a second personal computer.',
            'Reading the full terms at the developer\'s website.',
            'Sharing the software with a friend on their device.',
            'Using the software on a device registered to your account.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'COMPUTER LABORATORY — RULES FOR STUDENTS\n——————————————\n• Log in using your student ID only. Shared logins are NOT permitted.\n• Save work to your personal cloud folder — local drives are wiped daily.\n• Food, drink, and mobile phones are not permitted at workstations.\n• Printing is limited to 20 pages per session. Report malfunctions to staff.\n• Do not install software. Report any unauthorized programs found.\n• Lab closes at 8:00 PM. Unsaved work will be lost.',
          stimulusLabel: 'Read the computer lab rules.',
          text: 'Why is it particularly important to save work to the cloud folder rather than locally?',
          options: [
            'The lab computers do not have local storage.',
            'Local drives are cleared every day, so files saved there will be lost.',
            'Cloud folders have a larger storage capacity than local drives.',
            'The cloud folder is required for printing documents.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'COMPUTER LABORATORY — RULES FOR STUDENTS\n——————————————\n• Log in using your student ID only. Shared logins are NOT permitted.\n• Save work to your personal cloud folder — local drives are wiped daily.\n• Food, drink, and mobile phones are not permitted at workstations.\n• Printing is limited to 20 pages per session. Report malfunctions to staff.\n• Do not install software. Report any unauthorized programs found.\n• Lab closes at 8:00 PM. Unsaved work will be lost.',
          stimulusLabel: 'Read the computer lab rules.',
          text: 'Which of the following is NOT explicitly mentioned in the lab rules?',
          options: [
            'The time the lab closes.',
            'The limit on the number of pages that can be printed.',
            'The procedure for reporting unauthorized software.',
            'The cost of printing per page.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'TECHFAIR 2026 — REGISTRATION OPEN\n——————————————\nJoin us for the region\'s largest student technology expo!\nDate: March 14–15, 2026 | Venue: City Convention Centre\nOpen to: Secondary and university students\nActivities: Robotics competition, AI demos, startup pitches, coding workshops\nEarly registration discount: 30% off before February 1st\nRegister: techfair2026.edu/register\n\nNote: Group registrations (5+ students) receive an additional 10% discount.',
          stimulusLabel: 'Read the event notice.',
          text: 'A group of six university students who register before February 1st would receive a total discount of:',
          options: [
            '10% only, since the early discount applies only to individuals.',
            '30% only, since group discounts and early registration discounts cannot be combined.',
            'An unspecified amount determined at the door.',
            '40%, combining the early registration and group discounts.',
          ],
          answer: 3,
        },
      ],
    },

    // ── Part 5 — Texto corto (9 questions) ────────────────────────────────────
    // Answers: 1, 3, 0, 2, 1, 0, 3, 2, 1
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the article and answer the questions.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the main topic of the article?',
          options: [
            'The history of computers in schools.',
            'The advantages and disadvantages of using technology in education.',
            'How smartphones were invented.',
            'Why students should not use the internet.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, how has technology changed access to information for students?',
          options: [
            'Students now need to visit the library more often.',
            'Students can only find information about specific school subjects.',
            'Students can find information on almost any topic in seconds.',
            'Students receive printed materials delivered to their homes.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is one advantage of digital tools for students with different learning styles?',
          options: [
            'They can attend school without a teacher.',
            'They can receive different types of content that match how they learn best.',
            'They are no longer required to take exams.',
            'They automatically translate all materials into other languages.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What do some teachers report about students who use devices during class?',
          options: [
            'They ask more questions and participate more.',
            'They finish their work faster than other students.',
            'They pay less attention and find it harder to remember what was taught.',
            'They show better results in their exams.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, what is the disadvantage of using technology in the classroom mentioned in the fourth paragraph?',
          options: [
            'Technology is very expensive for schools to buy.',
            'Students may get distracted by games and social media on their devices.',
            'Not all students have access to smartphones or tablets.',
            'Technology causes problems with the school internet connection.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The word "distraction" as used in the text most likely means:',
          options: [
            'Something that helps students focus better.',
            'A technical problem with a device.',
            'Something that takes attention away from what a person should be doing.',
            'A new type of educational application.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to experts quoted in the text, what should technology be used for in schools?',
          options: [
            'To replace teachers completely.',
            'As a tool to support learning, not as a distraction.',
            'Only for entertainment during breaks.',
            'To communicate with friends from other schools.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What does the text say students and teachers need to do for technology to work well in education?',
          options: [
            'Use only the newest and most expensive devices.',
            'Avoid using technology during difficult subjects.',
            'Agree on clear rules about how devices are used.',
            'Ask the government to pay for all school technology.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: PART5_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the general message of the final paragraph?',
          options: [
            'Technology should be removed from all classrooms immediately.',
            'Technology is perfect and has no negative effects on learning.',
            'With proper rules and balance, technology can improve education for everyone.',
            'Only rich schools can benefit from using technology.',
          ],
          answer: 2,
        },
      ],
    },

    // ── Part 6 — Texto largo: inferencia (7 questions) ────────────────────────
    // Answers: 1, 0, 3, 2, 0, 3, 1
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the article carefully and answer the questions. Some questions ask about implied meaning.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the main purpose of the article?',
          options: [
            'To explain why teenagers should not use social media at all.',
            'To describe both the benefits and risks of social media for teenagers.',
            'To show that cyberbullying does not affect most teenagers.',
            'To explain how social media companies make money.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, what is cyberbullying?',
          options: [
            'Using technology to insult, threaten, or embarrass another person.',
            'Spending too much time playing games online.',
            'Sharing videos of people without their permission.',
            'Using social media to make new friends.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'How is online bullying different from face-to-face bullying, according to the article?',
          options: [
            'Online bullying happens less often than face-to-face bullying.',
            'Face-to-face bullying is more serious than online bullying.',
            'Online bullying only affects older teenagers.',
            'Online harassment is harder to escape because it can follow a person everywhere.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The word "self-image" in the third paragraph most likely means:',
          options: [
            'A photo that a person takes of themselves.',
            'How popular a person is on social media.',
            'The way a person sees and feels about themselves.',
            'A type of filter used on social media photos.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, what is the first safety strategy experts recommend for social media users?',
          options: [
            'Keep profiles private so only trusted friends and family can see your posts.',
            'Never use social media platforms.',
            'Report all negative comments to the platform.',
            'Always post with a parent or guardian present.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What does the article say you should do if you receive an unpleasant message online?',
          options: [
            'Reply immediately to defend yourself.',
            'Delete your social media account.',
            'Share the message with all your friends.',
            'Block the sender and talk to a trusted adult.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: PART6_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred from the final paragraph about the author\'s view?',
          options: [
            'Social media is the most important part of a teenager\'s life.',
            'Having a balanced life with both online and offline activities is the healthiest approach.',
            'Teenagers should only use social media for school-related activities.',
            'Parents should control all social media use.',
          ],
          answer: 1,
        },
      ],
    },

    // ── Part 7 — Texto de opinión (7 questions) ───────────────────────────────
    // Answers: 0, 2, 1, 3, 0, 2, 1
    {
      part: 7,
      title: 'Parte 7 — Texto de opinión',
      instructions: 'Read the article and answer the questions.',
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'How is "screen time" defined in the text?',
          options: [
            'The amount of time we spend looking at phones, tablets, computers, and televisions.',
            'The time we spend studying at school.',
            'The number of apps installed on a device.',
            'The time spent talking on the phone.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to health experts, what physical effects can too much screen time cause?',
          options: [
            'Weight gain and poor nutrition.',
            'Improved memory and concentration.',
            'Eye strain, headaches, and poor posture.',
            'Stronger eyesight over time.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'Why does using screens late at night make it harder to sleep?',
          options: [
            'Screens produce sounds that keep the brain awake.',
            'The light from screens signals to the brain that it is still daytime.',
            'Looking at screens makes the eyes tired and uncomfortable.',
            'Screens often show exciting content that makes people feel nervous.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'How many hours of recreational screen time per day do doctors recommend for teenagers?',
          options: [
            'No more than four hours per day.',
            'No more than three hours per day.',
            'No more than one hour per day.',
            'No more than two hours per day.',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'The word "recreational" in the text most likely means:',
          options: [
            'Done for fun or entertainment, not for work or study.',
            'Related to sports and physical activity.',
            'Required by school or an employer.',
            'Used outdoors, not inside the house.',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, some people use apps to help manage screen time. What do these apps do?',
          options: [
            'They block all access to social media permanently.',
            'They automatically turn off devices at bedtime.',
            'They track or limit how much time a person spends on screens.',
            'They remind users to exercise every hour.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: PART7_TEXT,
          stimulusLabel: 'Read the article.',
          text: 'What is the main message of the final paragraph?',
          options: [
            'People should avoid all technology in daily life.',
            'Each person should find a way to enjoy technology without letting it control their life.',
            'Only teenagers need to worry about managing screen time.',
            'Screen time is never harmful if you feel comfortable using it.',
          ],
          answer: 1,
        },
      ],
    },
  ],
};

export default mock;
