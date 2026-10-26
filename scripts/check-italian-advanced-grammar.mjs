#!/usr/bin/env node
import {existsSync,statSync} from 'node:fs'
import path from 'node:path'
import b2Topics from '../src/data/grammar/italiano/b2/index.ts'
import c1Topics from '../src/data/grammar/italiano/c1/index.ts'
import c2Topics from '../src/data/grammar/italiano/c2/index.ts'
const ROOT=process.cwd(),levels={b2:b2Topics,c1:c1Topics,c2:c2Topics},problems=[]
function decisions(topic){return topic.practice.levels.reduce((total,level)=>level.type==='dual'?total+level.items.reduce((sum,item)=>sum+item.blanks.length,0):level.type==='choice'||level.type==='write'?total+level.items.length:total+level.blanks.length,0)}
for(const [level,topics] of Object.entries(levels)){
  if(topics.length!==30)problems.push(`${level.toUpperCase()}: attesi 30 argomenti, trovati ${topics.length}`)
  const slugs=new Set(),orders=new Set()
  for(const topic of topics){
    const where=`${level}/${topic.slug}`
    if(slugs.has(topic.slug))problems.push(`${where}: slug duplicato`)
    if(orders.has(topic.order))problems.push(`${where}: ordine duplicato ${topic.order}`)
    slugs.add(topic.slug);orders.add(topic.order)
    if(topic.level!==level.toUpperCase())problems.push(`${where}: livello interno errato`)
    if(topic.practice.levels.length!==6)problems.push(`${where}: servono sei fasi di pratica`)
    if(decisions(topic)<30)problems.push(`${where}: meno di 30 decisioni di apprendimento`)
    if(topic.seo.length<4)problems.push(`${where}: servono quattro sezioni pedagogiche`)
    if(topic.outcomes.length<4)problems.push(`${where}: servono quattro obiettivi`)
    if(topic.guide.table.length<4)problems.push(`${where}: tabella di riferimento incompleta`)
    if(topic.visual.scene.length<3)problems.push(`${where}: mappa visiva incompleta`)
    const stem=`idiomaswl-${topic.slug}`
    for(const suffix of ['','-esercizi','-soluzioni']){
      const file=path.join(ROOT,'private','site-materials',`italiano-${level}`,'grammar',`${stem}${suffix}.pdf`)
      if(!existsSync(file))problems.push(`${where}: PDF mancante ${path.relative(ROOT,file)}`)
      else if(statSync(file).size<50_000)problems.push(`${where}: PDF insolitamente piccolo ${path.relative(ROOT,file)}`)
    }
  }
}
if(problems.length){console.error(`Controllo grammatica italiana B2-C2 fallito: ${problems.length} problema/i`);problems.forEach(problem=>console.error(`- ${problem}`));process.exit(1)}
console.log('✓ Italiano B2-C2: 90 argomenti completi, 6 fasi per lezione e 270 PDF verificati.')
