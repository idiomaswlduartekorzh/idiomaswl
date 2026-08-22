// §11: la celda `here` del vocabulario es la más calcable de la ficha. Se escribe como NOTA
// de propósito. «Si la celda contiene algo entrecomillado o algo que empiece por un pronombre
// y un verbo conjugado, reescríbela.» Esto aplica esa prueba, literal, a las 157 celdas.
import { readFileSync } from 'node:fs';
const R=JSON.parse(readFileSync('/tmp/habla-set11.json','utf8'));
const COMILLA=/[“”"'`]{1}\s*[A-Z]|«|`[A-Z]/;
const PRONVERB=/^\s*\**(I|You|We|They|He|She|It)\b\s+(am|are|is|was|were|have|has|had|do|does|did|can|can't|cannot|could|will|won't|would|should|must|need|want|know|think|say|said|pay|paid|owe|leave|leaves|left|take|takes|give|gives|get|gets|go|goes|come|comes|put|puts|make|makes|tell|tells|work|works|ask|asks|see|sees|bring|brings|keep|keeps|hold|holds|open|opens|close|closes|lose|loses|stay|stays|[a-z]+)\b/;
let comillas=[], pronverb=[], total=0;
for(const r of R) for(const v of r.vocab){ total++;
  const h=v.here||'';
  if(COMILLA.test(h)) comillas.push(`${r.n}${r.rol} · ${v.word} → ${h}`);
  if(PRONVERB.test(h)) pronverb.push(`${r.n}${r.rol} · ${v.word} → ${h}`);
}
console.log(`celdas \`here\` examinadas: ${total}`);
console.log(`\ncon algo ENTRECOMILLADO: ${comillas.length} (${(comillas.length/total*100).toFixed(1)} %)`);
comillas.forEach(x=>console.log('  · '+x));
console.log(`\nque empiezan por PRONOMBRE + VERBO CONJUGADO: ${pronverb.length} (${(pronverb.length/total*100).toFixed(1)} %)`);
pronverb.forEach(x=>console.log('  · '+x));
// misma prueba sobre los datos duros
let dat=0, datFail=[];
for(const r of R) for(const f of r.facts){ dat++;
  if(PRONVERB.test(f.split('|')[1]||'')||COMILLA.test(f)) datFail.push(`${r.n}${r.rol} · ${f}`); }
console.log(`\nfilas de DATOS DUROS: ${dat} · con frase decible o comillas: ${datFail.length} (${(datFail.length/dat*100).toFixed(1)} %)`);
datFail.forEach(x=>console.log('  · '+x));
