'use strict';
let $bingo=(function(){
function generarCarton(){
    let carton=[[],[],[]];
for(let a=0;a<3;a++){
    for(let b=0;b<9;b++){
        let nAleatorios;
        if(b===0){
            nAleatorios=Math.floor(Math.random()*10+1);
            if(a===1){
                if(nAleatorios===carton[a-1][b]){
                    do{
                        nAleatorios=Math.floor(Math.random()*10+1);
                    }while(nAleatorios===carton[a-1][b]);
                    carton[a][b]=nAleatorios;
                }else{
                    carton[a][b]=nAleatorios;
                }  
            }else if(a===2){
                if(nAleatorios===carton[a-1][b]||nAleatorios===carton[a-2][b]){
                    do{
                        nAleatorios=Math.floor(Math.random()*10+1);
                    }while(nAleatorios===carton[a-1][b]||nAleatorios===carton[a-2][b]);
                    carton[a][b]=nAleatorios;
                }else{
                    carton[a][b]=nAleatorios;
                }
            }else{
            carton[a][b]=nAleatorios;
            }
        }else{
            nAleatorios=Math.floor(Math.random()*(10*(b+1)-(1+b*10)+1)+(1+b*10));
            if(a===1){
                if(nAleatorios===carton[a-1][b]){
                    do{
                        nAleatorios=Math.floor(Math.random()*(10*(b+1)-(1+b*10)+1)+(1+b*10));
                    }while(nAleatorios===carton[a-1][b]);
                    carton[a][b]=nAleatorios;
                }else{
                    carton[a][b]=nAleatorios;
                }  
            }else if(a===2){
                if(nAleatorios===carton[a-1][b]||nAleatorios===carton[a-2][b]){
                    do{
                        nAleatorios=Math.floor(Math.random()*(10*(b+1)-(1+b*10)+1)+(1+b*10));
                    }while(nAleatorios===carton[a-1][b]||nAleatorios===carton[a-2][b]);
                    carton[a][b]=nAleatorios;
                }else{
                    carton[a][b]=nAleatorios;
                }
            }else{
            carton[a][b]=nAleatorios;
            }
        }
    }
        for(let j=0;j<9;j++){
            let aux;
            if(carton[2][j]<carton[1][j]&&carton[2][j]<carton[0][j]){
                if(carton[1][j]<carton[0][j]){
                    aux=carton[0][j];
                    carton[0][j]=carton[2][j];
                    carton[2][j]=aux;
                }else if(carton[0][j]<carton[1][j]){
                    aux=carton[0][j];
                    carton[0][j]=carton[2][j];
                    carton[2][j]=carton[1][j];
                    carton[1][j]=aux;
                }
            }else if(carton[1][j]<carton[0][j]&&carton[1][j]<carton[2][j]){
                if(carton[0][j]<carton[2][j]){
                    aux=carton[0][j];
                    carton[0][j]=carton[1][j];
                    carton[1][j]=aux;
                }else if(carton[2][j]<carton[0][j]){
                    aux=carton[0][j];
                    carton[0][j]=carton[1][j];
                    carton[1][j]=carton[2][j];
                    carton[2][j]=aux;
                }
            }else if(carton[0][j]<carton[1][j]&&carton[0][j]<carton[2][j]){
                if(carton[2][j]<carton[1][j]){
                    aux=carton[1][j];
                    carton[1][j]=carton[2][j];
                    carton[2][j]=aux;
                }
            }
        }
    }
console.log(carton);
}
return{
    generarCarton
}
    
})();
let carton=$bingo.generarCarton();