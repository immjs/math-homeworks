(async ()=>{
const readline = require('readline');

let rl = [readline.createInterface({
  input: process.stdin,
  output: process.stdout
})];

let ask=q=>new Promise(res=>rl[rl.length-1].question(q+' ',a=>{rl[rl.length-1].close();rl.push(readline.createInterface({input: process.stdin,output: process.stdout}));res(a)}))
let u=await ask('Unité de mesure?')
let T='';
while(T.length!=3){
  T=await ask('Triangle?')
	T=T.toUpperCase().split('')
};
let R;
while(!T.some(v=>v===R)){
  R=await ask(`Rect. en? [${T.join('/')}]`)
	R=R.toUpperCase()
};
let points=T.filter(v=>v!=R)
if((await ask('Rcp? [o/N]')).toLowerCase()=='o'){
let c=[await ask(`${points[0]}${R}=`), await ask(`${points[1]}${R}=`), await ask(`${points[0]}${points[1]}=`)]
await ask(`Resultat:

##### a.

${points[0]}${points[1]} pourrait être le coté de l'hypoténuse car il est plus grand que les deux autre cotés séparément mais est plus petit que la somme des deux autres cotés

##### b.

Dans le triangle MNP, le plus long coté est NP

Donc on calcule séparément:

${points[0]}${points[1]}²=${c[2]}²

${points[0]}${points[1]}²=${Math.round(c[2]**2*1e6)/1e6}

${points[0]}${R}²+${points[1]}${R}²=(${c[0]}²)+(${c[1]}²)

${points[0]}${R}²+${points[1]}${R}²=${Math.round(c[0]**2*1e6)/1e6}+${Math.round(c[1]**2*1e6)/1e6}

${points[0]}${R}²+${points[1]}${R}²${Math.round(c[2]**2*1e6)/1e6==(Math.round(c[0]**2*1e6)/1e6+Math.round(c[1]**2*1e6)/1e6)?'=':'≠'}${points[0]}${points[1]}²

##### c.

${T.join('')} ${Math.round(c[2]**2*1e6)/1e6!=(Math.round(c[0]**2*1e6)/1e6+Math.round(c[1]**2*1e6)/1e6)?'n\'':''}est ${Math.round(c[2]**2*1e6)/1e6==(Math.round(c[0]**2*1e6)/1e6+Math.round(c[1]**2*1e6)/1e6)?'':'pas'} rectangle.`)
process.exit()
}else{
let answer=await ask('Calculer l\'hypothénuse ou un autre coté? [H/a]')
if(!answer.toLowerCase()=='a'){
  let a=await ask(`${points[0]}${R}=`)
  let a2=await ask(`${points[1]}${R}=`)
  await ask(`Resultat: Je sais que dans le triangle ${T.join('')} rectangle en ${R}, {${points[0]}${R}=${a} et ${points[1]}${R}=${a2}}.
Or, selon le theoreme de pythagore, la somme des deux cotés au carré est égale au carré de l'hypothénuse.
\`\`\`markdown
Donc ${points[0]}${points[1]}=√(${points[0]}${R}²+${points[0]}${R}²)
     ${points[0]}${points[1]}=√(${a}²+${a2}²)
     ${points[0]}${points[1]}=√(${Math.round(a**2*1e6)/1e6}+${Math.round(a2**2*1e6)/1e6})
     ${points[0]}${points[1]}=${(Math.round(a**2*1e6)/1e6+Math.round(a2**2*1e6)/1e6)**.5}${u}
\`\`\``)
  process.exit()
}else{
  let ptCorr='';
  while(!(ptCorr.length==1&&ptCorr!=R)){
    ptCorr=await ask(`Point du coté a soustraire (Indice: Pas ${R}):`)
		ptCorr=ptCorr.toUpperCase();
  }
	let ptMiss=points.find(v=>v!==ptCorr)
  let a=await ask(`${points[0]}${points[1]}=`)
  let a2=await ask(`${ptCorr}${R}=`)
  await ask(`Resultat: Je sais que dans le triangle ${T.join('')} rectangle en ${R}, {${points[0]}${points[1]}=${a} et ${ptCorr}${R}=${a2}}.
Or, selon le theoreme de pythagore, pour calculer un coté dans un triangle rctangle qui n'est pas l'hypothénuse, il faut soustraire l'autre coté au carré a l'hypothénuse.
\`\`\`markdown
Donc ${ptMiss}${R}=√(${points[0]}${points[1]}²-${ptCorr}${R}²)
     ${ptMiss}${R}=√(${a}²-${a2}²)
     ${ptMiss}${R}=√(${Math.round(a**2*1e6)/1e6}-${Math.round(a2**2*1e6)/1e6})
     ${ptMiss}${R}=${(Math.round(a**2*1e6)/1e6-Math.round(a2**2*1e6)/1e6)**.5}${u}
\`\`\``)
  process.exit()
}
}
})()
