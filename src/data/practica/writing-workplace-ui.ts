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
      B2: { title: 'Separate what happened from what was assumed', instruction: 'Before you reply, jot down three things: what the document confirms, what the email assumes, and what you can clarify or check next. Then answer the four questions.' },
      C1: { title: 'Weigh the competing accounts', instruction: 'Note which account fits the evidence best, what remains possible, and which decision your reply should support. Then answer the four questions.' },
      C2: { title: 'Decide what you can safely claim', instruction: 'Note what you can establish, where a claim would overreach, and what you can responsibly propose. Then test your reading with the four questions.' },
    },
    notes: {
      B2: { fact: 'What does the document confirm?', factPlaceholder: 'Choose one fact that matters for your reply.', assumption: 'What does the sender assume?', assumptionPlaceholder: 'Name a claim the document does not confirm.', responsibility: 'What can you clarify or check next?', responsibilityPlaceholder: 'Choose one step you can take.' },
      C1: { fact: 'Which version fits the record best?', factPlaceholder: 'Give the evidence and one limit.', assumption: 'What other explanation remains possible?', assumptionPlaceholder: 'Name a plausible alternative, not a fact.', responsibility: 'What decision should your reply help with?', responsibilityPlaceholder: 'State the decision and who can make it.' },
      C2: { fact: 'What can you state with confidence?', factPlaceholder: 'Separate what the record shows from what it implies.', assumption: 'Which conclusion would go too far?', assumptionPlaceholder: 'Name a claim the record does not justify.', responsibility: 'What can you promise or propose?', responsibilityPlaceholder: 'Choose a precise step within your authority.' },
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
      B2: { title: 'Distinguez les faits des suppositions', instruction: 'Avant de répondre, notez ce que le document confirme, ce que l’expéditeur suppose et ce que vous pouvez expliquer ou vérifier. Répondez ensuite aux quatre questions.' },
      C1: { title: 'Comparez les versions', instruction: 'Notez la version qui correspond le mieux aux faits, une autre explication encore possible et la décision que votre réponse doit aider à prendre. Puis répondez aux quatre questions.' },
      C2: { title: 'Déterminez ce que vous pouvez affirmer', instruction: 'Notez ce que le dossier établit, la conclusion qui irait trop loin et la suite que vous pouvez proposer. Vérifiez ensuite votre analyse avec les quatre questions.' },
    },
    notes: {
      B2: { fact: 'Que confirme le document ?', factPlaceholder: 'Choisissez un fait utile pour votre réponse.', assumption: 'Que suppose l’expéditeur ?', assumptionPlaceholder: 'Relevez une affirmation que le document ne confirme pas.', responsibility: 'Que pouvez-vous expliquer ou vérifier ?', responsibilityPlaceholder: 'Choisissez une prochaine étape à votre portée.' },
      C1: { fact: 'Quelle version correspond le mieux aux faits ?', factPlaceholder: 'Donnez un élément de preuve et sa limite.', assumption: 'Quelle autre explication reste possible ?', assumptionPlaceholder: 'Nommez une possibilité, sans la présenter comme un fait.', responsibility: 'Quelle décision votre réponse doit-elle éclairer ?', responsibilityPlaceholder: 'Précisez la décision et qui peut la prendre.' },
      C2: { fact: 'Que pouvez-vous affirmer avec certitude ?', factPlaceholder: 'Distinguez le constat de son interprétation.', assumption: 'Quelle conclusion irait trop loin ?', assumptionPlaceholder: 'Relevez une affirmation que le dossier ne justifie pas.', responsibility: 'Que pouvez-vous promettre ou proposer ?', responsibilityPlaceholder: 'Choisissez une étape précise qui relève de votre rôle.' },
    },
    tryAnother: 'Essayez une autre réponse.', questionsAnswered: 'questions traitées', notesReady: 'notes prêtes', correctAnswers: 'bonnes réponses', reviewFacts: 'Relire les faits', writeReply: 'Rédiger la réponse',
    replyStep: '04 / Votre réponse', replyTitle: 'Rédigez le courriel que vous enverriez réellement', replyLabel: 'Votre réponse en français', replyPlaceholder: 'Bonjour…', replyPrefix: 'Ré :', wordUnit: 'mots', draftSaved: 'Brouillon enregistré ici', beforeSend: 'Avant d’envoyer', wordGuideNote: 'La longueur est indicative. L’essentiel est de pouvoir étayer vos affirmations par les faits.', emptyReply: 'Rédigez une réponse avant d’ouvrir la comparaison.', reviewAnalysis: 'Revoir votre analyse', compareRevise: 'Comparer et réviser',
    revisionStep: '05 / Révision', revisionTitle: 'Qu’avez-vous clarifié dans votre réponse ?', revisionInstruction: 'Le modèle présente une réponse possible. Comparez ses choix aux vôtres, puis améliorez votre brouillon.', yourReply: 'Votre réponse', possibleReply: 'Une réponse possible', noticeDecisions: 'Repérez les choix', checkReply: 'Relisez votre réponse', compareFirstDraft: 'Comparer avec le premier brouillon', rewriteReply: 'Réécrire votre réponse', chooseCase: 'Choisir une autre situation',
  },
}
