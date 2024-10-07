'use strict';
let poligono=parseInt(prompt('Que poligono quieres dibujar:\n'+'1- Cuadrado\n'+'2- Triangulo\n'+'3- Rombo'));
let n;
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
function pintarTriangulo(n){
    let resultado=[];
    let t=parseInt(n)+parseInt(n) - 1;
    for(let f=0;f<n;f++){
        let fila=[];
        resultado[f]=fila;
        for(let c=0;c<t;c++){
            if(f===n-1 || c===t-n-f || c===t-(n-f)){
            fila[c]='*';
            }else{
                fila[c]=' ';
            }
        }
    }
    return resultado;
}
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
switch (poligono){
    case 1:
        n=prompt('Introduce el tamaño');
        alert(pintarCuadrado(n));
        break;
    case 2:
        n=prompt('Introduce el tamaño');
        alert(pintarTriangulo(n));
        break;
    case 3:
        n=prompt('Introduce el tamaño');
        alert(pintarRombo(n));
        break;
    default:
        alert('No es una opción');
        break;
}