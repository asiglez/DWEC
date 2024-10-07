'use strict';
function pintarRombo(n) { 
    let resultado = [];
    let t = n;
    for (let f = 0; f < t; f++) {
        let fila = [];
        resultado[f] = fila;
        for (let c = 0; c < t * 2 - 1; c++) {
            fila[c] = ' ';
        }
        let inicio = t - 1 - f;
        let fin = t - 1 + f;
        for (let c = inicio; c <= fin; c++) {
            fila[c] = '*';
        }
    }
    for (let f = t - 2; f >= 0; f--) {
        let fila = [];
        resultado.push(fila);
        for (let c = 0; c < t * 2 - 1; c++) {
            fila[c] = ' ';
        }
        let inicio = t - 1 - f;
        let fin = t - 1 + f;
        for (let c = inicio; c <= fin; c++) {
            fila[c] = '*';
        }
    }
    return resultado;
}
let resultado=pintarRombo(prompt('Introduce el tamaño'));
for(let index in resultado){
console.log(resultado[index]);
}