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
let answer=await ask('Theoreme ou reciproque du theoreme de pythagore? [R/t]')
if(answer.toLowerCase()=='t'){
  let a=await ask(`${points[0]}${R}=`)
  let a2=await ask(`${points[1]}${R}=`)
  await ask(`Resultat: Je sais que dans le triangle ${T.join('')} rectangle en ${R}, {${points[0]}${R}=${a} et ${points[1]}${R}=${a2}}.
Or, selon le theoreme de pythagore, la somme des deux cotés au carré est égale au carré de l'hypothénuse.
Donc ${points[0]}${points[1]}=√(${points[0]}${R}²+${points[0]}${R}²)
     ${points[0]}${points[1]}=√(${a}²+${a2}²)
     ${points[0]}${points[1]}=√(${a**2}+${a2**2})
     ${points[0]}${points[1]}=${(a**2+a2**2)**.5}${u}`)
  process.exit()
}else if(answer.toLowerCase()=='r'){
  let ptCorr='';
  while(!(ptCorr.length==1&&ptCorr!=R)){
    ptCorr=await ask(`Point du coté a soustraire (Indice: Pas ${R}):`)
		ptCorr=ptCorr.toUpperCase();
  }
	let ptMiss=points.find(v=>v!==ptCorr)
  let a=await ask(`${points[0]}${points[1]}=`)
  let a2=await ask(`${ptCorr}${R}=`)
  await ask(`Resultat: Je sais que dans le triangle ${T.join('')} rectangle en ${R}, {${points[0]}${points[1]}=${a} et ${ptCorr}${R}=${a2}}.
Or, selon la réciproque du theoreme de pythagore, pour calculer un coté dans un triangle rctangle qui n'est pas l'hypothénuse, il faut soustraire l'autre coté au carré a l'hypothénuse.
Donc ${ptMiss}${R}=√(${points[0]}${points[1]}²-${ptCorr}${R}²)
     ${ptMiss}${R}=√(${a}²-${a2}²)
     ${ptMiss}${R}=√(${a**2}-${a2**2})
     ${ptMiss}${R}=${(a**2-a2**2)**.5}${u}`)
  process.exit()
}else{
  await ask('Reponse incompréhensible')
  process.exit()
}
})()
