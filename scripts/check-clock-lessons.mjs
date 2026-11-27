import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { clockLanguageKeys, clockLessonUrl, clockMaterials } from '../src/data/clock-lessons/catalog.ts'
import { getClockLesson } from '../src/data/clock-lessons/lessons.ts'
import { matchesClockAnswer, normalizeClockAnswer } from '../src/lib/clock-answer.ts'
import { clockInfographic } from '../src/lib/clock-infographic.ts'
import german from '../src/data/grammar/aleman/a1/uhrzeit.ts'

const languages = ['ingles', 'frances', 'aleman', 'italiano', 'portugues', 'coreano', 'japones', 'ruso']
assert.deepEqual(new Set(clockLanguageKeys), new Set(languages))
assert.equal(new Set(clockLanguageKeys.map(clockLessonUrl)).size, 8)
const samples = {
  ingles: ['It is half past four!', 'It’s half past five.'],
  frances: ['Il est quatre heures trente.', 'Il est quatre heures treize.'],
  italiano: ['Sono le quattro e mezzo.', 'Sono le cinque e mezza.'],
  portugues: ['São quatro e trinta.', 'São cinco e trinta.'],
  coreano: ['네시 반이에요.', '세 시 반이에요.'],
  japones: ['よじはんです。', '三時半です。'],
  ruso: ['Четыре тридцать.', 'Половина четвёртого.'],
}
let count = 0
for (const language of languages) {
  const topic = language === 'aleman' ? german : getClockLesson(language).topic
  const { clocks } = topic.visual
  assert.deepEqual(clocks.map(c=>c.minute), [0,5,15,30,45,55])
  assert(clocks.every(c=>c.hour === 3 && c.digital === '03:'+String(c.minute).padStart(2,'0') && c.sentence && c.note && c.hourHint && c.minuteHint))
  const poster = clockInfographic(clocks, language)
  assert.equal((poster.match(/data-clock-card/g) ?? []).length,6)
  for (const example of clocks) assert(poster.includes(example.digital))
  const scenes = topic.seo.flatMap(s=>s.clockConversations ?? [])
  assert.equal(scenes.length,3)
  assert.deepEqual(scenes.flatMap(s=>s.exchanges.map(e=>e.time)),['06:30','14:10','08:45','09:00'])
  for (const scene of scenes) {
    assert(existsSync('public/images/grammar/aleman/uhrzeit/'+scene.image+'.webp'))
    assert(scene.alt && scene.exchanges.every(e=>e.answer && e.question && e.questionEs && e.answerEs))
  }
  const levels = topic.practice.levels
  assert.equal(levels.length,6)
  const items = levels.flatMap(level=>level.type === 'dual' ? level.items.flatMap(item=>item.blanks) : level.items ?? level.blanks)
  assert.equal(items.length,41)
  count += items.length
  assert(topic.guide.clockTips.length>=5)
  assert(levels[5].items.every(i=>i.strict && i.clockLanguage===language))
  for(const level of levels) {
    if (level.type==='choice') for(const item of level.items) {
      assert.equal(new Set(item.options).size,item.options.length)
      assert.equal(item.options.filter(o=>o===item.answer).length,1)
    }
    if (level.type==='guidedText' || level.type==='freeText') {
      assert.deepEqual([...level.text.matchAll(/\[\[(\d+)\]\]/g)].map(m=>Number(m[1])),level.blanks.map((_,i)=>i))
    }
  }
  for (const level of levels.filter(l=>l.type==='write')) for (const item of level.items) {
    assert(item.strict,language+' marked writing')
    for (const accepted of [item.answer,...(item.accepted??[])]) assert(matchesClockAnswer(accepted,item.answer,item.accepted??[],language))
    for (const wrong of ['', 'Otra hora', '99:99', item.answer+' 11:41']) assert(!matchesClockAnswer(wrong,item.answer,item.accepted??[],language))
  }
  if (language === 'aleman') {
    const meeting = levels[3].blanks[1], five=levels[4].items[4]
    assert(matchesClockAnswer('Um drei.', meeting.answer,meeting.accepted,language))
    assert(matchesClockAnswer('Es ist zehn Minuten nach fünf.',five.answer,five.accepted,language))
    for (const item of levels[5].items) assert(!matchesClockAnswer('Es ist um sieben Uhr am Abend.',item.answer,item.accepted??[],language))
  } else {
    const half = levels[4].items.find(i=>i.clock.hour===4 && i.clock.minute===30)
    const [right,wrong]=samples[language]
    assert(matchesClockAnswer(right,half.answer,half.accepted,language),language+' legitimate alternative')
    assert(!matchesClockAnswer(wrong,half.answer,half.accepted,language),language+' wrong hour')
    const pdfs = Object.values(clockMaterials(language))
    assert.equal(new Set(pdfs).size,3)
    for(const url of pdfs) assert.equal(readFileSync(url.replace('/api/site-materials/','private/site-materials/')).subarray(0,5).toString(),'%PDF-')
  }
}
assert.notEqual(normalizeClockAnswer('à','frances'),normalizeClockAnswer('a','frances'))
console.log(`Ocho idiomas, ${count} respuestas calificables. Pasaron relojes, diálogos, materiales y corrección de variantes.`)
