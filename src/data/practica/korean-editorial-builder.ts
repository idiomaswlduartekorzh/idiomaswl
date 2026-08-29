import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { KoreanFormId } from './korean-structure-quest.ts'

type KoreanAnswer = string | [string, ...string[]]
export type KoreanCompactMicro = [string, string, string, string, string, KoreanAnswer, string, string, string]
export type KoreanCompactStory = [
  string, [string, string, string, string], [string, string, string], [KoreanAnswer, KoreanAnswer, KoreanAnswer],
  0 | 1 | 2, string, string, [string, string, string], 0 | 1 | 2,
]
export type KoreanCompactFinal = [string, string, string, string, string, string]

const positionLabels = ['첫 번째', '두 번째', '마지막'] as const
const asAnswers = (answer: KoreanAnswer): [string, ...string[]] => Array.isArray(answer) ? answer : [answer]

export function createKoreanEditorialPack(input: {
  slug:string
  form:KoreanFormId
  focus:string
  rule:string
  micro:KoreanCompactMicro[]
  stories:KoreanCompactStory[]
  final:KoreanCompactFinal[]
}) {
  const micro:StructureEditorialMicroSeed[] = input.micro.map(([title,cue,before,after,verb,answer,...distractors]) => ({
    title,cue,segments:[before,after],verb,answers:asAnswers(answer),distractors:distractors as [string,string,string],
  }))
  const long:StructureEditorialGapSeed[] = input.stories.map(([title,segments,verbs,answers]) => ({
    title,instruction:'하나의 자연스러운 장면이 되도록 세 동사 표현을 완성하세요.',segments,
    entries:[[verbs[0],asAnswers(answers[0])],[verbs[1],asAnswers(answers[1])],[verbs[2],asAnswers(answers[2])]],
  }))
  const errors:StructureEditorialErrorSeed[] = input.stories.map(([title,segments,,answers,wrong,wrongForm,reason]) => ({
    title,pieces:answers.map((answer,index) => [segments[index],index === wrong ? wrongForm : asAnswers(answer)[0]]) as StructureEditorialErrorSeed['pieces'],
    after:segments[3],wrong,answers:asAnswers(answers[wrong]),reason,
  }))
  const sequences:StructureEditorialSequenceSeed[] = input.stories.map(([, , , , , , ,events,target]) => ({ events,target }))
  const final:StructureEditorialFinalSeed[] = input.final.map(([before,after,answer,...distractors]) => ({ before,after,answer,distractors:distractors as [string,string,string] }))
  const secondHalf = new Set(['result-state','experience','conditional','purpose-intention','request-prohibition'])
  const choiceOffset = secondHalf.has(input.slug) ? 0 : 2
  return createStructureEditorialPack({
    namespace:'ko',slug:input.slug,form:input.form,focus:input.focus,rule:input.rule,micro,long,errors,sequences,final,
    choicePositions:Array.from({length:10},(_,index)=>(index+choiceOffset)%4),finalOffset:choiceOffset,
    ui:{
      choose:(cue)=>`${cue}에 맞는 완전한 표현을 고르세요.`,
      write:(verb)=>`‘${verb}’을/를 문맥과 높임 단계에 맞게 바꾸어 전체 표현을 쓰세요.`,
      error:'장면의 시제·상·높임을 깨뜨리는 표현 하나를 고르고 전체를 고쳐 쓰세요.',
      sequenceTitle:(index)=>`의미 흐름 · ${index}`,
      sequenceContext:([first,second,third])=>`${first}. 이어서 ${second}. 마지막으로 ${third}.`,
      sequenceQuestion:(position)=>`${positionLabels[position]} 사건은 무엇인가요?`,
      sequenceHint:'모든 선택지는 같은 목표 표현을 사용합니다. 형태가 아니라 사건의 흐름으로 판단하세요.',
      sequenceExplanation:(answer)=>`‘${answer}’은/는 장면의 의미 흐름 때문에 이 자리에 옵니다.`,
      writtenSuffix:'빈칸 밖의 말을 다시 쓰지 않습니다. 보조 표현과 종결형은 답에 포함합니다.',
    },
  })
}
