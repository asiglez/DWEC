'use strict';
function tablaMultiplicar(){
let numero=prompt('Introduce un numero');
let salida='';
for(let j=1;j<=10;j++){
    toString(salida+=numero+'*'+j+'='+numero*j+'\n');
    alert(salida);
}
}
tablasMultiplicar();
function tablasMultiplicar(){
    let numero1=prompt('Introduce un numero');
    let numero2=prompt('Introduce otro numero');
    let salida='';
    if(numero1>=numero2){
        for(let i=numero2;i<=numero1;i++){
            for(let j=1;j<=10;j++){
                toString(salida+=i+'*'+j+'='+i*j+'\n');
                alert(salida);
            }
        }
    }
    if(numero2>numero1){
        for(let i=numero1;i<=numero2;i++){
            for(let j=1;j<=10;j++){
                toString(salida+=i+'*'+j+'='+i*j+'\n');
                alert(salida);
            }
        }
    }
}