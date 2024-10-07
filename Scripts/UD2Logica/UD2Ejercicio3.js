'use strict';
function pintarCuadrado(n){
    let resultado=[];
    for(let f=0;f<n;f++){
        let fila=[];
        resultado[f]=fila;
        for(let c=0;c<n;c++){
            fila[c];
            if(c===0 || c===n-1 || f===0 ||f===n-1){
                fila[c]='*';
            }else{
                fila[c]=' ';
            }
        }
    }
    return resultado;
}
let resultado=pintarCuadrado(prompt('Introduce el tamaño'));
for(let index in resultado){
console.log(resultado[index]);
}