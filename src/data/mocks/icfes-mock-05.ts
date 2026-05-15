import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-05',
  examSlug: 'icfes',
  title: 'Mock 5 · Comida y cultura',
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
          text: 'A person who is professionally trained to prepare and cook food in a restaurant.',
          options: ['Waiter', 'Chef', 'Farmer', 'Grocer'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'The list of dishes available in a restaurant, along with their prices.',
          options: ['Recipe', 'Bill', 'Menu', 'Order'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'A set of instructions that explains how to prepare a particular dish.',
          options: ['Ingredient', 'Recipe', 'Portion', 'Cuisine'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'The style of cooking that is typical of a particular country or region.',
          options: ['Flavor', 'Cuisine', 'Spice', 'Texture'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'Food that has not been cooked, processed, or changed from its natural state.',
          options: ['Frozen', 'Fried', 'Raw', 'Baked'],
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
          stimulus: 'Waiter: "Are you ready to order, or do you need a few more minutes?"\nCustomer: _______',
          text: 'What is the best response for the customer?',
          options: [
            '"The restaurant closes at ten."',
            '"I\'ll have the grilled salmon, please."',
            '"I prefer to cook at home."',
            '"The menu looks expensive."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Chef A: "Why did you add so much salt to the soup?"\nChef B: _______',
          text: 'What does Chef B say?',
          options: [
            '"I forgot to turn off the stove."',
            '"Sorry, I misread the recipe. I will make a fresh batch."',
            '"The soup is already on the table."',
            '"Salt is not in the ingredient list."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Friend A: "Have you ever tried Japanese food?"\nFriend B: "Not yet. Is it very different from what we usually eat?"\nFriend A: _______',
          text: 'What does Friend A say?',
          options: [
            '"Japan is very far from here."',
            '"Yes, it uses a lot of raw fish and soy sauce, which is quite different."',
            '"I always eat at home on Fridays."',
            '"They also have pizza there."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'Customer: "Excuse me, I ordered my steak medium, but this one is well done."\nWaiter: _______',
          text: 'What is the waiter\'s most appropriate response?',
          options: [
            '"You should have ordered differently."',
            '"I\'m sorry about that. I\'ll bring you a new one right away."',
            '"Our chef is very experienced."',
            '"The kitchen is very busy tonight."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Parent: "What do you want for dinner tonight?"\nChild: "Can we have tacos? I learned about Mexican food at school today."\nParent: _______',
          text: 'Which response is most natural for the parent?',
          options: [
            '"Mexico is a country in North America."',
            '"Sure! I\'ll pick up the ingredients on my way home."',
            '"You should focus more on your homework."',
            '"The grocery store is closed on Tuesdays."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Student A: "I\'m going to the food festival this weekend. Want to come?"\nStudent B: _______',
          text: 'What does Student B say?',
          options: [
            '"I already ate lunch."',
            '"That sounds great! What kind of food will there be?"',
            '"Festivals are too loud for me."',
            '"I don\'t know how to cook."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Cooking teacher: "Before you start, make sure all your ingredients are measured and ready."\nStudent: _______',
          text: 'What does the student say?',
          options: [
            '"The recipe uses too many steps."',
            '"Got it. Should I preheat the oven as well?"',
            '"I left my apron at home."',
            '"The ingredients are in the fridge."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Host: "Would you like some more dessert? There\'s plenty left."\nGuest: _______',
          text: 'What is the guest\'s most polite response?',
          options: [
            '"I don\'t like sweets at all."',
            '"Yes, please! The cake is absolutely delicious."',
            '"Why did you make so much?"',
            '"Dessert is bad for your health."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Traveler: "What is the most traditional dish in your country?"\nLocal guide: _______',
          text: 'What does the guide say?',
          options: [
            '"We have a lot of tourist attractions."',
            '"It\'s bandeja paisa — a hearty plate with beans, rice, meat, and plantains."',
            '"Most people here eat fast food."',
            '"Our restaurants open at noon."',
          ],
          answer: 1,
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
          text: 'The chef _______ the vegetables in olive oil before adding them to the soup.',
          options: ['fried', 'is frying', 'fry', 'had fry'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'This recipe requires _______ sugar than the original version because we want it to be less sweet.',
          options: ['fewer', 'more', 'less', 'much'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'If you _______ the garlic too long, it will burn and taste bitter.',
          options: ['cook', 'will cook', 'cooking', 'cooked'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'The restaurant _______ for over thirty years and is still one of the best in the city.',
          options: ['operates', 'has been operating', 'was operating', 'operated'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'She decided to become a vegetarian _______ she learned about the environmental impact of meat production.',
          options: ['after', 'although', 'despite', 'while'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'The traditional festival food is _______ prepared by grandmothers who have kept the recipes for generations.',
          options: ['rarely', 'usually', 'hardly', 'never'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'You should _______ the dough for at least ten minutes to make the bread fluffy and light.',
          options: ['knead', 'slice', 'pour', 'drain'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'The menu _______ several options for people with allergies, including gluten-free pasta.',
          options: ['offers', 'offering', 'to offer', 'offered'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'Food _______ from one culture to another through trade, migration, and travel throughout history.',
          options: ['spread', 'spreads', 'has spread', 'is spread'],
          answer: 0,
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
          stimulus: '--- RESTAURANT NOTICE ---\nLA COCINA INTERNACIONAL\nOpen Tuesday – Sunday, 12:00 PM – 10:00 PM\nClosed on Mondays\nReservations required for groups of 6 or more.\nAll dishes contain possible allergens. Please inform your server of any dietary restrictions.\nWi-Fi password: foodlover2024',
          stimulusLabel: 'Read the restaurant notice.',
          text: 'When is La Cocina Internacional closed?',
          options: [
            'On Sundays.',
            'On Mondays.',
            'On weekends.',
            'Every afternoon.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- RESTAURANT NOTICE ---\nLA COCINA INTERNACIONAL\nOpen Tuesday – Sunday, 12:00 PM – 10:00 PM\nClosed on Mondays\nReservations required for groups of 6 or more.\nAll dishes contain possible allergens. Please inform your server of any dietary restrictions.\nWi-Fi password: foodlover2024',
          stimulusLabel: 'Read the restaurant notice.',
          text: 'What must customers with dietary restrictions do?',
          options: [
            'Call the restaurant in advance.',
            'Order only from a special menu.',
            'Tell their server about their needs.',
            'Bring their own food.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'COOKING CLASS SCHEDULE — JUNE\nMondayS: Beginner Baking · 9:00 AM – 11:00 AM · $20 per person\nWednesdays: Asian Street Food · 5:00 PM – 7:00 PM · $25 per person\nFridays: Italian Pasta & Sauces · 6:00 PM – 8:30 PM · $30 per person\n* All classes include ingredients and a take-home recipe card.\n* Maximum 12 students per class.',
          stimulusLabel: 'Read the cooking class schedule.',
          text: 'Which class is the most expensive?',
          options: [
            'Beginner Baking.',
            'Asian Street Food.',
            'Italian Pasta & Sauces.',
            'They all cost the same.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'COOKING CLASS SCHEDULE — JUNE\nMondayS: Beginner Baking · 9:00 AM – 11:00 AM · $20 per person\nWednesdays: Asian Street Food · 5:00 PM – 7:00 PM · $25 per person\nFridays: Italian Pasta & Sauces · 6:00 PM – 8:30 PM · $30 per person\n* All classes include ingredients and a take-home recipe card.\n* Maximum 12 students per class.',
          stimulusLabel: 'Read the cooking class schedule.',
          text: 'What is included with every cooking class?',
          options: [
            'A printed cookbook.',
            'Ingredients and a recipe card.',
            'A free lunch after the class.',
            'A certificate of completion.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'FOOD SAFETY REMINDER\nAll kitchen staff must:\n• Wash hands before handling food.\n• Keep raw meat separate from vegetables.\n• Check expiry dates before use.\n• Store cooked food at or below 4°C.\nFailure to follow these rules may result in disciplinary action.',
          stimulusLabel: 'Read the food safety sign.',
          text: 'According to the sign, where should cooked food be stored?',
          options: [
            'At room temperature.',
            'At or below 4°C.',
            'In a dry, dark cupboard.',
            'Above raw meat in the fridge.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'FOOD SAFETY REMINDER\nAll kitchen staff must:\n• Wash hands before handling food.\n• Keep raw meat separate from vegetables.\n• Check expiry dates before use.\n• Store cooked food at or below 4°C.\nFailure to follow these rules may result in disciplinary action.',
          stimulusLabel: 'Read the food safety sign.',
          text: 'What might happen if a staff member does not follow the food safety rules?',
          options: [
            'They will receive a bonus.',
            'They will be asked to retake training.',
            'They may face disciplinary action.',
            'They will be moved to a different shift.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'FARMERS\' MARKET — SATURDAY ONLY\nEvery Saturday, 7:00 AM – 2:00 PM\nFresh fruits · Vegetables · Homemade cheeses · Artisan breads\nOnly local producers. No imported goods.\nBring your own bag — plastic bags are not provided.',
          stimulusLabel: 'Read the market sign.',
          text: 'What does the market ask shoppers to bring?',
          options: [
            'Their own containers for cheese.',
            'Cash payment only.',
            'Their own bags.',
            'A list of ingredients.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'FARMERS\' MARKET — SATURDAY ONLY\nEvery Saturday, 7:00 AM – 2:00 PM\nFresh fruits · Vegetables · Homemade cheeses · Artisan breads\nOnly local producers. No imported goods.\nBring your own bag — plastic bags are not provided.',
          stimulusLabel: 'Read the market sign.',
          text: 'Which statement about the market is TRUE?',
          options: [
            'The market sells imported goods from other countries.',
            'Only products made by local producers are sold there.',
            'The market is open every day of the week.',
            'Shoppers can find plastic bags at the entrance.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'SPECIAL DINNER MENU — FRIDAY & SATURDAY\nStarter: Soup of the day or garden salad\nMain: Choice of grilled chicken, beef tenderloin, or vegetable pasta\nDessert: Chocolate lava cake or seasonal fruit\nPrice: $35 per person (drinks not included)\nBooking recommended: call 555-0147',
          stimulusLabel: 'Read the dinner menu.',
          text: 'What is NOT included in the $35 dinner price?',
          options: [
            'A starter.',
            'A main course.',
            'Drinks.',
            'Dessert.',
          ],
          answer: 2,
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
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main purpose of GlobalTable Cooking School?',
          options: [
            'To train professional restaurant chefs for international competitions.',
            'To teach people how to cook authentic dishes from different countries.',
            'To sell imported ingredients from around the world.',
            'To promote Colombian cuisine in other countries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'What do students learn in addition to following recipes?',
          options: [
            'How to manage a restaurant business.',
            'How to grow their own ingredients.',
            'The cultural stories behind the dishes.',
            'How to translate menus into other languages.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'How many students can attend a single class at GlobalTable?',
          options: [
            'Up to 5.',
            'Up to 10.',
            'Up to 20.',
            'Up to 50.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, what have many graduates done after completing the program?',
          options: [
            'Moved to other countries to study further.',
            'Opened restaurants or started catering businesses.',
            'Become food safety inspectors.',
            'Joined the GlobalTable teaching team.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "authentic" in the first paragraph most likely means:',
          options: [
            'Expensive and rare.',
            'Simple and quick to prepare.',
            'Genuine and true to the original tradition.',
            'Modern and adapted for local tastes.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'Who teaches the classes at GlobalTable?',
          options: [
            'University professors of nutrition.',
            'Students who graduated from the program.',
            'Experienced instructors, many of whom cooked professionally in their home countries.',
            'Celebrity chefs from international TV shows.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'What option does the school offer for people with busy weekday schedules?',
          options: [
            'Online classes that can be watched at any time.',
            'Weekend intensive courses.',
            'A self-study recipe booklet.',
            'Private one-on-one lessons on weekday evenings.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'According to GlobalTable\'s philosophy, learning to cook international food is also a way to:',
          options: [
            'Earn more money in the restaurant industry.',
            'Connect with other cultures and build bridges between people.',
            'Win cooking competitions at a national level.',
            'Reduce food waste in the community.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `GlobalTable Cooking School: Learning to Cook the World

GlobalTable Cooking School opened its doors three years ago in Bogotá with a simple mission: to teach people how to prepare authentic dishes from around the world. The school offers a wide variety of courses, from beginner classes in Thai and Japanese cuisine to advanced workshops on French pastry and Moroccan tagine.

Each week, students explore a different country's culinary traditions. They learn not only how to follow recipes, but also the cultural stories behind each dish. A class on Italian pasta, for example, includes a short presentation on the history of pasta in southern Italy and the different shapes used in different regions.

Classes are small — no more than ten students — and led by experienced instructors, many of whom have cooked professionally in their home countries. The school also runs weekend intensives for people who cannot attend regular weekly classes.

So far, more than 800 students have graduated from the program, and many have gone on to open their own restaurants or start catering businesses. GlobalTable believes that learning to cook international food is not just a skill — it is a way to connect with other cultures and build bridges between people.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about GlobalTable Cooking School?',
          options: [
            'It only accepts students who already have cooking experience.',
            'It focuses exclusively on Colombian and Latin American cuisine.',
            'It has had a positive impact on the local food industry.',
            'It plans to close after graduating 1,000 students.',
          ],
          answer: 2,
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
          stimulus: `How Globalization Is Changing What We Eat

Fifty years ago, most people ate food that came from their local region. Farmers grew what the climate and soil allowed, and families prepared dishes using ingredients that had been part of their culture for generations. Eating was deeply local, seasonal, and traditional.

Today, that picture looks very different. Walk into any supermarket in a modern city and you will find mangoes from Peru, cheese from France, coffee from Ethiopia, and noodles from Japan — all in the same aisle. Globalization, driven by international trade, migration, and digital communication, has transformed food systems around the world.

The effects are mixed. On one hand, access to a greater variety of foods has improved nutrition for many people. Imported products have introduced new vitamins, minerals, and dietary options that were not available before. Fusion cuisine — which blends ingredients and techniques from different cultures — has sparked enormous creativity in the culinary world. Popular dishes like sushi burritos or Korean tacos reflect this exciting cultural exchange.

On the other hand, globalization has also brought challenges. Many traditional food practices are disappearing as younger generations prefer international fast food over local dishes. Small local farmers often struggle to compete with cheaper imported products, which can threaten rural economies. In some regions, highly processed and packaged foods have replaced fresh, whole foods, contributing to rising rates of obesity and diet-related illnesses.

There is also the environmental cost. Transporting food across oceans and continents produces significant greenhouse gas emissions. A strawberry grown in Spain and sold in Canada has a much larger carbon footprint than one grown locally.

Despite these concerns, the trend toward global food systems is unlikely to reverse. Instead, experts argue that the key is balance — embracing the benefits of culinary diversity while protecting local food traditions, supporting local farmers, and making more environmentally conscious food choices. What we eat is no longer just a personal or cultural decision; it has become a global responsibility.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main idea of this text?',
          options: [
            'Globalization has made food cheaper for everyone.',
            'Traditional food practices are disappearing because of climate change.',
            'Globalization has transformed food habits worldwide, with both benefits and drawbacks.',
            'People should stop eating imported food to protect the environment.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `How Globalization Is Changing What We Eat

Fifty years ago, most people ate food that came from their local region. Farmers grew what the climate and soil allowed, and families prepared dishes using ingredients that had been part of their culture for generations. Eating was deeply local, seasonal, and traditional.

Today, that picture looks very different. Walk into any supermarket in a modern city and you will find mangoes from Peru, cheese from France, coffee from Ethiopia, and noodles from Japan — all in the same aisle. Globalization, driven by international trade, migration, and digital communication, has transformed food systems around the world.

The effects are mixed. On one hand, access to a greater variety of foods has improved nutrition for many people. Imported products have introduced new vitamins, minerals, and dietary options that were not available before. Fusion cuisine — which blends ingredients and techniques from different cultures — has sparked enormous creativity in the culinary world. Popular dishes like sushi burritos or Korean tacos reflect this exciting cultural exchange.

On the other hand, globalization has also brought challenges. Many traditional food practices are disappearing as younger generations prefer international fast food over local dishes. Small local farmers often struggle to compete with cheaper imported products, which can threaten rural economies. In some regions, highly processed and packaged foods have replaced fresh, whole foods, contributing to rising rates of obesity and diet-related illnesses.

There is also the environmental cost. Transporting food across oceans and continents produces significant greenhouse gas emissions. A strawberry grown in Spain and sold in Canada has a much larger carbon footprint than one grown locally.

Despite these concerns, the trend toward global food systems is unlikely to reverse. Instead, experts argue that the key is balance — embracing the benefits of culinary diversity while protecting local food traditions, supporting local farmers, and making more environmentally conscious food choices. What we eat is no longer just a personal or cultural decision; it has become a global responsibility.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, how was eating different fifty years ago?',
          options: [
            'People ate more processed food than they do today.',
            'Food was mostly local, seasonal, and traditional.',
            'Supermarkets sold products from all over the world.',
            'Farmers competed with imported products from other countries.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `How Globalization Is Changing What We Eat

Fifty years ago, most people ate food that came from their local region. Farmers grew what the climate and soil allowed, and families prepared dishes using ingredients that had been part of their culture for generations. Eating was deeply local, seasonal, and traditional.

Today, that picture looks very different. Walk into any supermarket in a modern city and you will find mangoes from Peru, cheese from France, coffee from Ethiopia, and noodles from Japan — all in the same aisle. Globalization, driven by international trade, migration, and digital communication, has transformed food systems around the world.

The effects are mixed. On one hand, access to a greater variety of foods has improved nutrition for many people. Imported products have introduced new vitamins, minerals, and dietary options that were not available before. Fusion cuisine — which blends ingredients and techniques from different cultures — has sparked enormous creativity in the culinary world. Popular dishes like sushi burritos or Korean tacos reflect this exciting cultural exchange.

On the other hand, globalization has also brought challenges. Many traditional food practices are disappearing as younger generations prefer international fast food over local dishes. Small local farmers often struggle to compete with cheaper imported products, which can threaten rural economies. In some regions, highly processed and packaged foods have replaced fresh, whole foods, contributing to rising rates of obesity and diet-related illnesses.

There is also the environmental cost. Transporting food across oceans and continents produces significant greenhouse gas emissions. A strawberry grown in Spain and sold in Canada has a much larger carbon footprint than one grown locally.

Despite these concerns, the trend toward global food systems is unlikely to reverse. Instead, experts argue that the key is balance — embracing the benefits of culinary diversity while protecting local food traditions, supporting local farmers, and making more environmentally conscious food choices. What we eat is no longer just a personal or cultural decision; it has become a global responsibility.`,
          stimulusLabel: 'Read the article.',
          text: 'What does "fusion cuisine" mean, as used in the text?',
          options: [
            'Food that is cooked at very high temperatures.',
            'Traditional dishes that have never changed over time.',
            'Cooking that blends ingredients and techniques from different cultures.',
            'Meals that are prepared using only local ingredients.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `How Globalization Is Changing What We Eat

Fifty years ago, most people ate food that came from their local region. Farmers grew what the climate and soil allowed, and families prepared dishes using ingredients that had been part of their culture for generations. Eating was deeply local, seasonal, and traditional.

Today, that picture looks very different. Walk into any supermarket in a modern city and you will find mangoes from Peru, cheese from France, coffee from Ethiopia, and noodles from Japan — all in the same aisle. Globalization, driven by international trade, migration, and digital communication, has transformed food systems around the world.

The effects are mixed. On one hand, access to a greater variety of foods has improved nutrition for many people. Imported products have introduced new vitamins, minerals, and dietary options that were not available before. Fusion cuisine — which blends ingredients and techniques from different cultures — has sparked enormous creativity in the culinary world. Popular dishes like sushi burritos or Korean tacos reflect this exciting cultural exchange.

On the other hand, globalization has also brought challenges. Many traditional food practices are disappearing as younger generations prefer international fast food over local dishes. Small local farmers often struggle to compete with cheaper imported products, which can threaten rural economies. In some regions, highly processed and packaged foods have replaced fresh, whole foods, contributing to rising rates of obesity and diet-related illnesses.

There is also the environmental cost. Transporting food across oceans and continents produces significant greenhouse gas emissions. A strawberry grown in Spain and sold in Canada has a much larger carbon footprint than one grown locally.

Despite these concerns, the trend toward global food systems is unlikely to reverse. Instead, experts argue that the key is balance — embracing the benefits of culinary diversity while protecting local food traditions, supporting local farmers, and making more environmentally conscious food choices. What we eat is no longer just a personal or cultural decision; it has become a global responsibility.`,
          stimulusLabel: 'Read the article.',
          text: 'Why do small local farmers struggle, according to the text?',
          options: [
            'They cannot afford modern farming equipment.',
            'They have difficulty competing with cheaper imported products.',
            'Younger generations do not want to become farmers.',
            'The government has reduced support for agriculture.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `How Globalization Is Changing What We Eat

Fifty years ago, most people ate food that came from their local region. Farmers grew what the climate and soil allowed, and families prepared dishes using ingredients that had been part of their culture for generations. Eating was deeply local, seasonal, and traditional.

Today, that picture looks very different. Walk into any supermarket in a modern city and you will find mangoes from Peru, cheese from France, coffee from Ethiopia, and noodles from Japan — all in the same aisle. Globalization, driven by international trade, migration, and digital communication, has transformed food systems around the world.

The effects are mixed. On one hand, access to a greater variety of foods has improved nutrition for many people. Imported products have introduced new vitamins, minerals, and dietary options that were not available before. Fusion cuisine — which blends ingredients and techniques from different cultures — has sparked enormous creativity in the culinary world. Popular dishes like sushi burritos or Korean tacos reflect this exciting cultural exchange.

On the other hand, globalization has also brought challenges. Many traditional food practices are disappearing as younger generations prefer international fast food over local dishes. Small local farmers often struggle to compete with cheaper imported products, which can threaten rural economies. In some regions, highly processed and packaged foods have replaced fresh, whole foods, contributing to rising rates of obesity and diet-related illnesses.

There is also the environmental cost. Transporting food across oceans and continents produces significant greenhouse gas emissions. A strawberry grown in Spain and sold in Canada has a much larger carbon footprint than one grown locally.

Despite these concerns, the trend toward global food systems is unlikely to reverse. Instead, experts argue that the key is balance — embracing the benefits of culinary diversity while protecting local food traditions, supporting local farmers, and making more environmentally conscious food choices. What we eat is no longer just a personal or cultural decision; it has become a global responsibility.`,
          stimulusLabel: 'Read the article.',
          text: 'What environmental problem does the text associate with importing food from other countries?',
          options: [
            'Soil erosion caused by large-scale farming.',
            'Water shortages in exporting countries.',
            'Greenhouse gas emissions from food transportation.',
            'Loss of biodiversity in rainforests.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `How Globalization Is Changing What We Eat

Fifty years ago, most people ate food that came from their local region. Farmers grew what the climate and soil allowed, and families prepared dishes using ingredients that had been part of their culture for generations. Eating was deeply local, seasonal, and traditional.

Today, that picture looks very different. Walk into any supermarket in a modern city and you will find mangoes from Peru, cheese from France, coffee from Ethiopia, and noodles from Japan — all in the same aisle. Globalization, driven by international trade, migration, and digital communication, has transformed food systems around the world.

The effects are mixed. On one hand, access to a greater variety of foods has improved nutrition for many people. Imported products have introduced new vitamins, minerals, and dietary options that were not available before. Fusion cuisine — which blends ingredients and techniques from different cultures — has sparked enormous creativity in the culinary world. Popular dishes like sushi burritos or Korean tacos reflect this exciting cultural exchange.

On the other hand, globalization has also brought challenges. Many traditional food practices are disappearing as younger generations prefer international fast food over local dishes. Small local farmers often struggle to compete with cheaper imported products, which can threaten rural economies. In some regions, highly processed and packaged foods have replaced fresh, whole foods, contributing to rising rates of obesity and diet-related illnesses.

There is also the environmental cost. Transporting food across oceans and continents produces significant greenhouse gas emissions. A strawberry grown in Spain and sold in Canada has a much larger carbon footprint than one grown locally.

Despite these concerns, the trend toward global food systems is unlikely to reverse. Instead, experts argue that the key is balance — embracing the benefits of culinary diversity while protecting local food traditions, supporting local farmers, and making more environmentally conscious food choices. What we eat is no longer just a personal or cultural decision; it has become a global responsibility.`,
          stimulusLabel: 'Read the article.',
          text: 'What do experts suggest is the best approach to global food systems?',
          options: [
            'Banning all imported food to protect local farmers.',
            'Returning to completely local and traditional diets.',
            'Finding a balance between culinary diversity and protecting local traditions.',
            'Increasing food imports to improve nutrition globally.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `How Globalization Is Changing What We Eat

Fifty years ago, most people ate food that came from their local region. Farmers grew what the climate and soil allowed, and families prepared dishes using ingredients that had been part of their culture for generations. Eating was deeply local, seasonal, and traditional.

Today, that picture looks very different. Walk into any supermarket in a modern city and you will find mangoes from Peru, cheese from France, coffee from Ethiopia, and noodles from Japan — all in the same aisle. Globalization, driven by international trade, migration, and digital communication, has transformed food systems around the world.

The effects are mixed. On one hand, access to a greater variety of foods has improved nutrition for many people. Imported products have introduced new vitamins, minerals, and dietary options that were not available before. Fusion cuisine — which blends ingredients and techniques from different cultures — has sparked enormous creativity in the culinary world. Popular dishes like sushi burritos or Korean tacos reflect this exciting cultural exchange.

On the other hand, globalization has also brought challenges. Many traditional food practices are disappearing as younger generations prefer international fast food over local dishes. Small local farmers often struggle to compete with cheaper imported products, which can threaten rural economies. In some regions, highly processed and packaged foods have replaced fresh, whole foods, contributing to rising rates of obesity and diet-related illnesses.

There is also the environmental cost. Transporting food across oceans and continents produces significant greenhouse gas emissions. A strawberry grown in Spain and sold in Canada has a much larger carbon footprint than one grown locally.

Despite these concerns, the trend toward global food systems is unlikely to reverse. Instead, experts argue that the key is balance — embracing the benefits of culinary diversity while protecting local food traditions, supporting local farmers, and making more environmentally conscious food choices. What we eat is no longer just a personal or cultural decision; it has become a global responsibility.`,
          stimulusLabel: 'Read the article.',
          text: 'The phrase "What we eat is no longer just a personal or cultural decision; it has become a global responsibility" suggests that:',
          options: [
            'Governments should control what citizens eat.',
            'Food choices only affect the person eating them.',
            'Individual food choices have consequences for the wider world.',
            'Only wealthy countries need to worry about food responsibility.',
          ],
          answer: 2,
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
          stimulus: `Fast Food Chains in Developing Countries: A Problem We Cannot Ignore

In recent years, multinational fast food chains have expanded rapidly into developing countries. New burger, pizza, and fried chicken restaurants open in cities across Latin America, Africa, and Southeast Asia at an impressive rate. For many, these restaurants represent modernity and economic progress. But I believe their unchecked expansion poses a serious risk to public health, local culture, and economic fairness — and it is time for governments to act.

The health argument is the most urgent. Research consistently shows that diets high in processed food, sugar, and saturated fat contribute to obesity, diabetes, and heart disease. In countries where these illnesses were once rare, the arrival of fast food has coincided with dramatic increases in diet-related health problems. Healthcare systems that are already stretched thin cannot afford this additional burden.

Culturally, the dominance of international fast food chains threatens the survival of traditional local food. When a teenager in Bogotá, Nairobi, or Manila chooses a burger over a traditional home-cooked meal, something important is lost. Local recipes, ingredients, and food knowledge that took generations to develop are slowly forgotten.

Economically, international fast food chains drain money out of local communities. Profits are sent back to headquarters in wealthy countries, while local restaurants and food vendors — who reinvest in the community — lose customers.

Some argue that limiting fast food chains violates free market principles or consumer freedom. I disagree. Governments regularly regulate industries that cause public harm — tobacco, alcohol, pharmaceuticals — and food should be no different. Reasonable measures, such as higher taxes on fast food, restrictions on advertising to children, or limits on new restaurants in certain areas, would not eliminate choice. They would simply make the playing field fairer.

The question is not whether people can enjoy a burger occasionally. The question is whether multinational corporations should be allowed to reshape the diet, culture, and economy of developing nations without any accountability. The answer, in my view, is clearly no.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s central argument?',
          options: [
            'Fast food is delicious and should be made available everywhere.',
            'Governments in developing countries should take steps to limit the expansion of fast food chains.',
            'International trade is harmful and should be restricted.',
            'Developing countries need more foreign investment in the food sector.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Fast Food Chains in Developing Countries: A Problem We Cannot Ignore

In recent years, multinational fast food chains have expanded rapidly into developing countries. New burger, pizza, and fried chicken restaurants open in cities across Latin America, Africa, and Southeast Asia at an impressive rate. For many, these restaurants represent modernity and economic progress. But I believe their unchecked expansion poses a serious risk to public health, local culture, and economic fairness — and it is time for governments to act.

The health argument is the most urgent. Research consistently shows that diets high in processed food, sugar, and saturated fat contribute to obesity, diabetes, and heart disease. In countries where these illnesses were once rare, the arrival of fast food has coincided with dramatic increases in diet-related health problems. Healthcare systems that are already stretched thin cannot afford this additional burden.

Culturally, the dominance of international fast food chains threatens the survival of traditional local food. When a teenager in Bogotá, Nairobi, or Manila chooses a burger over a traditional home-cooked meal, something important is lost. Local recipes, ingredients, and food knowledge that took generations to develop are slowly forgotten.

Economically, international fast food chains drain money out of local communities. Profits are sent back to headquarters in wealthy countries, while local restaurants and food vendors — who reinvest in the community — lose customers.

Some argue that limiting fast food chains violates free market principles or consumer freedom. I disagree. Governments regularly regulate industries that cause public harm — tobacco, alcohol, pharmaceuticals — and food should be no different. Reasonable measures, such as higher taxes on fast food, restrictions on advertising to children, or limits on new restaurants in certain areas, would not eliminate choice. They would simply make the playing field fairer.

The question is not whether people can enjoy a burger occasionally. The question is whether multinational corporations should be allowed to reshape the diet, culture, and economy of developing nations without any accountability. The answer, in my view, is clearly no.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author consider the most urgent problem caused by fast food expansion?',
          options: [
            'The economic impact on local restaurants.',
            'The loss of traditional recipes.',
            'The negative effects on public health.',
            'The cultural influence on young people.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Fast Food Chains in Developing Countries: A Problem We Cannot Ignore

In recent years, multinational fast food chains have expanded rapidly into developing countries. New burger, pizza, and fried chicken restaurants open in cities across Latin America, Africa, and Southeast Asia at an impressive rate. For many, these restaurants represent modernity and economic progress. But I believe their unchecked expansion poses a serious risk to public health, local culture, and economic fairness — and it is time for governments to act.

The health argument is the most urgent. Research consistently shows that diets high in processed food, sugar, and saturated fat contribute to obesity, diabetes, and heart disease. In countries where these illnesses were once rare, the arrival of fast food has coincided with dramatic increases in diet-related health problems. Healthcare systems that are already stretched thin cannot afford this additional burden.

Culturally, the dominance of international fast food chains threatens the survival of traditional local food. When a teenager in Bogotá, Nairobi, or Manila chooses a burger over a traditional home-cooked meal, something important is lost. Local recipes, ingredients, and food knowledge that took generations to develop are slowly forgotten.

Economically, international fast food chains drain money out of local communities. Profits are sent back to headquarters in wealthy countries, while local restaurants and food vendors — who reinvest in the community — lose customers.

Some argue that limiting fast food chains violates free market principles or consumer freedom. I disagree. Governments regularly regulate industries that cause public harm — tobacco, alcohol, pharmaceuticals — and food should be no different. Reasonable measures, such as higher taxes on fast food, restrictions on advertising to children, or limits on new restaurants in certain areas, would not eliminate choice. They would simply make the playing field fairer.

The question is not whether people can enjoy a burger occasionally. The question is whether multinational corporations should be allowed to reshape the diet, culture, and economy of developing nations without any accountability. The answer, in my view, is clearly no.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'How does the author address the argument that limiting fast food violates consumer freedom?',
          options: [
            'By agreeing that consumer freedom is the most important value.',
            'By arguing that governments already regulate harmful industries and food can be treated the same way.',
            'By saying that consumers should be educated to make better choices.',
            'By ignoring the counterargument and focusing only on health data.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Fast Food Chains in Developing Countries: A Problem We Cannot Ignore

In recent years, multinational fast food chains have expanded rapidly into developing countries. New burger, pizza, and fried chicken restaurants open in cities across Latin America, Africa, and Southeast Asia at an impressive rate. For many, these restaurants represent modernity and economic progress. But I believe their unchecked expansion poses a serious risk to public health, local culture, and economic fairness — and it is time for governments to act.

The health argument is the most urgent. Research consistently shows that diets high in processed food, sugar, and saturated fat contribute to obesity, diabetes, and heart disease. In countries where these illnesses were once rare, the arrival of fast food has coincided with dramatic increases in diet-related health problems. Healthcare systems that are already stretched thin cannot afford this additional burden.

Culturally, the dominance of international fast food chains threatens the survival of traditional local food. When a teenager in Bogotá, Nairobi, or Manila chooses a burger over a traditional home-cooked meal, something important is lost. Local recipes, ingredients, and food knowledge that took generations to develop are slowly forgotten.

Economically, international fast food chains drain money out of local communities. Profits are sent back to headquarters in wealthy countries, while local restaurants and food vendors — who reinvest in the community — lose customers.

Some argue that limiting fast food chains violates free market principles or consumer freedom. I disagree. Governments regularly regulate industries that cause public harm — tobacco, alcohol, pharmaceuticals — and food should be no different. Reasonable measures, such as higher taxes on fast food, restrictions on advertising to children, or limits on new restaurants in certain areas, would not eliminate choice. They would simply make the playing field fairer.

The question is not whether people can enjoy a burger occasionally. The question is whether multinational corporations should be allowed to reshape the diet, culture, and economy of developing nations without any accountability. The answer, in my view, is clearly no.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author mean by fast food chains "draining money out of local communities"?',
          options: [
            'Fast food restaurants use large amounts of water to prepare food.',
            'Profits from international chains go abroad instead of staying in the local economy.',
            'Fast food workers are paid very low wages that reduce spending power.',
            'Multinational chains refuse to use local suppliers.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Fast Food Chains in Developing Countries: A Problem We Cannot Ignore

In recent years, multinational fast food chains have expanded rapidly into developing countries. New burger, pizza, and fried chicken restaurants open in cities across Latin America, Africa, and Southeast Asia at an impressive rate. For many, these restaurants represent modernity and economic progress. But I believe their unchecked expansion poses a serious risk to public health, local culture, and economic fairness — and it is time for governments to act.

The health argument is the most urgent. Research consistently shows that diets high in processed food, sugar, and saturated fat contribute to obesity, diabetes, and heart disease. In countries where these illnesses were once rare, the arrival of fast food has coincided with dramatic increases in diet-related health problems. Healthcare systems that are already stretched thin cannot afford this additional burden.

Culturally, the dominance of international fast food chains threatens the survival of traditional local food. When a teenager in Bogotá, Nairobi, or Manila chooses a burger over a traditional home-cooked meal, something important is lost. Local recipes, ingredients, and food knowledge that took generations to develop are slowly forgotten.

Economically, international fast food chains drain money out of local communities. Profits are sent back to headquarters in wealthy countries, while local restaurants and food vendors — who reinvest in the community — lose customers.

Some argue that limiting fast food chains violates free market principles or consumer freedom. I disagree. Governments regularly regulate industries that cause public harm — tobacco, alcohol, pharmaceuticals — and food should be no different. Reasonable measures, such as higher taxes on fast food, restrictions on advertising to children, or limits on new restaurants in certain areas, would not eliminate choice. They would simply make the playing field fairer.

The question is not whether people can enjoy a burger occasionally. The question is whether multinational corporations should be allowed to reshape the diet, culture, and economy of developing nations without any accountability. The answer, in my view, is clearly no.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The phrase "make the playing field fairer" suggests that the author wants:',
          options: [
            'Fast food chains to sponsor local sports events.',
            'International companies to compete more aggressively with each other.',
            'A more equal competition between multinational chains and local food businesses.',
            'All restaurants to charge the same prices.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Fast Food Chains in Developing Countries: A Problem We Cannot Ignore

In recent years, multinational fast food chains have expanded rapidly into developing countries. New burger, pizza, and fried chicken restaurants open in cities across Latin America, Africa, and Southeast Asia at an impressive rate. For many, these restaurants represent modernity and economic progress. But I believe their unchecked expansion poses a serious risk to public health, local culture, and economic fairness — and it is time for governments to act.

The health argument is the most urgent. Research consistently shows that diets high in processed food, sugar, and saturated fat contribute to obesity, diabetes, and heart disease. In countries where these illnesses were once rare, the arrival of fast food has coincided with dramatic increases in diet-related health problems. Healthcare systems that are already stretched thin cannot afford this additional burden.

Culturally, the dominance of international fast food chains threatens the survival of traditional local food. When a teenager in Bogotá, Nairobi, or Manila chooses a burger over a traditional home-cooked meal, something important is lost. Local recipes, ingredients, and food knowledge that took generations to develop are slowly forgotten.

Economically, international fast food chains drain money out of local communities. Profits are sent back to headquarters in wealthy countries, while local restaurants and food vendors — who reinvest in the community — lose customers.

Some argue that limiting fast food chains violates free market principles or consumer freedom. I disagree. Governments regularly regulate industries that cause public harm — tobacco, alcohol, pharmaceuticals — and food should be no different. Reasonable measures, such as higher taxes on fast food, restrictions on advertising to children, or limits on new restaurants in certain areas, would not eliminate choice. They would simply make the playing field fairer.

The question is not whether people can enjoy a burger occasionally. The question is whether multinational corporations should be allowed to reshape the diet, culture, and economy of developing nations without any accountability. The answer, in my view, is clearly no.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The word "unchecked" in the first paragraph most closely means:',
          options: [
            'Paid for.',
            'Without control or regulation.',
            'Carefully planned.',
            'Financially supported.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Fast Food Chains in Developing Countries: A Problem We Cannot Ignore

In recent years, multinational fast food chains have expanded rapidly into developing countries. New burger, pizza, and fried chicken restaurants open in cities across Latin America, Africa, and Southeast Asia at an impressive rate. For many, these restaurants represent modernity and economic progress. But I believe their unchecked expansion poses a serious risk to public health, local culture, and economic fairness — and it is time for governments to act.

The health argument is the most urgent. Research consistently shows that diets high in processed food, sugar, and saturated fat contribute to obesity, diabetes, and heart disease. In countries where these illnesses were once rare, the arrival of fast food has coincided with dramatic increases in diet-related health problems. Healthcare systems that are already stretched thin cannot afford this additional burden.

Culturally, the dominance of international fast food chains threatens the survival of traditional local food. When a teenager in Bogotá, Nairobi, or Manila chooses a burger over a traditional home-cooked meal, something important is lost. Local recipes, ingredients, and food knowledge that took generations to develop are slowly forgotten.

Economically, international fast food chains drain money out of local communities. Profits are sent back to headquarters in wealthy countries, while local restaurants and food vendors — who reinvest in the community — lose customers.

Some argue that limiting fast food chains violates free market principles or consumer freedom. I disagree. Governments regularly regulate industries that cause public harm — tobacco, alcohol, pharmaceuticals — and food should be no different. Reasonable measures, such as higher taxes on fast food, restrictions on advertising to children, or limits on new restaurants in certain areas, would not eliminate choice. They would simply make the playing field fairer.

The question is not whether people can enjoy a burger occasionally. The question is whether multinational corporations should be allowed to reshape the diet, culture, and economy of developing nations without any accountability. The answer, in my view, is clearly no.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which of the following best describes the tone of this article?',
          options: [
            'Neutral and informative.',
            'Humorous and light-hearted.',
            'Persuasive and concerned.',
            'Uncertain and questioning.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
