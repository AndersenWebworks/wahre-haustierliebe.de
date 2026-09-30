const fs=require('fs'),path=require('path');
const out=process.argv[2];
for(const p of process.argv.slice(3)){
 let h=fs.readFileSync(p+'/index.html','utf8');
 const m=h.match(/<main[\s\S]*?<\/main>/i); if(m) h=m[0];
 h=h.replace(/<(script|style|nav|footer|svg)[\s\S]*?<\/\1>/gi,' ').replace(/<\/(p|h[1-6]|li|tr|div)>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n');
 fs.writeFileSync(path.join(out,p.replace(/\//g,'_')+'.txt'),h);
 console.log(p,h.length);
}
