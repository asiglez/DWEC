'use strict';
let $bingo=(function(){
function generarCartones(){
    let cartones=[];
for(let i=0;i<15;i++){
    let nRandom=Math.floor(Math.random()*90+1);
    for(let a=0;a<cartones.length();a++){
        if(cartones[a]===nRandom){
            
        }else{
        cartones[i]=nRandom;
        }
    }
}
}
return generarCartones();
})();