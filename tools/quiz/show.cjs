const q=JSON.parse(require("fs").readFileSync(process.argv[2],"utf8"));
for(const x of q){let s=`[${x.id}] ${x.mode}/${x.difficulty} ${x.wikiPath}\nQ: ${x.text}\n`;
if(x.options)x.options.forEach((o,i)=>s+=`  ${i===x.correctIndex?"*":" "} ${o}\n`);else s+=`  => ${x.correctJaNein?"STIMMT":"STIMMT NICHT"}\n`;
s+=`E: ${x.explanation}\n`;console.log(s);}
