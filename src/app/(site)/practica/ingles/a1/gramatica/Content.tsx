'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'English Grammar A1 — Guía de referencia',
  body: "Los 5 pilares del inglés A1: artículos (a/an/the), verbo to be (am/is/are), pronombres personales (he/she/it/we/they), presente simple (plays/doesn't play) y plurales (books/boxes/babies).\nEn inglés los pronombres sujeto son OBLIGATORIOS — no se puede omitir el sujeto como en español. Siempre di 'It is raining', nunca solo 'Is raining'.",
  tip: "Truco para a/an: 'an' va antes de SONIDO vocal, no de letra vocal. 'An hour' (h muda), 'a university' (suena 'yu'). Truco he/she: doesn't + verbo BASE (no -s). No digas 'She doesn't plays' sino 'She doesn't play'.",
  tableHead: ['Tema', 'Forma', 'Ejemplo'],
  tableRows: [
    ['a / an / the', 'a (cons.) · an (vocal) · the (específico/único)', 'a dog · an apple · the sun'],
    ['to be', 'I am · He/She/It is · We/You/They are', 'I am a student · She is kind'],
    ['Pronouns', 'He (m.) · She (f.) · It (cosa) · We · They', 'Maria → She · Tom and I → We'],
    ['Present simple', 'he/she/it → +s/-es · neg: don\'t / doesn\'t', "She walks · He doesn't eat"],
    ['Plural nouns', '+s · +es (s/sh/ch/x/z) · +ies (cons+y)', 'books · boxes · babies · men'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    icon: '📌',
    title: 'Articles — a, an, the',
    desc: "Usa 'a' antes de sonido consonántico, 'an' antes de sonido vocálico, 'the' para algo específico o único.",
    items: [
      { text: 'I have ___ dog.', opts: ['a', 'an', 'the'], ans: 'a', hint: '"A dog" — sonido consonántico (d-og). Usamos "a".' },
      { text: 'She eats ___ apple a day.', opts: ['a', 'an', 'the'], ans: 'an', hint: '"An apple" — sonido vocálico (a-pple). Usamos "an".' },
      { text: '___ sun is very big.', opts: ['A', 'An', 'The'], ans: 'The', hint: '"The sun" — hay solo un sol → "the" para cosas únicas.' },
      { text: 'He is ___ engineer.', opts: ['a', 'an', 'the'], ans: 'an', hint: '"An engineer" — sonido vocálico (e-ngineer).' },
      { text: 'I live in ___ apartment.', opts: ['a', 'an', 'the'], ans: 'an', hint: '"An apartment" — sonido vocálico (a-partment).' },
      { text: '___ moon is full tonight.', opts: ['A', 'An', 'The'], ans: 'The', hint: '"The moon" — hay solo una luna → "the".' },
      { text: 'She is ___ teacher.', opts: ['a', 'an', 'the'], ans: 'a', hint: '"A teacher" — primera mención + sonido consonántico (t-eacher).' },
      { text: 'I need ___ umbrella.', opts: ['a', 'an', 'the'], ans: 'an', hint: '"An umbrella" — sonido vocálico (u-mbrella).' },
      { text: 'Is there ___ bank nearby?', opts: ['a', 'an', 'the'], ans: 'a', hint: '"A bank" — primera mención + sonido consonántico (b-ank).' },
      { text: '___ water in this lake is cold.', opts: ['A', 'An', 'The'], ans: 'The', hint: '"The water" — el agua específica de ese lago.' },
    ],
  },
  {
    type: 'choice',
    icon: '🔵',
    title: 'Verb "to be" — am, is, are',
    desc: "El verbo 'to be' se conjuga: I am / You are / He-She-It is / We-You-They are.",
    items: [
      { text: 'I ___ a student.', opts: ['am', 'is', 'are'], ans: 'am', hint: '"I am" — con "I" siempre usamos "am".' },
      { text: 'She ___ very kind.', opts: ['am', 'is', 'are'], ans: 'is', hint: '"She is" — con he/she/it usamos "is".' },
      { text: 'We ___ from Colombia.', opts: ['am', 'is', 'are'], ans: 'are', hint: '"We are" — con we/you/they usamos "are".' },
      { text: 'He ___ not at home right now.', opts: ['am', 'is', 'are'], ans: 'is', hint: '"He is not" — con he/she/it → is.' },
      { text: 'They ___ good friends.', opts: ['am', 'is', 'are'], ans: 'are', hint: '"They are" — con they → are.' },
      { text: '___ you happy?', opts: ['Am', 'Is', 'Are'], ans: 'Are', hint: '"Are you?" — preguntas con "you" usan "are".' },
      { text: 'The coffee ___ hot.', opts: ['am', 'is', 'are'], ans: 'is', hint: '"Coffee is" — sujeto singular → is.' },
      { text: 'My parents ___ doctors.', opts: ['am', 'is', 'are'], ans: 'are', hint: '"Parents are" — sujeto plural → are.' },
      { text: 'I ___ not tired today.', opts: ['am', 'is', 'are'], ans: 'am', hint: '"I am not" — con "I" → am.' },
      { text: 'It ___ raining outside.', opts: ['am', 'is', 'are'], ans: 'is', hint: '"It is" — con it → is.' },
    ],
  },
  {
    type: 'choice',
    icon: '👤',
    title: 'Personal pronouns — He, She, It, We, They',
    desc: 'He (hombre), She (mujer), It (cosa/animal), We (nosotros), They (ellos/ellas). En inglés los pronombres sujeto son OBLIGATORIOS.',
    items: [
      { text: 'Maria is from Spain. ___ is from Spain.', opts: ['He', 'She', 'It', 'They'], ans: 'She', hint: '"She" — Maria es mujer.' },
      { text: 'Tom and I are friends. ___ are friends.', opts: ['We', 'They', 'You', 'It'], ans: 'We', hint: '"We" — cuando yo estoy incluido en el grupo.' },
      { text: 'The book is on the table. ___ is on the table.', opts: ['He', 'She', 'It', 'They'], ans: 'It', hint: '"It" — para cosas y objetos usamos "it".' },
      { text: 'My parents work hard. ___ work hard.', opts: ['We', 'They', 'You', 'It'], ans: 'They', hint: '"They" — para grupos de personas (sin yo).' },
      { text: 'John lives in London. ___ lives in London.', opts: ['He', 'She', 'It', 'They'], ans: 'He', hint: '"He" — John es un hombre.' },
      { text: 'The children play outside. ___ play outside.', opts: ['We', 'They', 'You', 'It'], ans: 'They', hint: '"They" — los niños = grupo → they.' },
      { text: 'The car is fast. ___ is fast.', opts: ['He', 'She', 'It', 'They'], ans: 'It', hint: '"It" — para objetos como el carro.' },
      { text: 'My sister and I love music. ___ love music.', opts: ['We', 'They', 'You', 'It'], ans: 'We', hint: '"We" — yo + mi hermana = nosotros.' },
    ],
  },
  {
    type: 'choice',
    icon: '⏰',
    title: 'Present simple — affirmative and negative',
    desc: "Con he/she/it añade -s/-es al verbo: I play / She plays. Negativo: I don't / She doesn't + verbo BASE (no -s después de doesn't).",
    items: [
      { text: 'She ___ to work every day.', opts: ['walk', 'walks', 'walking'], ans: 'walks', hint: '"She walks" — con she/he/it añadimos -s.' },
      { text: 'They ___ in a big house.', opts: ['live', 'lives', 'is living'], ans: 'live', hint: '"They live" — con they usamos el verbo base sin -s.' },
      { text: 'He ___ not eat meat.', opts: ["don't", "doesn't", "isn't"], ans: "doesn't", hint: '"He doesn\'t" — con he/she/it usamos "doesn\'t" en la negación.' },
      { text: 'I ___ play football on Saturdays.', opts: ["don't", "doesn't", "not"], ans: "don't", hint: '"I don\'t" — con I/you/we/they usamos "don\'t".' },
      { text: 'The sun ___ in the east.', opts: ['rise', 'rises', 'is rising'], ans: 'rises', hint: '"The sun rises" — sujeto singular → +s.' },
      { text: 'My brothers ___ to the gym often.', opts: ['goes', 'go', 'going'], ans: 'go', hint: '"Brothers go" — plural → verbo base sin -s.' },
      { text: 'She ___ speak Arabic.', opts: ["don't", "doesn't", "isn't"], ans: "doesn't", hint: '"She doesn\'t speak" — con she → doesn\'t + verbo base.' },
      { text: 'It ___ snow in Colombia.', opts: ["don't", "doesn't", "isn't"], ans: "doesn't", hint: '"It doesn\'t snow" — con it → doesn\'t.' },
    ],
  },
  {
    type: 'choice',
    icon: '🔢',
    title: 'Plural nouns — books, boxes, babies, men',
    desc: "Reglas: +s (normal), +es (termina en s/sh/ch/x/z), +ies (consonante+y). Irregulares: man→men, child→children, tooth→teeth.",
    items: [
      { text: 'One book — two ___.', opts: ['books', 'bookes', 'bookies'], ans: 'books', hint: '"Books" — regla general: solo +s.' },
      { text: 'One box — two ___.', opts: ['boxs', 'boxes', 'boxies'], ans: 'boxes', hint: '"Boxes" — termina en x → +es.' },
      { text: 'One baby — two ___.', opts: ['babys', 'babies', 'babes'], ans: 'babies', hint: '"Babies" — consonante + y → cambia y por ies.' },
      { text: 'One man — two ___.', opts: ['mans', 'men', 'manes'], ans: 'men', hint: '"Men" — irregular. Man→men, woman→women.' },
      { text: 'One child — two ___.', opts: ['childs', 'childes', 'children'], ans: 'children', hint: '"Children" — irregular. Child→children.' },
      { text: 'One city — two ___.', opts: ['citys', 'cities', 'cityes'], ans: 'cities', hint: '"Cities" — consonante (t) + y → ies.' },
      { text: 'One tooth — two ___.', opts: ['tooths', 'teeths', 'teeth'], ans: 'teeth', hint: '"Teeth" — irregular. Tooth→teeth, foot→feet.' },
      { text: 'One bus — two ___.', opts: ['bus', 'buss', 'buses'], ans: 'buses', hint: '"Buses" — termina en s → +es.' },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — all topics!',
    desc: 'Mix of all 5 A1 topics. Write fast!',
    inputWidth: 75,
    items: [
      { text: 'I have ___ dog. (article)', ans: 'a', hint: 'sonido consonántico → a' },
      { text: 'She eats ___ apple a day. (article)', ans: 'an', hint: 'sonido vocálico → an' },
      { text: 'I ___ a student. (to be)', ans: 'am', hint: 'to be: I → am' },
      { text: '___ you happy? (to be)', ans: 'Are', hint: 'to be: you → are' },
      { text: 'Maria is from Spain. ___ is from Spain.', ans: 'She', hint: 'mujer → she' },
      { text: 'The book is on the table. ___ is on the table.', ans: 'It', hint: 'objeto → it' },
      { text: 'She ___ to work every day. (present simple)', ans: 'walks', hint: 'she → +s: walks' },
      { text: 'He ___ not eat meat. (negation)', ans: "doesn't", hint: "he → doesn't + verbo base" },
      { text: 'One box — two ___. (plural)', ans: 'boxes', hint: 'termina en x → +es' },
      { text: 'One baby — two ___. (plural)', ans: 'babies', hint: 'consonante + y → ies' },
    ],
  },
];

export default function GramaticaInglesA1() {
  return (
    <QuestEngine
      color="#0066cc"
      flag="🇬🇧"
      storageKey="quest-en-a1-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/ingles/a1"
      backLabel="English A1"
      title="Grammar A1"
      subtitle="English A1 — Grammar"
    />
  );
}
