import type { RoleplayToolkit } from './types.ts'

/**
 * La caja de herramientas del nivel — inglés A2.
 *
 * §10 del blueprint: el andamiaje va en dos piezas, y esto no es organización. Medido
 * sobre las doce fichas de la primera versión, seis de cada diez filas eran la misma
 * función en los doce roles; con más filas que turnos y el saludo arriba y la despedida
 * abajo, la tabla leída en orden **era** la conversación. Así que lo común vive una sola
 * vez, aquí, y cada ficha se queda con 6-9 exponentes que solo se dicen en su escenario.
 *
 * No es plana: cada bloque —o cada fila— marca a quién le toca. `[asks]` quien necesita
 * algo, `[grants]` quien puede darlo o negarlo, `[jargon]` quien usa palabras del oficio,
 * `[receives]` quien no las conoce. Sin marca, para los dos.
 *
 * En pantalla se ve en inglés, como las fichas: el estudiante no cambia de idioma entre
 * leer y hablar. La auditoría histórica nació en `artifacts/habla-a2/`; este registro es
 * la fuente ejecutable que consumen las rutas y el guardián.
 */
export const TOOLKIT_INGLES_A2: RoleplayToolkit = {
  language: 'ingles',
  level: 'a2',
  intro:
    'Lo que sirve en cualquiera de los ocho juegos de rol. Está aparte a propósito: no ocupa ninguno de los exponentes propios de tu ficha, y tu ficha te dice qué bloques te tocan y por qué.',
  blocks: [
    {
      number: 1,
      title: 'Opening',
      rows: [
        { form: 'Excuse me, do you have a minute?', when: 'you need their time and you know it', register: 'neutral', tag: '[asks]' },
        { form: 'Sorry to bother you.', when: 'you know this is a bad moment', register: 'formal', tag: '[asks]' },
        { form: 'Hi — can we talk for a second?', when: 'someone you see every day', register: 'informal', tag: '[asks]' },
        { form: 'Good morning. How can I help you?', when: "you're the one behind the counter", register: 'formal', tag: '[grants]' },
        { form: "Come in. What's going on?", when: 'you called them, not the other way around', register: 'neutral', tag: '[grants]' },
        { form: "I'm here about…", when: 'say what this is about without saying everything', register: 'neutral' },
      ],
      tail: "Nobody walks straight into their problem. Skipping this sounds rude in English even when you aren't.",
    },
    {
      number: 2,
      title: 'Closing and thanking',
      rows: [
        { form: 'Thanks for your time.', when: 'formal close, even if you got nothing', register: 'formal' },
        { form: 'Thanks — really.', when: 'they gave up something for you', register: 'informal' },
        { form: "So, we're clear then.", when: 'check you both understood the same thing', register: 'neutral' },
        { form: 'OK. See you tomorrow, then.', when: "someone you'll see again", register: 'informal' },
        { form: 'Is that OK for you?', when: 'check before you close', register: 'neutral' },
      ],
      tail: 'Ending on the agreement alone is the end of a form, not of a conversation.',
    },
    {
      number: 3,
      title: 'Asking them to say it again',
      tag: '[receives]',
      rows: [
        { form: "Sorry, I didn't catch that.", when: "you didn't hear" },
        { form: 'Can you say that again, please?', when: "you didn't understand" },
        { form: 'Slowly, please.', when: 'too fast' },
        { form: 'What does "…" mean?', when: 'one word' },
        { form: 'Sorry — was that five or nine?', when: 'a number or a letter' },
        { form: "So, you're saying…?", when: 'check you got it right' },
      ],
    },
    {
      number: 4,
      title: 'Saying your own thing again',
      tag: '[jargon]',
      note: "**The other half of repair, and the half that's usually missing.** The person who used the hard word is the one who has to get everyone out of it. If only the listener can ask, the conversation dies at the first misunderstanding.",
      rows: [
        { form: 'I mean…', when: 'fix it as you go' },
        { form: 'In other words, …', when: 'say it a different way' },
        { form: 'What I mean is…', when: 'when you see a blank face' },
        { form: "It's like…", when: 'compare it to something they do know' },
        { form: 'Not …, but …', when: 'take the misunderstanding out of the way' },
        { form: 'Let me say that again.', when: 'start the sentence from zero' },
      ],
    },
    {
      number: 5,
      title: 'Saying why it matters to you',
      note: "**The exact point where pairs switched to Spanish in all eight simulations.** It isn't giving a reason — it's saying what *you* lose.",
      rows: [
        { form: "It's important for me because…", when: 'straight' },
        { form: 'I need it because…', when: 'when the reason is concrete' },
        { form: "If I don't…, I…", when: 'when what you lose is the argument' },
        { form: "That's why I'm here today.", when: 'close your own case' },
        { form: "It's not about the money. It's about…", when: "when they think it's about money" },
      ],
    },
    {
      number: 6,
      title: 'Keeping something to yourself without lying',
      note: "Ten of the sixteen roles have something they can't tell. **Making up an excuse is not the exercise. Closing the door without giving the reason is.**",
      rows: [
        { form: "I can't say why, sorry.", when: 'refuse to explain, full stop' },
        { form: "It's personal.", when: 'when they push' },
        { form: "It's a family thing.", when: 'a reason that says nothing and is still true' },
        { form: "I just can't do that day.", when: 'close it without opening the reason' },
        { form: 'Can we leave it there?', when: 'stop the question without stopping the conversation' },
      ],
    },
    {
      number: 7,
      title: 'Saying no without saying "no"',
      tag: '[grants]',
      rows: [
        { form: "I'm afraid I can't.", when: 'formal no' },
        { form: 'The thing about that is…', when: 'put the problem before the refusal' },
        { form: 'I want to help, but…', when: "make clear it isn't bad will" },
        { form: 'The person who can do that is…', when: 'send them to whoever can' },
        { form: 'Not today. Maybe…', when: 'say no to the when, not to the what' },
      ],
    },
    {
      number: 8,
      title: 'Buying yourself time',
      rows: [
        { form: 'Let me think for a second.', when: 'before you answer something big' },
        { form: 'Hold on.', when: 'slow them down without a fight' },
        { form: 'Hmm. OK.', when: "let them see you're thinking" },
      ],
      tail: 'Real conversations have silences. Without these, an A2 fills them with Spanish.',
    },
  ],
}
