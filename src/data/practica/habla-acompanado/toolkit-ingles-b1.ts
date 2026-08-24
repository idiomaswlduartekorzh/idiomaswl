import type { RoleplayToolkit } from './types.ts'

/** Caja común de apoyo para los veinte roleplays de inglés B1. */
export const TOOLKIT_INGLES_B1: RoleplayToolkit = {
  language: 'ingles',
  level: 'b1',
  intro: 'Choose a form for the job you need to do, add your own fact, and listen to the answer. These are negotiation tools, not a dialogue or a fixed order.',
  blocks: [
    {
      number: 1,
      title: 'opening with a purpose',
      rows: [
        { form: '`Could we talk about …?`', when: 'name the issue without blaming the person' },
        { form: '`I’d like to clarify what happened with …`', when: 'open a factual review' },
        { form: '`Before we decide, can we compare the options?`', when: 'slow down a rushed decision' },
      ],
    },
    {
      number: 2,
      title: 'checking meaning and evidence',
      rows: [
        { form: '`When you say …, do you mean …?`', when: 'test your understanding of a condition' },
        { form: '`What is that based on?`', when: 'ask for the source of a claim or rule' },
        { form: '`Could you walk me through the dates?`', when: 'reconstruct a sequence without accusing' },
      ],
    },
    {
      number: 3,
      title: 'receiving a difficult point',
      tag: '[receives]',
      rows: [
        { form: '`I see why that matters to you.`', when: 'recognize an interest without accepting the solution' },
        { form: '`That changes part of the situation.`', when: 'show that new information is relevant' },
        { form: '`Let me make sure I have the full picture.`', when: 'pause before responding to several facts' },
      ],
    },
    {
      number: 4,
      title: 'unpacking terms and procedures',
      tag: '[jargon]',
      rows: [
        { form: '`What does … include in this case?`', when: 'a term may hide a limit or extra step' },
        { form: '`Is that a requirement or a recommendation?`', when: 'separate a rule from advice' },
        { form: '`Could you put that in everyday language?`', when: 'the other person uses specialist wording' },
      ],
    },
    {
      number: 5,
      title: 'holding a boundary',
      rows: [
        { form: '`I can’t agree to that as it stands.`', when: 'reject the current package, not the conversation' },
        { form: '`What I can commit to is …`', when: 'replace a refusal with a realistic limit' },
        { form: '`That would leave me responsible for …`', when: 'explain the consequence of accepting' },
      ],
    },
    {
      number: 6,
      title: 'building an alternative',
      rows: [
        { form: '`What if we … instead?`', when: 'introduce a different route' },
        { form: '`We could separate … from …`', when: 'split a package into negotiable parts' },
        { form: '`Would it work if I … and you …?`', when: 'trade two concrete responsibilities' },
      ],
    },
    {
      number: 7,
      title: 'granting with safeguards',
      tag: '[grants]',
      rows: [
        { form: '`I could accept that provided that …`', when: 'make one essential condition explicit' },
        { form: '`That works for me as long as …`', when: 'protect a practical limit' },
        { form: '`I’m willing to try it until …, then review it.`', when: 'make an agreement temporary and testable' },
      ],
    },
    {
      number: 8,
      title: 'summarizing the decision',
      rows: [
        { form: '`Let me summarize what we have agreed.`', when: 'move from discussion to a shared record' },
        { form: '`The open point is …, and we’ll decide it by …`', when: 'close without hiding a pending issue' },
        { form: '`Who will do what, and by when?`', when: 'give each next action an owner and deadline' },
      ],
    },
  ],
}
