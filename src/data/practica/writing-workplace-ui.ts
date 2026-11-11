import { WRITING_UI_DE } from './writing-workplace-ui-de'
import { WRITING_UI_IT } from './writing-workplace-ui-it'
import { WRITING_UI_PT } from './writing-workplace-ui-pt'
import { WRITING_UI_RU } from './writing-workplace-ui-ru'
import { WRITING_UI_JA } from './writing-workplace-ui-ja'
import { WRITING_UI_KO } from './writing-workplace-ui-ko'

export type WritingLevel = 'B2' | 'C1' | 'C2'
export type WritingLocale = 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ja' | 'ko'

type Stage = 'email' | 'document' | 'analysis' | 'reply' | 'review'

export type WritingUi = {
  languageName: string
  languageSlug: string
  stages: Record<Stage, string>
  axes: Record<string, string>
  intro: Record<WritingLevel, { first: string; second: string; description: string }>
  areas: Record<string, string>
  breadcrumb: string
  preview: string
  previewKicker: string
  liveKicker: string
  caseCount: string
  stepsCount: string
  localDraft: string
  filterLabel: string
  allCases: string
  availableCases: string
  caseLabel: string
  continueDraft: string
  openCase: string
  previewNote: string
  yourRole: string
  caseSteps: string
  emailInput: string
  emailTitle: string
  emailInstruction: string
  from: string
  to: string
  sent: string
  subject: string
  readDocument: string
  evidenceStep: string
  backEmail: string
  analyseSituation: string
  judgementStep: string
  analysis: Record<WritingLevel, { title: string; instruction: string }>
  notes: Record<WritingLevel, { fact: string; factPlaceholder: string; assumption: string; assumptionPlaceholder: string; responsibility: string; responsibilityPlaceholder: string }>
  tryAnother: string
  questionsAnswered: string
  notesReady: string
  correctAnswers: string
  reviewFacts: string
  writeReply: string
  replyStep: string
  replyTitle: string
  replyLabel: string
  replyPlaceholder: string
  replyPrefix: string
  wordUnit: string
  draftSaved: string
  beforeSend: string
  wordGuideNote: string
  emptyReply: string
  reviewAnalysis: string
  compareRevise: string
  revisionStep: string
  revisionTitle: string
  revisionInstruction: string
  yourReply: string
  possibleReply: string
  noticeDecisions: string
  checkReply: string
  compareFirstDraft: string
  rewriteReply: string
  chooseCase: string
}

export const WRITING_UI: Record<WritingLocale, WritingUi> = {
  de: WRITING_UI_DE,
  it: WRITING_UI_IT,
  pt: WRITING_UI_PT,
  ru: WRITING_UI_RU,
  ja: WRITING_UI_JA,
  ko: WRITING_UI_KO,
  en: {
    languageName: 'English',
    languageSlug: 'ingles',
    stages: { email: 'Email', document: 'Facts', analysis: 'Analyse', reply: 'Reply', review: 'Review' },
    axes: { Evidence: 'Evidence', Scope: 'Scope', Intent: 'Intent', Purpose: 'Purpose' },
    intro: {
      B2: { first: 'Before you reply,', second: 'find out what happened.', description: 'An email may tell only part of the story. Read the message, check the internal record, and write a reply that clears things up without inventing facts or assigning blame.' },
      C1: { first: 'Before you answer,', second: 'map the competing accounts.', description: 'Work out which account the evidence supports, where the uncertainty remains, and how to move the conversation forward in a measured reply.' },
      C2: { first: 'What can you say', second: 'without overstating it?', description: 'Read between the institutional lines. Decide what can be attributed, what still needs verification, and how to respond with precision and tact.' },
    },
    areas: { Marketing: 'Marketing', Software: 'Software', People: 'People', 'Health administration': 'Health administration', Operations: 'Operations' },
    breadcrumb: 'Writing', preview: 'Preview', previewKicker: 'Editorial preview', liveKicker: 'Workplace cases', caseCount: '{count} cases to explore', stepsCount: '5 steps per case', localDraft: 'Your draft stays in this browser',
    filterLabel: 'Filter cases by area', allCases: 'All cases', availableCases: 'Available cases', caseLabel: 'CASE', continueDraft: 'Continue your draft', openCase: 'Open case', previewNote: 'These cases preview the format for the full set of 20 exercises at this level.', yourRole: 'Your role', caseSteps: 'Case steps',
    emailInput: '01 / Input', emailTitle: 'You have a new email', emailInstruction: 'Read it as the person who must respond.', from: 'From', to: 'To', sent: 'Sent', subject: 'Subject', readDocument: 'Read the document',
    evidenceStep: '02 / Evidence', backEmail: 'Back to the email', analyseSituation: 'Analyse the situation',
    judgementStep: '03 / Judgement', analysis: {
      B2: { title: 'Separate what happened from what was assumed', instruction: 'Complete the three notes and answer all four questions correctly before writing. Each option explains what it does or does not establish.' },
      C1: { title: 'Weigh the competing accounts', instruction: 'Record the strongest reading, an alternative you cannot dismiss, and the decision the reply must support. Then answer all four questions.' },
      C2: { title: 'Decide what the record can bear', instruction: 'Trace attribution, uncertainty, and authority before writing. Use the four questions to test the limits of each claim.' },
    },
    notes: {
      B2: { fact: 'What is a confirmed fact?', factPlaceholder: 'A fact you can support with the document…', assumption: 'What has someone assumed?', assumptionPlaceholder: 'An assumption that needs clarification…', responsibility: 'What can you take responsibility for?', responsibilityPlaceholder: 'Your part in the misunderstanding…' },
      C1: { fact: 'Which account has the strongest support?', factPlaceholder: 'Name the evidence and its limits…', assumption: 'What alternative reading must you acknowledge?', assumptionPlaceholder: 'A plausible interpretation you cannot yet rule out…', responsibility: 'What needs a decision, and by whom?', responsibilityPlaceholder: 'A decision you can propose without claiming authority…' },
      C2: { fact: 'What can you attribute with confidence?', factPlaceholder: 'Separate the record from institutional inference…', assumption: 'Where does the record invite overstatement?', assumptionPlaceholder: 'An implication that the evidence does not establish…', responsibility: 'What can you commit to without pre-empting others?', responsibilityPlaceholder: 'A precise next step within your remit…' },
    },
    tryAnother: 'Try another option.', questionsAnswered: 'questions answered', notesReady: 'notes ready', correctAnswers: 'correct answers', reviewFacts: 'Review the facts', writeReply: 'Write your reply',
    replyStep: '04 / Your reply', replyTitle: 'Write the email you would actually send', replyLabel: 'Your reply in English', replyPlaceholder: 'Hi…', replyPrefix: 'Re:', wordUnit: 'words', draftSaved: 'Draft saved locally', beforeSend: 'Before you send', wordGuideNote: 'The word count is a guide. What matters most is that the facts support your claims.', emptyReply: 'Write a reply before opening the comparison.', reviewAnalysis: 'Review your analysis', compareRevise: 'Compare and revise',
    revisionStep: '05 / Revision', revisionTitle: 'What did your reply make clear?', revisionInstruction: 'The model is one possible response. Compare its decisions with yours, then improve your draft.', yourReply: 'Your reply', possibleReply: 'One possible reply', noticeDecisions: 'Notice the decisions', checkReply: 'Check your own reply', compareFirstDraft: 'Compare with your first draft', rewriteReply: 'Rewrite your reply', chooseCase: 'Choose another case',
  },
  fr: {
    languageName: 'Français',
    languageSlug: 'frances',
    stages: { email: 'Courriel', document: 'Faits', analysis: 'Analyser', reply: 'Répondre', review: 'Réviser' },
    axes: { Evidence: 'Preuves', Scope: 'Portée', Intent: 'Intention', Purpose: 'Objectif' },
    intro: {
      B2: { first: 'Avant de répondre,', second: 'vérifiez ce qui s’est passé.', description: 'Un courriel ne raconte parfois qu’une partie de l’histoire. Lisez le message, consultez le dossier interne et rédigez une réponse qui clarifie la situation sans inventer de faits ni chercher un coupable.' },
      C1: { first: 'Avant de répondre,', second: 'démêlez les versions.', description: 'Déterminez quelle version les faits étayent, où subsiste l’incertitude et comment faire avancer l’échange avec une réponse mesurée.' },
      C2: { first: 'Que pouvez-vous affirmer', second: 'sans aller trop loin ?', description: 'Lisez entre les lignes institutionnelles. Distinguez les responsabilités établies des hypothèses et répondez avec précision et tact.' },
    },
    areas: { Marketing: 'Marketing', Software: 'Logiciel', People: 'Ressources humaines', 'Health administration': 'Administration de la santé', Operations: 'Opérations' },
    breadcrumb: 'Expression écrite', preview: 'Aperçu', previewKicker: 'Aperçu éditorial', liveKicker: 'Situations professionnelles', caseCount: '{count} situations à explorer', stepsCount: '5 étapes par situation', localDraft: 'Votre brouillon reste dans ce navigateur',
    filterLabel: 'Filtrer les situations par domaine', allCases: 'Toutes les situations', availableCases: 'Situations disponibles', caseLabel: 'CAS', continueDraft: 'Reprendre votre brouillon', openCase: 'Ouvrir la situation', previewNote: 'Ces situations présentent le format prévu pour les 20 exercices de ce niveau.', yourRole: 'Votre rôle', caseSteps: 'Étapes de la situation',
    emailInput: '01 / Message', emailTitle: 'Vous avez reçu un courriel', emailInstruction: 'Lisez-le comme si vous deviez y répondre.', from: 'De', to: 'À', sent: 'Envoyé', subject: 'Objet', readDocument: 'Lire le document',
    evidenceStep: '02 / Éléments du dossier', backEmail: 'Revenir au courriel', analyseSituation: 'Analyser la situation',
    judgementStep: '03 / Analyse', analysis: {
      B2: { title: 'Distinguez les faits des suppositions', instruction: 'Complétez les trois notes et répondez correctement aux quatre questions avant de rédiger. Chaque option explique ce qu’elle établit, ou non.' },
      C1: { title: 'Pesez les versions en présence', instruction: 'Notez la lecture la mieux étayée, une autre que vous ne pouvez écarter et la décision que votre réponse doit faciliter. Répondez ensuite aux quatre questions.' },
      C2: { title: 'Mesurez la portée du dossier', instruction: 'Examinez l’attribution, l’incertitude et votre marge de manœuvre avant de rédiger. Les quatre questions éprouvent les limites de chaque affirmation.' },
    },
    notes: {
      B2: { fact: 'Quel fait est confirmé ?', factPlaceholder: 'Un fait appuyé par le document…', assumption: 'Qu’a-t-on supposé ?', assumptionPlaceholder: 'Une supposition à clarifier…', responsibility: 'Quelle part pouvez-vous assumer ?', responsibilityPlaceholder: 'Votre part dans le malentendu…' },
      C1: { fact: 'Quelle version est la mieux étayée ?', factPlaceholder: 'Citez les éléments et leurs limites…', assumption: 'Quelle autre lecture faut-il reconnaître ?', assumptionPlaceholder: 'Une interprétation plausible encore ouverte…', responsibility: 'Quelle décision faut-il prendre, et par qui ?', responsibilityPlaceholder: 'Une décision à proposer sans usurper un rôle…' },
      C2: { fact: 'Que pouvez-vous attribuer avec certitude ?', factPlaceholder: 'Distinguez le dossier des inférences institutionnelles…', assumption: 'Où risque-t-on d’en dire trop ?', assumptionPlaceholder: 'Une implication que les faits ne démontrent pas…', responsibility: 'Quel engagement pouvez-vous prendre sans préjuger de la suite ?', responsibilityPlaceholder: 'Une prochaine étape précise dans votre domaine de compétence…' },
    },
    tryAnother: 'Essayez une autre réponse.', questionsAnswered: 'questions traitées', notesReady: 'notes prêtes', correctAnswers: 'bonnes réponses', reviewFacts: 'Relire les faits', writeReply: 'Rédiger la réponse',
    replyStep: '04 / Votre réponse', replyTitle: 'Rédigez le courriel que vous enverriez réellement', replyLabel: 'Votre réponse en français', replyPlaceholder: 'Bonjour…', replyPrefix: 'Ré :', wordUnit: 'mots', draftSaved: 'Brouillon enregistré ici', beforeSend: 'Avant d’envoyer', wordGuideNote: 'La longueur est indicative. L’essentiel est de pouvoir étayer vos affirmations par les faits.', emptyReply: 'Rédigez une réponse avant d’ouvrir la comparaison.', reviewAnalysis: 'Revoir votre analyse', compareRevise: 'Comparer et réviser',
    revisionStep: '05 / Révision', revisionTitle: 'Qu’avez-vous clarifié dans votre réponse ?', revisionInstruction: 'Le modèle présente une réponse possible. Comparez ses choix aux vôtres, puis améliorez votre brouillon.', yourReply: 'Votre réponse', possibleReply: 'Une réponse possible', noticeDecisions: 'Repérez les choix', checkReply: 'Relisez votre réponse', compareFirstDraft: 'Comparer avec le premier brouillon', rewriteReply: 'Réécrire votre réponse', chooseCase: 'Choisir une autre situation',
  },
}
