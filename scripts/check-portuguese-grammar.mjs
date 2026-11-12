#!/usr/bin/env node
import assert from 'node:assert/strict'
import {existsSync,statSync} from 'node:fs'
import path from 'node:path'
import a1 from '../src/data/grammar/portugues/a1/index.ts'
import a2 from '../src/data/grammar/portugues/a2/index.ts'
import b1 from '../src/data/grammar/portugues/b1/index.ts'
const levels={a1,a2,b1},ROOT=process.cwd(),withAssets=process.argv.includes('--assets')
const marks=(text)=>[...String(text??'').matchAll(/\[\[(\d+)\]\]/g)].map((m)=>Number(m[1]))
const decisions=(topic)=>topic.practice.levels.reduce((sum,stage)=>stage.type==='dual'?sum+stage.items.reduce((n,item)=>n+item.blanks.length,0):stage.type==='choice'||stage.type==='write'?sum+stage.items.length:sum+stage.blanks.length,0)
let total=0
for(const [level,topics] of Object.entries(levels)){
  assert.equal(topics.length,20,`${level}: são esperadas 20 aulas`)
  assert.equal(new Set(topics.map((t)=>t.slug)).size,20,`${level}: slugs duplicados`)
  assert.deepEqual(topics.map((t)=>Number(t.order)),Array.from({length:20},(_,i)=>i+1),`${level}: ordem incompleta`)
  let levelTotal=0
  for(const topic of topics){
    const at=`${level}/${topic.slug}`
    assert.equal(topic.practice.levels.length,6,`${at}: seis etapas obrigatórias`)
    const types=new Set(topic.practice.levels.map((s)=>s.type)); for(const type of ['choice','dual','guidedText','freeText','write'])assert.ok(types.has(type),`${at}: falta ${type}`)
    for(const stage of topic.practice.levels){
      if(stage.type==='choice'){assert.ok(stage.items.length>=5,`${at}: escolha curta`);for(const item of stage.items)assert.ok(item.options.some((o)=>o.toLocaleLowerCase('pt')===item.answer.toLocaleLowerCase('pt')),`${at}: resposta ausente`)}
      if(stage.type==='dual')for(const item of stage.items)assert.deepEqual(marks(item.lines.flat().join(' ')),item.blanks.map((_,i)=>i),`${at}: marcadores inválidos`)
      if(stage.type==='guidedText'||stage.type==='freeText')assert.deepEqual(marks(stage.text),stage.blanks.map((_,i)=>i),`${at}: marcadores inválidos`)
    }
    const words=[topic.description,topic.lead,...topic.seo.flatMap((s)=>s.paragraphs??[])].join(' ').split(/\s+/u).filter(Boolean).length
    const tables=1+topic.seo.filter((s)=>s.table?.length).length,rows=topic.guide.table.length+topic.seo.reduce((n,s)=>n+(s.table?.length??0),0),n=decisions(topic)
    assert.ok(words>=(level==='b1'?650:level==='a2'?600:550),`${at}: explicação curta (${words})`)
    assert.ok(tables>=6&&rows>=30,`${at}: tabelas insuficientes`)
    assert.ok(topic.visual.scene.length>=(level==='b1'?10:level==='a2'?9:8),`${at}: mapa incompleto`)
    assert.ok(n>=(level==='b1'?50:level==='a2'?45:40),`${at}: prática curta`)
    if(withAssets){const root=path.join(ROOT,'private','site-materials',`portugues-${level}`,'grammar'),stem=topic.slug.endsWith(`-${level}`)?`idiomaswl-${topic.slug}`:`idiomaswl-${topic.slug}-${level}`;for(const suffix of ['','-exercicios','-gabarito']){const file=path.join(root,`${stem}${suffix}.pdf`);assert.ok(existsSync(file)&&statSync(file).size>50_000,`${at}: PDF ausente ou pequeno`)}}
    levelTotal+=n
  }
  total+=levelTotal;console.log(`✓ Português ${level.toUpperCase()}: 20 aulas e ${levelTotal} decisões.`)
}
console.log(`✓ Português A1-B1: 60 aulas e ${total} decisões${withAssets?' com 180 PDFs verificados':''}.`)
