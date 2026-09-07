import {
  createStructureEditorialPack,
  type StructureEditorialErrorSeed,
  type StructureEditorialChoiceSeed,
  type StructureEditorialFinalSeed,
  type StructureEditorialGapSeed,
  type StructureEditorialMicroSeed,
  type StructureEditorialSequenceSeed,
} from './editorial-structure-builder.ts'
import type { KoreanFormId } from './korean-structure-quest-config.ts'

export type KoreanEditorialChoiceSeed = StructureEditorialChoiceSeed

type KoreanAnswer = string | [string, ...string[]]
export type KoreanCompactMicro = [string, string, string, string, string, KoreanAnswer, string, string, string]
export type KoreanCompactStory = [
  string, [string, string, string, string], [string, string, string], [KoreanAnswer, KoreanAnswer, KoreanAnswer],
  0 | 1 | 2, string, string, [string, string, string], 0 | 1 | 2,
]
export type KoreanCompactFinal = [string, string, KoreanAnswer, string, string, string, string?]

const positionLabels = ['첫 번째', '두 번째', '마지막'] as const
const asAnswers = (answer: KoreanAnswer): [string, ...string[]] => Array.isArray(answer) ? answer : [answer]
let compactPackIndex=0

export function createKoreanEditorialPack(input: {
  slug:string
  form:KoreanFormId
  focus:string
  rule:string
  choices?:KoreanEditorialChoiceSeed[]
  micro:KoreanCompactMicro[]
  stories:KoreanCompactStory[]
  final:KoreanCompactFinal[]
}) {
  const errorOffset=compactPackIndex%3
  compactPackIndex+=1
  const micro:StructureEditorialMicroSeed[] = input.micro.map(([title,cue,before,after,verb,answer,...distractors]) => ({
    title,cue,segments:[before,after],verb,answers:asAnswers(answer),distractors:distractors as [string,string,string],
  }))
  const long:StructureEditorialGapSeed[] = input.stories.map(([title,segments,verbs,answers]) => ({
    title,instruction:'하나의 자연스러운 장면이 되도록 세 동사 표현을 완성하세요.',segments,
    entries:[[verbs[0],asAnswers(answers[0])],[verbs[1],asAnswers(answers[1])],[verbs[2],asAnswers(answers[2])]],
  }))
  const errors:StructureEditorialErrorSeed[] = input.final.map((_,index) => {
    const selected=[input.final[index],input.final[(index+3)%input.final.length],input.final[(index+6)%input.final.length]]
    const wrong=((index+errorOffset)%3) as 0|1|2
    return {
      title:`교정 기록 · ${index+1}`,
      pieces:selected.map((entry,position)=>[
        `${position===0?'':`${selected[position-1][1]} `}${entry[0]}`,
        position===wrong?entry[3+(index%3)]:asAnswers(entry[2])[0],
      ]) as StructureEditorialErrorSeed['pieces'],
      after:selected[2][1],wrong,answers:asAnswers(selected[wrong][2]),
      reason:'이 기록의 시제·상·기능·높임 단서에는 고친 표현만 맞습니다.',
    }
  })
  const sequences:StructureEditorialSequenceSeed[] = input.stories.map(([, ,verbs,answers, , , ,events,target]) => ({
    events,target,production:{sentence:events[target],verb:verbs[target],answers:asAnswers(answers[target])},
  }))
  const final:StructureEditorialFinalSeed[] = input.final.map(([before,after,answer,distractor1,distractor2,distractor3,verb]) => ({
    before,after,answer:asAnswers(answer)[0],answers:asAnswers(answer),verb,distractors:[distractor1,distractor2,distractor3],
  }))
  const secondHalf = new Set(['result-state','experience','conditional','purpose-intention','request-prohibition'])
  const choiceOffset = secondHalf.has(input.slug) ? 0 : 2
  return createStructureEditorialPack({
    namespace:'ko',slug:input.slug,form:input.form,focus:input.focus,rule:input.rule,choices:input.choices,micro,long,errors,sequences,final,
    choicePositions:Array.from({length:10},(_,index)=>(index+choiceOffset)%4),finalOffset:choiceOffset,
    ui:{
      choose:(cue)=>`${cue}에 맞는 완전한 표현을 고르세요.`,
      write:(verb)=>`‘${verb}’을/를 문맥과 높임 단계에 맞게 바꾸어 전체 표현을 쓰세요.`,
      error:'장면의 시제·상·높임을 깨뜨리는 표현 하나를 고르고 전체를 고쳐 쓰세요.',
      sequenceTitle:(index)=>`의미 흐름 · ${index}`,
      sequenceContext:()=> '준비·행동·결과의 관계로 순서를 복원하세요. 완성된 순서는 일부러 보여 주지 않습니다.',
      sequenceQuestion:(position)=>`${positionLabels[position]} 사건은 무엇인가요?`,
      sequenceHint:'모든 선택지는 같은 목표 표현을 사용합니다. 형태가 아니라 사건의 흐름으로 판단하세요.',
      sequenceExplanation:(answer)=>`‘${answer}’은/는 장면의 의미 흐름 때문에 이 자리에 옵니다.`,
      writtenSuffix:'빈칸 밖의 말을 다시 쓰지 않습니다. 보조 표현과 종결형은 답에 포함합니다.',
      finalTitle:`최종 기록 · ${input.focus}`,
      finalInstruction:'열 개의 동사 표현을 모두 쓰세요. 각 기록에는 시제·상·기능·높임의 단서가 따로 있습니다.',
      finalIntro:'현장 기록의 첫 항목입니다. ',
      finalBridge:(index)=>` 기록 ${index + 1}: `,
    },
  })
}
