import fs from 'fs';
const files=['fase4-fichas-1-3.md','fase4-fichas-4-6.md','fase4-fichas-7-8.md'];
const rows=[];
for(const f of files){
  const lines=fs.readFileSync('/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/'+f,'utf8').split('\n');
  let inTable=false;
  for(const l of lines){
    if(/^### Andamiaje/.test(l)){inTable=true;continue;}
    if(inTable && /^###|^##|^# /.test(l)){inTable=false;continue;}
    if(!inTable) continue;
    const m=l.match(/^\|\s*`([^`]+)`\s*\|([^|]+)\|\s*(\w+)\s*\|/);
    if(m) rows.push({f,form:m[1].trim(),use:m[2].trim(),reg:m[3].trim()});
  }
}
const g=new Map();
for(const r of rows){const k=r.use.toLowerCase();g.set(k,(g.get(k)||0)+1);}
console.log('glosas repetidas literalmente:');
for(const [k,c] of [...g.entries()].filter(([,c])=>c>1).sort((a,b)=>b[1]-a[1])) console.log(c,'×',k);
const reg=new Map();
for(const r of rows) reg.set(r.reg,(reg.get(r.reg)||0)+1);
console.log('\nregistro:',[...reg.entries()].map(([k,v])=>`${k} ${v} (${(v/rows.length*100).toFixed(1)}%)`).join(' · '),'sobre',rows.length);
