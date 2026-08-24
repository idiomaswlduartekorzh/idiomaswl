import type { RoleplayToolkit } from './types.ts'

/** Caja común de apoyo para los veinte roleplays de inglés A1. */
export const TOOLKIT_INGLES_A1: RoleplayToolkit = {
  language: 'ingles',
  level: 'a1',
  intro: 'Choose one short form when you need it. Use it, add your fact, and listen. This is help for a turn, not a dialogue to read from top to bottom.',
  blocks: [
    {
      number: 1,
      title: 'starting politely',
      rows: [
        { form: '`Hello.` · `Good morning.`', when: 'begin a neutral conversation' },
        { form: '`Excuse me.`', when: 'get someone’s attention politely' },
        { form: '`Hi — can I ask you something?`', when: 'begin with a simple question' },
      ],
    },
    {
      number: 2,
      title: 'asking and checking',
      rows: [
        { form: '`Can you repeat that, please?`', when: 'you did not hear or understand' },
        { form: '`Is that …?` · `Do you mean …?`', when: 'check one detail' },
        { form: '`What time?` · `Which one?` · `Where?`', when: 'ask for one missing fact' },
      ],
    },
    {
      number: 3,
      title: 'receiving information',
      tag: '[receives]',
      rows: [
        { form: '`I understand.`', when: 'show that the main point is clear' },
        { form: '`OK — one moment.`', when: 'you need a short pause' },
        { form: '`Let me check.`', when: 'look at a note, time or object' },
      ],
    },
    {
      number: 4,
      title: 'names, numbers and objects',
      tag: '[jargon]',
      rows: [
        { form: '`How do you spell that?`', when: 'a name or place is new' },
        { form: '`Is that fifteen or fifty?`', when: 'two numbers sound similar' },
        { form: '`Can you show me?` · `This one?`', when: 'the object is easier to point to' },
      ],
    },
    {
      number: 5,
      title: 'saying no simply',
      rows: [
        { form: '`Sorry, I can’t.`', when: 'the request is not possible' },
        { form: '`Not today.` · `Not at that time.`', when: 'the limit is a day or time' },
        { form: '`That doesn’t work for me.`', when: 'reject an option without rejecting the person' },
      ],
    },
    {
      number: 6,
      title: 'giving a short reason',
      rows: [
        { form: '`I need … because …`', when: 'connect one need to one reason' },
        { form: '`I have … at …`', when: 'a possession or appointment explains the limit' },
        { form: '`It is …, so I can’t …`', when: 'one fact creates the problem' },
      ],
    },
    {
      number: 7,
      title: 'accepting with a clear limit',
      tag: '[grants]',
      rows: [
        { form: '`Yes, that’s OK.`', when: 'accept the complete option' },
        { form: '`Yes, but only until …`', when: 'accept with a time limit' },
        { form: '`We can do that. Then …`', when: 'accept and name the next action' },
      ],
    },
    {
      number: 8,
      title: 'closing and checking',
      rows: [
        { form: '`So: …, right?`', when: 'repeat the most important fact' },
        { form: '`Who does that?` · `What time?`', when: 'give the next action an owner and time' },
        { form: '`Thank you. See you at …`', when: 'close with the agreed time' },
      ],
    },
  ],
}
