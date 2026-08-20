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
    const m=l.match(/^\|\s*`([^`]+)`\s*\|/);
    if(m) rows.push({f,form:m[1].trim()});
  }
}
console.log('total exponentes:',rows.length);
const map=new Map();
for(const r of rows){const k=r.form.toLowerCase();map.set(k,(map.get(k)||0)+1);}
const dup=[...map.entries()].filter(([,c])=>c>1).sort((a,b)=>b[1]-a[1]);
console.log('formas idénticas repetidas:',dup.length);
for(const [k,c] of dup) console.log(c,'×',k);
