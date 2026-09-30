// patch.cjs <datei> <patches.json>: [{id, text?, options?, correctIndex?, explanation?, difficulty?, remove?}]
const fs=require("fs");const [f,p]=process.argv.slice(2);
let q=JSON.parse(fs.readFileSync(f,"utf8"));const patches=JSON.parse(fs.readFileSync(p,"utf8"));
for(const x of patches){const i=q.findIndex(e=>e.id===x.id);if(i<0)throw new Error("fehlt "+x.id);
 if(x.remove){q.splice(i,1);continue;} const {id,remove,...rest}=x; Object.assign(q[i],rest);}
fs.writeFileSync(f,JSON.stringify(q,null,2));console.log("ok",q.length);
