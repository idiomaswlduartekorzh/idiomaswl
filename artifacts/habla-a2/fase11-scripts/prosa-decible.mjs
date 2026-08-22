// §11: la prosa se escribe SOBRE el jugador, nunca POR él. `You need someone to open on Saturday`
// sí; `I need someone to open on Saturday` no. Prueba mecánica: oración de prosa que empiece por
// I / We / My / Our + verbo — o sea, una línea que el jugador podría decir tal cual.
import { readFileSync } from 'node:fs';
const R=JSON.parse(readFileSync('/tmp/habla-set11.json','utf8'));
const P=/\b(I|We|My|Our)\b\s+[a-z']+/;
let n=0, hits=[];
for(const r of R){
  for(const l of r.prosaLineas){
    const t=l.replace(/\*\*/g,'').replace(/`[^`]*`/g,' ').trim();
    if(!t||t.startsWith('>')||t.startsWith('|')) continue;
    for(const s of t.split(/(?<=[.!?·])\s+/)){ if(!/[a-z]{3}/.test(s)) continue; n++;
      if(/^\s*(I|We|My|Our)\b/.test(s)) hits.push(`${r.n}${r.rol}: ${s.slice(0,110)}`); }
  }
}
console.log(`oraciones de prosa examinadas: ${n}`);
console.log(`empiezan por I / We / My / Our (decibles tal cual): ${hits.length} = ${(hits.length/n*100).toFixed(1)} %`);
hits.forEach(h=>console.log('  · '+h));
// Y el reverso: ¿la prosa es legible? oraciones sin verbo finito (telegrama)
const FIN=/\b(is|are|was|were|am|be|do|does|did|has|have|had|can|can't|could|will|won't|would|should|must|need|needs|want|wants|say|says|said|go|goes|went|come|comes|know|knows|pay|pays|paid|ask|asks|asked|leave|leaves|left|take|takes|took|give|gives|gave|get|gets|got|put|puts|make|makes|made|tell|tells|told|work|works|worked|arrive|arrives|start|starts|open|opens|sign|signs|write|writes|wrote|use|uses|used|cost|costs|counts|lose|loses|lost|stay|stays|stop|stops|sleep|sleeps|hurts|hurt|call|calls|bring|brings|fits|feel|feels|owe|owes|sit|sits|check|checks|see|sees|saw|find|finds|found|move|moves|change|changes|thinks|think|talk|talks|happens|happened|rides|walks|cooks|eats|lit|read|reads|wrote|told|keeps|keep|holds|hold)\b/i;
let tel=0, tot=0;
for(const r of R) for(const l of r.prosaLineas){
  const t=l.replace(/\*\*/g,'').replace(/`[^`]*`/g,' ').trim();
  if(!t||t.startsWith('>')||t.startsWith('|')) continue;
  for(const s of t.split(/(?<=[.!?])\s+/)){ if(!/[a-z]{3}/.test(s)) continue; tot++; if(!FIN.test(s)) tel++; }
}
console.log(`\noraciones de prosa sin verbo finito (telegrama, lo que §11 prohíbe en prosa): ${tel}/${tot} = ${(tel/tot*100).toFixed(1)} %`);
