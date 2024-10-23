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
        for (let j = 0; j < 9; j++) {
            carton = ordenarColumna(carton, j);
        }
    }
    for (let col = 0; col < 9; col++) {
        let filaAleatoria = Math.floor(Math.random() * 3);
        carton[filaAleatoria][col] = '*';
    }
    let nVacios = 3;
    while (nVacios > 0) {
        let fila = Math.floor(Math.random() * 3);
        let col = Math.floor(Math.random() * 9);
        let cuentaAsteriscos = (carton[0][col] === '*' ? 1 : 0) + 
                               (carton[1][col] === '*' ? 1 : 0) + 
                               (carton[2][col] === '*' ? 1 : 0);
        if (cuentaAsteriscos < 2 && carton[fila][col] !== '*') {
            carton[fila][col] = '*';
            nVacios--;
        }
    }
return carton;
}
function ordenarColumna(carton, col) {
    let numeros = [carton[0][col], carton[1][col], carton[2][col]];
    numeros.sort((a, b) => a - b);
    carton[0][col] = numeros[0];
    carton[1][col] = numeros[1];
    carton[2][col] = numeros[2];
    return carton;
}
function crearCartones() {
    let cartones={"Jugador 1": generarCarton(),
                  "Jugador 2": generarCarton(),
                  "Humano": generarCarton()};
    console.log(cartones);
}
function sacarBolas(){
    let nAleatorios=[];
    let bolasSacadas=[];
    let bingo=false;
    for(let a=0;a<90;a++){
        nAleatorios[a]=a+1;
    }
    do{
        let contadorAleatorio=89;
        let contadorBolas=0;
        let nAleatorio=Math.floor(Math.random()*contadorAleatorio);
        bolasSacadas[contadorBolas]=nAleatorios[nAleatorio];
        contadorBolas++;
        contadorAleatorio--;
        if(nAleatorios!=89){
            for(let a=nAleatorios;a<nAleatorios.length;a++){
                nAleatorios[a]=nAleatorios[a+1];
            }
        }
        delete(nAleatorios[nAleatorios.length-1]);
        if(contadorBolas==2){
            bingo=true;
        }
    }while(bingo===false);
    console.log(bolasSacadas);
}
return{
    crearCartones,
    sacarBolas
}
    
})();
let cartones=$bingo.crearCartones();
let bolas=$bingo.sacarBolas();